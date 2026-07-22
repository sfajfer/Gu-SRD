import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../Styles.css';
import beastList from '../../assets/beast-index.json';

function isFlying(features) {
    for (const feature of features) {
        const {label, content: body} = parseLabelAndContent(feature);
        if (label && label.toLowerCase().includes('flier')) {
            return true;
        }
    }
    return false;
}

// --- Formula Tooltip ---
// Small, dependency-free hover/focus tooltip. Wraps any child (a bolded
// scaling value, a stat header label, etc.) and reveals `formula` on
// hover or keyboard focus. No extra package needed - see note below.
const FormulaTooltip = ({ formula, children }) => {
    if (!formula) return children;
    return (
        <span className="beast-tooltip" tabIndex={0}>
            {children}
            <span className="beast-tooltip-bubble" role="tooltip">{formula}</span>
        </span>
    );
};

// --- Attribute Scaling (bracket) parsing ---
// Maps the abbreviations used inside beast-index.json bracket formulas
// (e.g. "[2 + 20% Str]") to the beast's current primary attributes.
// "Str" (Strength) mirrors Fortitude in this ruleset.
function getAttributeValue(abbr, beast, mod) {
    const primary = beast.primaryAttributes || {};
    const lookup = {
        att: primary.att,
        wis: primary.wis,
        cog: primary.cog,
        agi: primary.agi,
        fort: primary.fort,
        str: primary.fort,
    };
    const base = lookup[abbr.trim().toLowerCase()];
    if (base === undefined || base === null) return null;
    // Beast Kings add a flat bonus to every primary attribute, which
    // flows into any attribute-based scaling in features/combat actions.
    return base + (mod?.attr || 0);
}

// Evaluates a bracket formula like "2 + 20% Str" against a beast's stats.
// Flat terms are added as-is; percent terms are computed against the
// referenced attribute and multiplied by the Beast King's Attribute
// Scaling multiplier (mod.scale), per the King class rules.
function evaluateFormula(formula, beast, mod) {
    const scale = mod?.scale ?? 1;
    const termRegex = /([+-])?\s*(\d+(?:\.\d+)?)\s*(%)?\s*([A-Za-z]+)?/g;
    let total = 0;
    let match;
    while ((match = termRegex.exec(formula)) !== null) {
        const [full, signRaw, numRaw, pct, attr] = match;
        if (!numRaw) continue;
        const sign = signRaw === '-' ? -1 : 1;
        const num = parseFloat(numRaw);
        if (pct && attr) {
            const attrVal = getAttributeValue(attr, beast, mod);
            total += attrVal === null ? 0 : sign * (num / 100) * attrVal * scale;
        } else {
            total += sign * num;
        }
    }
    return Math.floor(total);
}

// Splits body text on bracket formulas, replacing each with a bolded,
// tooltip-enabled computed value while leaving surrounding text intact.
function renderBodyWithFormulas(text, beast, mod) {
    const regex = /\[([^\]]+)\]/g;
    const nodes = [];
    let lastIndex = 0;
    let match;
    let key = 0;
    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            nodes.push(text.slice(lastIndex, match.index));
        }
        const formula = match[1];
        const value = evaluateFormula(formula, beast, mod);
        const scale = mod?.scale ?? 1;
        const tooltipText = scale > 1
            ? `${formula}  (×${scale})`
            : formula;
        nodes.push(
            <FormulaTooltip key={`f-${key++}`} formula={tooltipText}>
                <strong className="beast-scaling-value">{value}</strong>
            </FormulaTooltip>
        );
        lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
    return nodes;
}

const EntryList = ({ items, className, beast, mod }) => {
    return (
        <ul className={className}>
            {items.map((item, i) => {
                const { label, content: body } = parseLabelAndContent(item);
                return (
                    <li key={i} className="beast-entry">
                        {label && <span className="beast-entry-name"><strong>{label}</strong></span>} -&nbsp;
                        <span className="beast-entry-body">{renderBodyWithFormulas(body, beast, mod)}</span>
                    </li>
                );
            })}
        </ul>
    );
};

