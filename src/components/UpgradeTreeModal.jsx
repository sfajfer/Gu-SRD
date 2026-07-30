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
        {gu?.path ? ` · ${gu.path}` : ''}
      </span>
    </button>
  );
};

const UpgradeTreeModal = ({ guList, rootName, onClose, onSelectGu }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.85);
  const [offset, setOffset] = useState({ x: 40, y: 40 });
  // Live-mutated refs so pointer handlers always see the latest values
  // without needing to be recreated (and re-subscribed) every render.
  const scaleRef = useRef(scale);
  const offsetRef = useRef(offset);
  scaleRef.current = scale;
  offsetRef.current = offset;

  // pointerId -> {x, y} in client (viewport) coordinates, for every
  // finger/pointer currently down on the canvas.
  const pointers = useRef(new Map());
  // Snapshot taken whenever the number of active pointers changes
  // (1 -> pan anchor, 2 -> pinch anchor).
  const gesture = useRef(null);

  const graph = useMemo(() => buildUpgradeGraph(guList), [guList]);
  const chain = useMemo(() => getConnectedChain(graph, rootName), [graph, rootName]);
  const layout = useMemo(() => (chain ? layoutChain(chain) : null), [chain]);

  const missingInChain = useMemo(() => {
    if (!chain) return [];
    return [...chain.nodes.values()].filter(n => n.kind === 'missing').map(n => n.name);
  }, [chain]);

  const midpoint = pts => ({
    x: (pts[0].x + pts[1].x) / 2,
    y: (pts[0].y + pts[1].y) / 2,
  });
  const distance = pts => Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);

  // (Re)snapshot the gesture anchor from the current set of active
  // pointers, so a finger being added/removed mid-gesture never causes
  // a jump - only what happens *after* this point moves anything.
  const resetGestureAnchor = useCallback(() => {
    const pts = [...pointers.current.values()];
    if (pts.length === 1) {
      gesture.current = {
        mode: 'pan',
        start: pts[0],
        startOffset: offsetRef.current,
      };
    } else if (pts.length >= 2) {
      const [a, b] = pts;
      gesture.current = {
        mode: 'pinch',
        startDist: distance([a, b]),
        startMid: midpoint([a, b]),
        startOffset: offsetRef.current,
        startScale: scaleRef.current,
      };
    } else {
      gesture.current = null;
    }
  }, []);

  const handlePointerDown = useCallback(
    e => {
      // Let a clickable Gu node handle its own click. Capturing the
      // pointer here would (on desktop mouse) redirect the resulting
      // click event to this wrapper instead of the button, so the
      // node's onClick would never fire.
      if (e.target.closest && e.target.closest('.ut-node-gu')) return;

      e.currentTarget.setPointerCapture(e.pointerId);
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      resetGestureAnchor();
    },
    [resetGestureAnchor]
  );

  const handlePointerMove = useCallback(e => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesture.current;
    if (!g) return;

    if (g.mode === 'pan') {
      const cur = [...pointers.current.values()][0];
      setOffset({
        x: g.startOffset.x + (cur.x - g.start.x),
        y: g.startOffset.y + (cur.y - g.start.y),
      });
    } else if (g.mode === 'pinch') {
      const pts = [...pointers.current.values()];
      if (pts.length < 2) return;
      const [a, b] = pts;
      const newDist = distance([a, b]);
      const newMid = midpoint([a, b]);
      const rawScale = g.startScale * (newDist / g.startDist);
      const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, rawScale));
      // Keep the point under the pinch midpoint stationary on screen:
      // offset' = mid - (mid - offset) * (newScale/startScale), plus
      // whatever the midpoint itself has translated by.
      const ratio = newScale / g.startScale;
      setOffset({
        x: newMid.x - (g.startMid.x - g.startOffset.x) * ratio,
        y: newMid.y - (g.startMid.y - g.startOffset.y) * ratio,
      });
      setScale(newScale);
    }
  }, []);

  const endPointer = useCallback(
    e => {
      pointers.current.delete(e.pointerId);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
      resetGestureAnchor();
    },
    [resetGestureAnchor]
  );

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
              onPointerUp={endPointer}
              onPointerCancel={endPointer}
              onPointerLeave={endPointer}
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