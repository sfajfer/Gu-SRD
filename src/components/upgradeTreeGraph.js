// upgradeTreeGraph.js
//
// Turns the flat gu-index.json list into a graph of upgrade links (parsed
// from `previousRank` / `nextRank`, same comma/plus semantics as the
// Python canvas generator), then lets you pull out the full connected
// "closed chain" reachable from any single Gu by walking every
// previousRank/nextRank link outward until there are no more to follow -
// and lays that chain out for rendering.
//
// Edge semantics (mirrors gu_to_canvas.py):
//   "Cool Gu, Dope Gu"    -> either Cool Gu OR Dope Gu can upgrade into this Gu
//   "Cool Gu + Dope Gu"   -> Cool Gu AND Dope Gu must BOTH be combined (junction node)
//   "A + B, C"            -> (A AND B) OR (C alone)

export const TYPE_COLORS = {
  Attack: '#e93147',
  Tonic: '#08b94e',
  Catalyst: '#e8973f',
  Guard: '#08b7c4',
  Divination: '#7852ee',
  Celerity: '#e0c43e',
  Manifestation: '#3f8ae8',
  Carver: '#c43f8a',
  Container: '#8a8a8a',
  Concealment: '#4a4a6a',
  Trigger: '#d94f9c',
  Injector: '#4fd9b0',
  Gate: '#9c9c4f',
};

const X_SPACING = 260;
const Y_SPACING = 110;
const GU_WIDTH = 200;
const GU_HEIGHT = 78;
const JUNCTION_WIDTH = 160;
const JUNCTION_HEIGHT = 46;
const MISSING_WIDTH = 200;
const MISSING_HEIGHT = 46;

/** "Cool Gu + Dope Gu, Awesome Gu" -> [["Cool Gu","Dope Gu"], ["Awesome Gu"]] */
export function parsePrevGroups(str) {
  if (!str) return [];
  return str
    .split(',')
    .map(orPart => orPart.split('+').map(n => n.trim()).filter(Boolean))
    .filter(group => group.length > 0);
}

const guNodeId = name => `gu:${name}`;
const missingNodeId = name => `missing:${name}`;
const junctionNodeId = (andNames, childName) =>
  `junc:${[...andNames].sort().join('|')}=>${childName}`;

/**
 * Builds the full graph for the whole dataset once. Reuse this across
 * multiple "show me this Gu's tree" calls rather than rebuilding it
 * per-click.
 */
export function buildUpgradeGraph(guList) {
  const byName = new Map();
  guList.forEach(g => {
    if (g && g.name && !byName.has(g.name)) byName.set(g.name, g);
  });

  const nodes = new Map(); // id -> { kind, name, path, gu?, inputs? }
  const edges = []; // { from, to }
  const missingNames = new Set();

  byName.forEach(g => {
    nodes.set(guNodeId(g.name), {
      kind: 'gu',
      id: guNodeId(g.name),
      name: g.name,
      path: g.path || 'Unsorted',
      gu: g,
    });
  });

  function ensureNode(name) {
    if (byName.has(name)) return guNodeId(name);
    const id = missingNodeId(name);
    if (!nodes.has(id)) {
      missingNames.add(name);
      nodes.set(id, { kind: 'missing', id, name, path: 'MISSING' });
    }
    return id;
  }

  byName.forEach(g => {
    const childId = guNodeId(g.name);
    const groups = parsePrevGroups(g.previousRank);
    groups.forEach(andNames => {
      if (andNames.length === 1) {
        edges.push({ from: ensureNode(andNames[0]), to: childId });
      } else {
        const jid = junctionNodeId(andNames, g.name);
        if (!nodes.has(jid)) {
          const inputIds = andNames.map(ensureNode);
          nodes.set(jid, {
            kind: 'junction',
            id: jid,
            name: andNames.join(' + '),
            path: nodes.get(childId)?.path || 'Unsorted',
            inputs: inputIds,
          });
          inputIds.forEach(sid => edges.push({ from: sid, to: jid }));
        }
        edges.push({ from: jid, to: childId });
      }
    });
  });

  return { nodes, edges, missingNames, byName };
}

/**
 * Walks every previousRank/nextRank link outward (in both directions,
 * through AND-junctions too) from `startName` until there's nothing
 * left to reach - the full closed chain that Gu belongs to.
 * Returns null if the Gu isn't part of any chain.
 */