// --- Stat grid header formulas ---
// Purely descriptive - shown in a tooltip on hover/focus so players can
// see how a derived secondary attribute or skill is calculated, even
// when the formula is as simple as a straight attribute copy.
const STAT_FORMULAS = {
    'Fort. Mult.': 'Base Fortitude Multiplier × Beast King Multiplier',
    'Max HP': 'Fortitude × Fortitude Multiplier',
    'Reactions': 'Base Reactions + 5% Agility',
    '# Attacks': 'Base Number of Attacks + Beast King Bonus Attacks',
    'Size': 'Base Size adjusted by Beast King size stages',
    'Awareness': '= Wisdom',
    'Ranged Atk': '= Cognition',
    'Close Combat': '= Agility',
    'Dodge': '= Agility',
    'Athletics': '50% Agility + 50% Strength',
    'Strength': '= Fortitude',
    'Max Soul': 'Base Soul + 20% Attitude',
    'Movement': 'Base Movement + 5% Agility',
    'Perseverance': '50% Attitude + Fortitude',
};

const StatHeader = ({ label, className }) => {
    const formula = STAT_FORMULAS[label];
    return (
        <div className={`st-cell header ${className ?? ''}`.trim()}>
            {formula ? <FormulaTooltip formula={formula}>{label}</FormulaTooltip> : label}
        </div>
    );
};

const BiomeTag = ({ name, variant }) => {
    return <span className={`beast-biome-tag beast-biome-${variant}`}>{name}</span>;
};

// --- Beast King Constants & Logic ---
const KING_CLASSES = {
    'Ordinary': { attr: 0, attacks: 0, size: 0, scale: 1, fort: 1, text: null },
    'Hundred Beast King': {
        attr: 20, attacks: 0, size: 0, scale: 1, fort: 1,
        text: "+20 to all Primary Attributes. Horde Command: up to 1,000 [beast]."
    },
    'Thousand Beast King': {
        attr: 40, attacks: 1, size: 1, scale: 2, fort: 2,
        text: "+40 to all Primary Attributes. Number of Attacks +1. Size +1 stage. Attribute Scaling (in features and combat actions) ×2. Fortitude Multiplier ×2. Horde Command: up to 10,000 [beast]."
    },
    'Myriad Beast King': {
        attr: 80, attacks: 2, size: 1, scale: 2, fort: 2,
        text: "+80 to all Primary Attributes. Number of Attacks +2. Size +1 stage. Attribute Scaling (in features and combat actions) ×2. Fortitude Multiplier ×2. Horde Command: up to 100,000 [beast]."
    },
    'Beast Emperor': {
        attr: 160, attacks: 3, size: 2, scale: 3, fort: 3,
        text: "+160 to all Primary Attributes. Number of Attacks +3. Size +2 stages. Attribute Scaling (in features and combat actions) ×3. Fortitude Multiplier ×3. Horde Command: up to 1,000,000 [beast]."
    },
    'Mutated Beast King': {
        attr: 80, attacks: 2, size: 1, scale: 2, fort: 2,
        text: "+80 to all Primary Attributes. Number of Attacks +2. Size +1 stage. Attribute Scaling (in features and combat actions) ×2. Fortitude Multiplier ×2. Horde Command: up to 1,000 [beast]."
    }
};

const sizeScale = ['Tiny', 'Small', 'Medium', 'Large', 'Huge'];

