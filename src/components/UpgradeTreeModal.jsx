import React, { useMemo, useRef, useState, useCallback } from 'react';
import { buildUpgradeGraph, getConnectedChain, layoutChain, TYPE_COLORS } from './upgradeTreeGraph';
import './UpgradeTreeModal.css';

const MIN_SCALE = 0.35;
const MAX_SCALE = 1.75;

/**
 * A cubic bezier edge between the right edge of `from` and the left
 * edge of `to`, both {x,y,w,h} rects in the same coordinate space.
 */
function edgePath(fromRect, toRect) {
  const x1 = fromRect.x + fromRect.w;
  const y1 = fromRect.y + fromRect.h / 2;
  const x2 = toRect.x;
  const y2 = toRect.y + toRect.h / 2;
  const dx = Math.max(40, (x2 - x1) / 2);
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
}

const NodeBox = ({ node, rect, isRoot, onClick }) => {
  const { kind } = node;

  if (kind === 'missing') {
    return (
      <div
        className="ut-node ut-node-missing"
        style={{ left: rect.x, top: rect.y, width: rect.w, height: rect.h }}
        title="Referenced but not found in the Gu index"
      >
        <span>⚠ {node.name}</span>
      </div>
    );
  }

  if (kind === 'junction') {
    return (
      <div
        className="ut-node ut-node-junction"
        style={{ left: rect.x, top: rect.y, width: rect.w, height: rect.h }}
      >
        <span>⊕ {node.name}</span>
      </div>
    );
  }

  const gu = node.gu;
  const accent = TYPE_COLORS[gu?.type] || '#6a6a8a';
  const rankArr = gu?.rank || [];
  const rankLabel =
    rankArr.length === 0
      ? ''
      : rankArr.length === 1
      ? `Rank ${rankArr[0]}`
      : `Rank ${rankArr[0]}–${rankArr[rankArr.length - 1]}`;

  return (
    <button
      type="button"
      className={`ut-node ut-node-gu${isRoot ? ' ut-node-root' : ''}`}
      style={{ left: rect.x, top: rect.y, width: rect.w, height: rect.h, borderColor: accent }}
      onClick={() => onClick(node.name)}
    >
      <span className="ut-node-name">{node.name}</span>
      <span className="ut-node-meta">
        {rankLabel}
        {gu?.type ? ` · ${gu.type}` : ''}
      </span>
    </button>
  );
};

const UpgradeTreeModal = ({ guList, rootName, onClose, onSelectGu }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.85);
  const [offset, setOffset] = useState({ x: 40, y: 40 });
  const dragState = useRef(null);

  const graph = useMemo(() => buildUpgradeGraph(guList), [guList]);
  const chain = useMemo(() => getConnectedChain(graph, rootName), [graph, rootName]);
  const layout = useMemo(() => (chain ? layoutChain(chain) : null), [chain]);

  const missingInChain = useMemo(() => {
    if (!chain) return [];
    return [...chain.nodes.values()].filter(n => n.kind === 'missing').map(n => n.name);
  }, [chain]);

  const handlePointerDown = useCallback(
    e => {
      dragState.current = { startX: e.clientX, startY: e.clientY, offset };
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [offset]
  );

  const handlePointerMove = useCallback(e => {
    if (!dragState.current) return;
    const { startX, startY, offset: startOffset } = dragState.current;
    setOffset({
      x: startOffset.x + (e.clientX - startX),
      y: startOffset.y + (e.clientY - startY),
    });
  }, []);

  const handlePointerUp = useCallback(e => {
    dragState.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  }, []);

  const handleWheel = useCallback(e => {
    e.preventDefault();
    setScale(s => {
      const next = s - e.deltaY * 0.0012;
      return Math.min(MAX_SCALE, Math.max(MIN_SCALE, next));
    });
  }, []);

  const zoomBy = factor =>
    setScale(s => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s * factor)));

  const recenter = () => {
    setScale(0.85);
    setOffset({ x: 40, y: 40 });
  };

  const handleNodeClick = name => {
    if (name === rootName) return;
    onSelectGu(name);
  };

  return (
    <div className="ut-overlay" onClick={onClose}>
      <div className="ut-panel" onClick={e => e.stopPropagation()}>
        <div className="ut-header">
          <div>
            <div className="ut-title">Upgrade Tree</div>
            <div className="ut-subtitle">{rootName}</div>
          </div>
          <div className="ut-header-actions">
            <button className="ut-icon-btn" onClick={() => zoomBy(1.2)} title="Zoom in">＋</button>
            <button className="ut-icon-btn" onClick={() => zoomBy(1 / 1.2)} title="Zoom out">－</button>
            <button className="ut-icon-btn" onClick={recenter} title="Reset view">⟲</button>
            <button className="ut-close-btn" onClick={onClose} title="Close">✕</button>
          </div>
        </div>

        {!chain || !layout ? (
          <div className="ut-empty">
            {rootName} isn't linked to any other Gu via previousRank/nextRank.
          </div>
        ) : (
          <>
            <div
              className="ut-canvas-wrap"
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              onWheel={handleWheel}
            >
              <div
                className="ut-canvas"
                style={{
                  width: layout.width + 80,
                  height: layout.height + 80,
                  transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                }}
              >
                <svg
                  className="ut-edges"
                  width={layout.width + 80}
                  height={layout.height + 80}
                >
                  <defs>
                    <marker
                      id="ut-arrow"
                      viewBox="0 0 10 10"
                      refX="9"
                      refY="5"
                      markerWidth="7"
                      markerHeight="7"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 0 L 10 5 L 0 10 z" className="ut-arrowhead" />
                    </marker>
                  </defs>
                  {chain.edges.map(({ from, to }, i) => {
                    const a = layout.positions.get(from);
                    const b = layout.positions.get(to);
                    if (!a || !b) return null;
                    return (
                      <path
                        key={i}
                        d={edgePath(a, b)}
                        className="ut-edge"
                        markerEnd="url(#ut-arrow)"
                      />
                    );
                  })}
                </svg>

                {[...chain.nodes.entries()].map(([id, node]) => (
                  <NodeBox
                    key={id}
                    node={node}
                    rect={layout.positions.get(id)}
                    isRoot={node.kind === 'gu' && node.name === rootName}
                    onClick={handleNodeClick}
                  />
                ))}
              </div>
            </div>

            <div className="ut-footer">
              <span className="ut-hint">Drag to pan · scroll to zoom · click a Gu to jump to it</span>
              {missingInChain.length > 0 && (
                <span className="ut-missing-note">
                  ⚠ {missingInChain.length} referenced Gu not found: {missingInChain.join(', ')}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UpgradeTreeModal;