export function getConnectedChain(graph, startName) {
  const startId = guNodeId(startName);
  if (!graph.nodes.has(startId)) return null;

  const adjacency = new Map();
  const link = (a, b) => {
    if (!adjacency.has(a)) adjacency.set(a, new Set());
    adjacency.get(a).add(b);
  };
  graph.edges.forEach(({ from, to }) => {
    link(from, to);
    link(to, from);
  });

  const visited = new Set([startId]);
  const queue = [startId];
  while (queue.length) {
    const cur = queue.shift();
    for (const nb of adjacency.get(cur) || []) {
      if (!visited.has(nb)) {
        visited.add(nb);
        queue.push(nb);
      }
    }
  }

  if (visited.size === 1) return null; // no links at all

  const nodes = new Map();
  visited.forEach(id => nodes.set(id, graph.nodes.get(id)));
  const edges = graph.edges.filter(e => visited.has(e.from) && visited.has(e.to));

  return { nodes, edges, rootId: startId };
}

/**
 * Longest-path layering (x) + a primary-parent spanning tree centered
 * layout (y), same technique as gu_to_canvas.py's layout pass, scoped
 * to a single chain instead of the whole dataset.
 */
export function layoutChain(chain) {
  const { nodes, edges } = chain;
  const preds = new Map();
  const outDeg = new Map();
  nodes.forEach((_, id) => {
    preds.set(id, []);
    outDeg.set(id, 0);
  });
  edges.forEach(({ from, to }) => {
    preds.get(to).push(from);
    outDeg.set(from, (outDeg.get(from) || 0) + 1);
  });

  // ---- X: layer = 1 + deepest predecessor layer (0 if none) ----
  const layer = new Map();
  function computeLayer(id, visiting) {
    if (layer.has(id)) return layer.get(id);
    if (visiting.has(id)) {
      layer.set(id, 0); // cycle guard
      return 0;
    }
    visiting.add(id);
    const ps = preds.get(id) || [];
    const val = ps.length === 0 ? 0 : 1 + Math.max(...ps.map(p => computeLayer(p, visiting)));
    layer.set(id, val);
    visiting.delete(id);
    return val;
  }
  nodes.forEach((_, id) => computeLayer(id, new Set()));

  const nameOf = id => nodes.get(id)?.name || '';

  // ---- Primary-parent spanning tree: each node picks its most
  // exclusive (lowest out-degree) predecessor to avoid row collisions.
  // Any other predecessor edge still renders, it just doesn't drive row
  // placement. ----
  const primaryParent = new Map();
  nodes.forEach((_, id) => {
    const ps = preds.get(id) || [];
    if (ps.length === 0) {
      primaryParent.set(id, null);
    } else if (ps.length === 1) {
      primaryParent.set(id, ps[0]);
    } else {
      let best = ps[0];
      ps.forEach(p => {
        const dBest = outDeg.get(best) || 0;
        const dP = outDeg.get(p) || 0;
        if (dP < dBest || (dP === dBest && nameOf(p) < nameOf(best))) best = p;
      });
      primaryParent.set(id, best);
    }
  });

  const children = new Map();
  nodes.forEach((_, id) => children.set(id, []));
  primaryParent.forEach((parent, id) => {
    if (parent) children.get(parent).push(id);
  });
  children.forEach(kids =>
    kids.sort((a, b) => layer.get(a) - layer.get(b) || nameOf(a).localeCompare(nameOf(b)))
  );

  // ---- Y: post-order row assignment, leaves consume rows in order,
  // internal nodes center over their children's mean row. ----
  const row = new Map();
  let cursor = 0;
  function assignRows(id) {
    const kids = children.get(id) || [];
    if (kids.length === 0) {
      row.set(id, cursor);
      cursor += 1;
      return;
    }
    kids.forEach(assignRows);
    const rows = kids.map(k => row.get(k));
    row.set(id, rows.reduce((a, b) => a + b, 0) / rows.length);
  }

  const roots = [...nodes.keys()]
    .filter(id => primaryParent.get(id) === null)
    .sort((a, b) => layer.get(a) - layer.get(b) || nameOf(a).localeCompare(nameOf(b)));
  roots.forEach(assignRows);

  // ---- Pixel positions + node dimensions ----
  const dims = id => {
    const kind = nodes.get(id).kind;
    if (kind === 'junction') return { w: JUNCTION_WIDTH, h: JUNCTION_HEIGHT };
    if (kind === 'missing') return { w: MISSING_WIDTH, h: MISSING_HEIGHT };
    return { w: GU_WIDTH, h: GU_HEIGHT };
  };

  const positions = new Map();
  let maxX = 0;
  let maxY = 0;
  nodes.forEach((_, id) => {
    const { w, h } = dims(id);
    const x = layer.get(id) * X_SPACING;
    const y = row.get(id) * Y_SPACING;
    positions.set(id, { x, y, w, h });
    maxX = Math.max(maxX, x + w);
    maxY = Math.max(maxY, y + h);
  });

  return { positions, width: maxX, height: maxY };
}