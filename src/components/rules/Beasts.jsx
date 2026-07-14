import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../Styles.css';
import beastList from '../../assets/beast-index.json';

// --- Shared Helpers ---
function splitEntry(text) {
    const idx = text.indexOf(' - ');
    if (idx === -1) return { label: null, body: text };
    return { label: text.slice(0, idx), body: text.slice(idx + 3) };
}

function isFlying(features) {
    for (const feature of features) {
        const {label, body} = splitEntry(feature);
        if (label && label.toLowerCase().includes('flier')) {
            return true;
        }
    }
    return false;
}

const EntryList = ({ items, className }) => {
    return (
        <ul className={className}>
            {items.map((item, i) => {
                const { label, body } = splitEntry(item);
                return (
                    <li key={i} className="beast-entry">
                        {label && <span className="beast-entry-name">{label}</span>}
                        <span className="beast-entry-body">{body}</span>
                    </li>
                );
            })}
        </ul>
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

function resolve(obj, ...keys) {
    if (!obj) return 'PH';
    for (let key of keys) {
        if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
            return obj[key];
        }
    }
    return 'PH';
}

function applyMath(base, val, isMult = false) {
    if (base === 'PH') return 'PH';
    let num = Number(base);
    if (isNaN(num)) return base;
    return isMult ? num * val : num + val;
}

// Statblock Subcomponent
const ExpandedStatblock = ({ beast }) => {

    const primary = beast.primaryAttributes || {};
    const secondary = beast.secondaryAttributes || {};
    const horde = beast.hordeRules || {};
    const flying = isFlying(beast.features) ? primary.agility * 2 : null;

    const grade = resolve(horde, 'grade');
    const isMutated = (grade === 'Mutated');
    const [selectedClass, setSelectedClass] = useState(isMutated ? 'Mutated Beast King' : 'Ordinary');

    const options = isMutated
        ? ['Ordinary', 'Mutated Beast King']
        : ['Ordinary', 'Hundred Beast King', 'Thousand Beast King', 'Myriad Beast King', 'Beast Emperor'];

    // Enforce selection constraint if grade mutates via external updates
    const currentClass = options.includes(selectedClass) ? selectedClass : 'Ordinary';
    const mod = KING_CLASSES[currentClass];

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
                    <span className="beast-name">{beast.name}</span>
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
                <div className="st-cell header">Attitude</div>
                <div className="st-cell header">Wisdom</div>
                <div className="st-cell header">Cognition</div>
                <div className="st-cell header">Agility</div>
                <div className="st-cell header touch-right">Fortitude</div>
                <div className="st-cell header touch-left">Fort. Mult.</div>
                <div className="st-cell header">Max HP</div>
                <div className="st-cell header">Reactions</div>
                <div className="st-cell header"># Attacks</div>
                <div className="st-cell header">Size</div>
                <div className="st-cell header">Grade</div>

                {/* --- Row 1 Values --- */}
                <div className="st-cell value">{applyMath(resolve(primary, 'att', 'attitude'), mod.attr)}</div>
                <div className="st-cell value">{applyMath(resolve(primary, 'wis', 'wisdom'), mod.attr)}</div>
                <div className="st-cell value">{applyMath(resolve(primary, 'cog', 'cognition'), mod.attr)}</div>
                <div className="st-cell value">{applyMath(resolve(primary, 'agi', 'agility'), mod.attr)}</div>
                <div className="st-cell value touch-right">{applyMath(resolve(primary, 'fort', 'fortitude'), mod.attr)}</div>
                <div className="st-cell value touch-left">{applyMath(resolve(secondary, 'fortitudeMultiplier', 'fortitude Multiplier', 'fortMult'), mod.fort, true)}</div>
                <div className="st-cell value">{resolve(secondary, 'maxHp', 'max hp', 'hp')}</div>
                <div className="st-cell value">{resolve(secondary, 'reactions')}</div>
                <div className="st-cell value">{applyMath(resolve(secondary, 'numberOfAttacks', 'number of Attacks', 'attacks'), mod.attacks)}</div>
                <div className="st-cell value">{adjustSize(resolve(secondary, 'size'), mod.size)}</div>
                <div className="st-cell value" style={{ color: 'var(--accent)' }}>{grade}</div>

                {/* --- Row 2 Headers --- */}
                <div className="st-cell header">Awareness</div>
                <div className="st-cell header">Ranged Atk</div>
                <div className="st-cell header">Close Combat</div>
                <div className="st-cell header">Dodge</div>
                <div className="st-cell header touch-right">Athletics</div>
                <div className="st-cell header touch-left">Strength</div>
                <div className="st-cell header">Max Soul</div>
                <div className="st-cell header">Movement</div>
                <div className="st-cell header">Perseverance</div>
                <div className="st-cell header">Primary Atk</div>
                <div className="st-cell empty"></div> {/* Filler for col 11 */}

                {/* --- Row 2 Values --- */}
                <div className="st-cell value">{resolve(secondary, 'awareness')}</div>
                <div className="st-cell value">{resolve(secondary, 'rangedAttack', 'ranged Attack')}</div>
                <div className="st-cell value">{resolve(secondary, 'closeCombat', 'close Combat')}</div>
                <div className="st-cell value">{resolve(secondary, 'dodge')}</div>
                <div className="st-cell value touch-right">{resolve(secondary, 'athletics')}</div>
                <div className="st-cell value touch-left">{resolve(secondary, 'strength')}</div>
                <div className="st-cell value">{resolve(secondary, 'maxSoul', 'max soul', 'soul')}</div>
                <div className="st-cell value">{resolve(secondary, 'movement')}</div>
                <div className="st-cell value">{resolve(secondary, 'perseverance')}</div>
                <div className="st-cell value">{resolve(secondary, 'primaryAttack', 'primary Attack')}</div>
                <div className="st-cell empty"></div>
            </div>

            {/* Flying Section */}
            {flying && (
            <div className="statblock-section">
                <div className="section-title">Flight</div>
                <div className="section-flex-row">
                    <span><strong>Fly Speed:</strong> {resolve(flying, 'speed', 'flySpeed')}</span>
                    <span><strong>Maneuvers:</strong> {resolve(flying, 'maneuvers')}</span>
                    <span><strong>Flying Skill:</strong> {resolve(flying, 'skill', 'flyingSkill')}</span>
                </div>
            </div>
            )}
            {/* Horde Rules Section */}
            <div className="statblock-section">
                <div className="section-title">Horde Rules</div>
                <div className="section-flex-row">
                    <span><strong>Upkeep:</strong> {resolve(horde, 'upkeep')}</span>
                    <span>
                        <strong>Primary Biomes:</strong>{' '}
                        {horde.primaryBiomes?.length ? horde.primaryBiomes.map(b => <BiomeTag key={b} name={b} variant="primary" />) : 'PH'}
                    </span>
                    <span>
                        <strong>Secondary Biomes:</strong>{' '}
                        {horde.secondaryBiomes?.length ? horde.secondaryBiomes.map(b => <BiomeTag key={b} name={b} variant="secondary" />) : 'PH'}
                    </span>
                </div>
                {horde.features && horde.features.length > 0 && (
                    <div className="beast-section mt-1">
                        <div className="beast-section-title" style={{ fontSize: '11px', marginTop: '8px' }}>Horde Features</div>
                        <EntryList items={horde.features} className="beast-feature-list" />
                    </div>
                )}
            </div>

            {/* Features & Actions */}
            {computedFeatures.length > 0 && (
                <div className="beast-section">
                    <div className="beast-section-title">Features</div>
                    <EntryList items={computedFeatures} className="beast-feature-list" />
                </div>
            )}

            {beast.combatActions && beast.combatActions.length > 0 && (
                <div className="beast-section">
                    <div className="beast-section-title">Combat Actions</div>
                    <EntryList items={beast.combatActions} className="beast-action-list" />
                </div>
            )}

            {horde.orders && horde.orders.length > 0 && (
                <div className="beast-section">
                    <div className="beast-section-title">Unique Horde Orders</div>
                    <EntryList items={horde.orders} className="beast-action-list" />
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
                                                    <td className="cell-health col-health">{horde.upkeep}</td>
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