function adjustSize(baseSize, stages) {
    if (!baseSize || baseSize === 'PH') return 'PH';
    if (stages === 0) return baseSize;

    const match = baseSize.match(/^Huge(?:\s*\(\s*(\d+)\s*[xX]\s*(\d+)\s*\))?$/i);
    let currentIdx = sizeScale.findIndex(s => s.toLowerCase() === baseSize.toLowerCase());

    if (match) {
        let w = match[1] ? parseInt(match[1]) : 3;
        let h = match[2] ? parseInt(match[2]) : 3;
        return `Huge (${w + stages} x ${h + stages})`;
    } else if (currentIdx !== -1) {
        let newIdx = currentIdx + stages;
        if (newIdx < sizeScale.length) {
            return sizeScale[newIdx];
        } else {
            let over = newIdx - 4; // 4 is index for Huge
            return `Huge (${3 + over} x ${3 + over})`;
        }
    }
    return baseSize;
}

function applyMath(base, val, isMult = false) {
    if (base === 'PH') return 'PH';
    let num = Number(base);
    if (isNaN(num)) return base;
    return isMult ? num * val : num + val;
}

function parseLabelAndContent(inputString) {
  if (!inputString) return { label: '', content: '' };

  // Clean up any edge whitespace first
  const cleanInput = inputString.trim();

  // 1. Matches text before " - " OR 2. Matches the first title-case word
  // In both cases, the rest of the string is captured in the second group
  const match = cleanInput.match(/^(.*?)\s*-\s*(.*)$/) || cleanInput.match(/^([A-Z][a-z]+)(.*)$/);

  if (match) {
    return {
      label: match[1].trim(),   // "Weak Nose" or "Tiger"
      content: match[2].trim()  // "The Lightning Wolf..." or "The Mound Tiger..."
    };
  }

  // Fallback if the string doesn't match either pattern
  return { label: '', content: inputString };
}

// Statblock Subcomponent
const ExpandedStatblock = ({ beast }) => {

    const horde = beast.hordeRules || {};

    const isMutated = (horde.grade === 'Mutated');
    const [selectedClass, setSelectedClass] = useState('Ordinary');

    const options = isMutated
        ? ['Ordinary', 'Mutated Beast King']
        : ['Ordinary', 'Hundred Beast King', 'Thousand Beast King', 'Myriad Beast King', 'Beast Emperor'];

    // Enforce selection constraint if grade mutates via external updates
    const currentClass = options.includes(selectedClass) ? selectedClass : 'Ordinary';
    const mod = KING_CLASSES[currentClass];

    // --- All derived stats recomputed from scratch any time the beast
    // itself changes OR the selected Beast King class changes. Every
    // downstream value (max HP, reactions, athletics, etc.) is derived
    // here from the *King-adjusted* primary attributes rather than the
    // raw base attributes, so switching classes now properly cascades.
    const stats = useMemo(() => {
        const primary = beast.primaryAttributes || {};
        const secondary = beast.secondaryAttributes || {};

        // --- Primary Attributes (King bonus applied up front) ---
        const attitude = applyMath(primary.att, mod.attr);
        const wisdom = applyMath(primary.wis, mod.attr);
        const cognition = applyMath(primary.cog, mod.attr);
        const agility = applyMath(primary.agi, mod.attr);
        const fortitude = applyMath(primary.fort, mod.attr);

        // --- Secondary Attributes (now driven by adjusted primaries) ---
        const fortitudeMultiplier = applyMath(secondary['fortitude Multiplier'], mod.fort, true);
        const maxHp = Math.floor(fortitude * fortitudeMultiplier);
        const reactions = secondary.reactions + Math.floor(0.05 * agility);
        const numberOfAttacks = applyMath(secondary['number of Attacks'], mod.attacks);
        const size = adjustSize(secondary.size, mod.size);

        const awareness = wisdom;
        const rangedAttack = cognition;
        const closeCombat = agility;
        const dodge = agility;
        const strength = fortitude;
        const athletics = Math.floor((0.5 * agility) + (0.5 * strength));
        const maxSoul = secondary.soul + Math.floor(0.2 * attitude);
        const movement = secondary.movement + Math.floor(0.05 * agility);
        const perseverance = Math.floor(0.5 * attitude) + fortitude;
        const primaryAttack = secondary['primary Attack'];

        // --- Flight (uses adjusted agility; fixes prior `primary.agility`
        // typo that always evaluated to undefined) ---
        const hasFlier = isFlying(beast.features);
        const flying = hasFlier ? agility * 2 : agility;

        return {
            attitude, wisdom, cognition, agility, fortitude,
            fortitudeMultiplier, maxHp, reactions, numberOfAttacks, size,
            awareness, rangedAttack, closeCombat, dodge, strength, athletics,
            maxSoul, movement, perseverance, primaryAttack, hasFlier, flying,
        };
    }, [beast, mod]);

    // --- Horde Rules (unaffected by King class) ---
    const grade = horde.grade;
    const upkeep = horde.upkeep;

    // --- Flight placeholders (kept as-is; these fields aren't objects
    // in the source data, so they've always rendered as placeholders) ---
    const flySpeed = 'PH';
    const maneuvers = 'PH';

    // Inject the selected class effect as the first feature
    const kingFeatureText = mod.text ? mod.text.replace(/\[beast\]/g, beast.name || 'beast') : null;
    const computedFeatures = kingFeatureText
        ? [`${currentClass} - ${kingFeatureText}`, ...(beast.features || [])]
        : (beast.features || []);

    return (
        <div className="beast-statblock">
            {/* Header Area */}
            <div className="beast-statblock-header">
                <div className="beast-statblock-titles">
                    <span className="beast-name"><strong style={{ color: 'var(--accent)', fontSize: '25px', textAlign: 'left' }}>{beast.name}</strong></span>
                    <select
                        className="beast-class-dropdown"
                        value={currentClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                    >
                        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
            </div>

            {beast.description && (
                <div className="beast-description" style={{ marginBottom: '16px' }}>{beast.description}</div>
            )}

            {/* Main Stats Grid */}
            <div className="statblock-grid">
                {/* --- Row 1 Headers --- */}
                <StatHeader label="Attitude" />
                <StatHeader label="Wisdom" />
                <StatHeader label="Cognition" />
                <StatHeader label="Agility" />
                <StatHeader label="Fortitude" className="touch-right" />
                <StatHeader label="Fort. Mult." className="touch-left" />
                <StatHeader label="Max HP" />
                <StatHeader label="Reactions" />
                <StatHeader label="# Attacks" />
                <StatHeader label="Size" />
                <StatHeader label="Grade" />

                {/* --- Row 1 Values --- */}
                <div className="st-cell value">{stats.attitude}</div>
                <div className="st-cell value">{stats.wisdom}</div>
                <div className="st-cell value">{stats.cognition}</div>
                <div className="st-cell value">{stats.agility}</div>
                <div className="st-cell value touch-right">{stats.fortitude}</div>
                <div className="st-cell value touch-left">{stats.fortitudeMultiplier}</div>
                <div className="st-cell value">{stats.maxHp}</div>
                <div className="st-cell value">{stats.reactions}</div>
                <div className="st-cell value">{stats.numberOfAttacks}</div>
                <div className="st-cell value">{stats.size}</div>
                <div className="st-cell value" style={{ color: 'var(--accent)' }}>{grade}</div>

                {/* --- Row 2 Headers --- */}
                <StatHeader label="Awareness" />
                <StatHeader label="Ranged Atk" />
                <StatHeader label="Close Combat" />
                <StatHeader label="Dodge" />
                <StatHeader label="Athletics" className="touch-right" />
                <StatHeader label="Strength" className="touch-left" />
                <StatHeader label="Max Soul" />
                <StatHeader label="Movement" />
                <StatHeader label="Perseverance" />
                <StatHeader label="Primary Atk" />
                <div className="st-cell empty"></div> {/* Filler for col 11 */}

                {/* --- Row 2 Values --- */}
                <div className="st-cell value">{stats.awareness}</div>
                <div className="st-cell value">{stats.rangedAttack}</div>
                <div className="st-cell value">{stats.closeCombat}</div>
                <div className="st-cell value">{stats.dodge}</div>
                <div className="st-cell value touch-right">{stats.athletics}</div>
                <div className="st-cell value touch-left">{stats.strength}</div>
                <div className="st-cell value">{stats.maxSoul}</div>
                <div className="st-cell value">{stats.movement}</div>
                <div className="st-cell value">{stats.perseverance}</div>
                <div className="st-cell value">{stats.primaryAttack}</div>
                <div className="st-cell empty"></div>
            </div>

            {/* Flying Section */}
            {stats.hasFlier && (
            <div className="statblock-section">
                <div className="section-title">Flight</div>
                <div className="section-flex-column">
                    <span><strong>Fly Speed:</strong> {flySpeed}</span>
                    <span><strong>Maneuvers:</strong> {maneuvers}</span>
                    <span><strong>Flying Skill:</strong> {stats.flying}</span>
                </div>
            </div>
            )}
            {/* Horde Rules Section */}
            <div className="statblock-section">
                <div className="section-title">Horde Rules</div>
                <div className="section-flex-column">
                    <span><strong>Upkeep:</strong> {upkeep}</span>
                    <span>
                        <strong>Primary Biomes:</strong>{' '}
                        {horde.primaryBiomes?.length ? horde.primaryBiomes.map(b => (
                            <span key={b}>
                                <BiomeTag name={b} variant="primary" />
                                {horde.primaryBiomes.indexOf(b) < horde.primaryBiomes.length - 1 ? ', ' : ''}
                            </span>
                        )) : 'None'}
                    </span>
                    <span>
                        <strong>Secondary Biomes:</strong>{' '}
                        {horde.secondaryBiomes?.length ? horde.secondaryBiomes.map(b => (
                            <span key={b}>
                                <BiomeTag name={b} variant="secondary" />
                                {horde.secondaryBiomes.indexOf(b) < horde.secondaryBiomes.length - 1 ? ', ' : ''}
                            </span>
                        )) : 'None'}
                    </span>
                </div>
                {horde.features && horde.features.length > 0 && (
                    <div className="beast-section mt-1">
                        <div className="beast-section-title" style={{ fontSize: '11px', marginTop: '8px' }}>Horde Features</div>
                        <EntryList items={horde.features} className="beast-feature-list" beast={beast} mod={mod} />
                    </div>
                )}
            </div>

            {/* Features & Actions */}
            {computedFeatures.length > 0 && (
                <div className="beast-section">
                    <div className="beast-section-title"><strong>Features</strong></div>
                    <EntryList items={computedFeatures} className="beast-feature-list" beast={beast} mod={mod} />
                </div>
            )}

            {beast.combatActions && beast.combatActions.length > 0 && (
                <div className="beast-section">
                    <div className="beast-section-title"><strong>Combat Actions</strong></div>
                    <EntryList items={beast.combatActions} className="beast-action-list" beast={beast} mod={mod} />
                </div>
            )}

            {horde.orders && horde.orders.length > 0 && (
                <div className="beast-section">
                    <div className="beast-section-title"><strong>Unique Horde Orders</strong></div>
                    <EntryList items={horde.orders} className="beast-action-list" beast={beast} mod={mod} />
                </div>
            )}
        </div>
    );
};

// --- Main Beasts Component ---
const Beasts = () => {
    const [screenWidth, setScreenWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1200
    );
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [expandedId, setExpandedId] = useState(null);

    function getSortValue(beast, key) {
        switch (key) {
            case 'name':
                return beast.name ?? '';
            case 'grade':
                return beast.hordeRules?.grade ?? '';
            case 'size':
                return beast.secondaryAttributes?.size ?? '';
            case 'movement':
                return beast.secondaryAttributes?.movement ?? '';
            case 'upkeep':
                return beast.hordeRules?.upkeep ?? '';
            default:
                return beast[key] ?? '';
        }
    }

    const SortTh = ({ label, sortKey, sortConfig, onSort, className }) => {
        const active = sortConfig.key === sortKey;
        return (
            <th
                className={`${active ? 'sort-active' : ''} ${className ?? ''}`}
                onClick={() => onSort(sortKey)}
            >
                {label} -
                <span className="sort-arrow">
                    {active ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </span>
            </th>
        );
    };

    React.useEffect(() => {
        const onResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const requestSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    const processedBeasts = useMemo(() => {
        const list = [...beastList];
        const { key, direction } = list.length ? sortConfig : { key: null };
        if (key) {
            list.sort((a, b) => {
                const av = getSortValue(a, key);
                const bv = getSortValue(b, key);
                if (typeof av === 'number' && typeof bv === 'number') {
                    return direction === 'asc' ? av - bv : bv - av;
                }
                const cmp = String(av).localeCompare(String(bv));
                return direction === 'asc' ? cmp : -cmp;
            });
        }
        return list;
    }, [sortConfig]);

    return (
        <div className="gu-shell">
            <header className="gu-topbar">
                <div>
                    <div className="gu-title">Beasts</div>
                    <div className="gu-subtitle">Master of Gu SRD</div>
                </div>
                <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                    ← Back to Directory
                </Link>
            </header>
            <main className="gu-main">
                <div className="gu-table-wrap">
                    <table className="gu-table">
                        <thead>
                            <tr>
                                <SortTh label="Name" sortKey="name" sortConfig={sortConfig} onSort={requestSort} />
                                {screenWidth >= 718 && (
                                    <SortTh label="Grade" sortKey="grade" sortConfig={sortConfig} onSort={requestSort} className="col-type" />
                                )}
                                {screenWidth >= 768 && (
                                    <>
                                        <SortTh label="Size" sortKey="size" sortConfig={sortConfig} onSort={requestSort} className="col-cost" />
                                        <SortTh label="Movement" sortKey="movement" sortConfig={sortConfig} onSort={requestSort} className="col-range" />
                                        <SortTh label="Upkeep" sortKey="upkeep" sortConfig={sortConfig} onSort={requestSort} className="col-health" />
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {processedBeasts.length === 0 ? (
                                <tr>
                                    <td colSpan="5">
                                        <div className="gu-empty">
                                            {beastList.length === 0 ? 'Loading…' : 'No results match your filters.'}
                                        </div>
                                    </td>
                                </tr>
                            ) : processedBeasts.map(beast => {
                                const secondary = beast.secondaryAttributes ?? {};
                                const horde = beast.hordeRules ?? {};
                                const rID = beast.id ?? beast.name;

                                return (
                                    <React.Fragment key={rID}>
                                        <tr
                                            id={`beast-row-${rID}`}
                                            className="gu-row"
                                            onClick={() => setExpandedId(expandedId === rID ? null : rID)}
                                        >
                                            <td className="cell-name">{beast.name}</td>
                                            {screenWidth >= 718 && (
                                                <td><span className="type-badge">{horde.grade}</span></td>
                                            )}
                                            {screenWidth >= 768 && (
                                                <>
                                                    <td className="cell-cost col-cost">{secondary.size}</td>
                                                    <td className="cell-range col-range">{secondary.movement}</td>
                                                    <td className="cell-upkeep col-upkeep">{horde.upkeep}</td>
                                                </>
                                            )}
                                        </tr>

                                        {expandedId === rID && (
                                            <tr className="gu-expanded-row">
                                                <td colSpan={screenWidth >= 768 ? "5" : (screenWidth >= 718 ? "2" : "1")}>
                                                    <div className="gu-expanded-inner">
                                                        <ExpandedStatblock beast={beast} />
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default Beasts;
