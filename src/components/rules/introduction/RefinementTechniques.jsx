import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const RefinementTechniques = () => {
    const [expandedName, setExpandedName] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

    const techniquesData = [
        {
            name: "Batch Refinement",
            cost: "25 experience",
            req: "Intermediate Refinement",
            desc: "You gain access to the Batch Refinement refinement technique. When you use the Batch Refinement refinement technique, you gain a +20 penalty to Refinement skill tests, and every cost of the recipe is tripled (including Gu). If you succeed the Refinement skill test, you produce 5 of the Gu; you must roll the failure die separately for each Gu."
        },
        {
            name: "Bellows Stove",
            cost: "15 experience",
            req: "Fundamental Wind",
            desc: "You gain access to the Bellows Stove refinement technique. When you use the Bellows Stove refinement technique, you gain a -20 bonus to Refinement skill tests. If you fail the refinement, the damage of the backlash is increased by 2. This refinement technique can only be used to refine Fire, Food, and Wind Path Gu."
        },
        {
            name: "Brute Force",
            cost: "25 experience",
            req: "Master Strength",
            desc: "You gain access to the Brute Force refinement technique. When you use the Brute Force refinement technique, you gain a -40 bonus to Refinement skill tests, and the failure die of the recipe is forced to be a d2. If the recipe belongs to Strength Path, the failure die is instead a d3. This refinement technique cannot be used to refine Wisdom Path Gu."
        },
        {
            name: "Dice Falling Waterfall",
            cost: "10 experience",
            req: "Fundamental Luck",
            desc: "You gain access to the Dice Falling Waterfall refinement technique. When you use the Dice Falling Waterfall refinement technique, you must roll the failure die twice and take the lower result. Upon successfully refining a Gu with this technique, you gain a luck point. This refinement technique cannot be used to refine Rule Path Gu."
        },
        {
            name: "Dual Refinement",
            cost: "20 experience",
            req: "Intermediate Refinement",
            desc: "You gain access to the Dual Refinement refinement technique. When you use the Dual Refinement refinement technique, you may refine two unique Gu at the same time. The Gu must be of the same or compatible paths (see Ch. 3, Gu) and their recipes must have the same duration. You make only one Refinement test, but otherwise treat the refinement as if they were two separate refinements."
        },
        {
            name: "Extended Refinement",
            cost: "10 experience",
            req: "Fundamental Refinement",
            desc: "You gain access to the Extended Refinement refinement technique. When you use the Extended Refinement refinement technique, you gain a -20 bonus to Refinement skill tests, and the duration of the recipe is increased by 8 hours. This refinement technique cannot be used to refine Time Path Gu."
        },
        {
            name: "False Refinement",
            cost: "20 experience",
            req: "Intermediate Refinement",
            desc: "False refinement was invented by Thieving Heaven Demon Venerable, enabling the production of counterfeit Gu.\n\nYou gain access to the False Refinement refinement technique. When you use the False Refinement refinement technique, you gain a -10 bonus to Refinement skill tests, and the primeval stone cost of the recipe is reduced by 75% (rounded down). When you successfully refine a Gu using the False Refinement refinement technique, the refined Gu is counterfeit. It cannot be activated, but otherwise appears exactly the same as the real version of the Gu. Gu used to appraise the counterfeit must be of a rank equal to or higher than your degrees of success (maximum 5) on the Refinement skill test in order to determine it is a fake."
        },
        {
            name: "Hairy Man Heaven and Earth",
            cost: "50 experience",
            req: "Master Refinement",
            desc: "Condenses Gu from Heaven and Earth, opposed to Human Isolation Style. This technique is normally known only to Hairy Men, and takes great practice to perform.\n\nYou gain access to the Hairy Man Heaven and Earth refinement technique. When you use the Hairy Man Heaven and Earth refinement technique, you gain a -30 bonus to Refinement skill tests, and the failure die of the recipe is increased by 2 stages (d4 -> d8, d6 -> d10…). This refinement technique cannot be used to refine Human Path Gu."
        },
        {
            name: "One After Another",
            cost: "25 experience",
            req: "Fundamental Wood",
            desc: "You gain access to the One After Another refinement technique. When you use the One After Another refinement technique, you gain a -30 bonus to Refinement skill tests, and the duration of the refinement is increased by 4 hours. This refinement technique can only be used to refine Wood Path Gu."
        },
        {
            name: "Reduction",
            cost: "20 experience",
            req: "Intermediate Food",
            desc: "You gain access to the Reduction refinement technique. When you use the Reduction refinement technique, the primeval stone cost of the recipe is reduced by 50% (rounded down). If you fail the refinement, the damage of the backlash is reduced by 1."
        },
        {
            name: "Research",
            cost: "25 experience",
            req: "Intermediate Wisdom",
            desc: "You gain access to the Research refinement technique. Whenever you successfully refine a Gu using the Research refinement technique, you gain a -20 bonus on your next Refinement test made to improve that recipe. This bonus does not stack."
        },
        {
            name: "Sacrifice",
            cost: "10 experience",
            req: "Intermediate Blood",
            desc: "Whenever you use the Sacrifice refinement technique, you may take any amount of damage directly to your hit points. This damage cannot be reduced or negated in any way. The primeval stone cost of the recipe is reduced by 100 * (sacrificed hit points), to a minimum of 10% of the recipe’s primeval stone cost."
        },
        {
            name: "Sauté",
            cost: "15 experience",
            req: "Fundamental Food",
            desc: "You gain access to the Sauté refinement technique. When you use the Sauté refinement technique, you gain a -10 bonus to all Refinement tests, and increase the primeval stone cost of the recipe by 50% (rounding down). For every Gu used in the recipe, roll 1d10. If you roll a 1, that Gu is not consumed during the refinement."
        },
        {
            name: "Shower",
            cost: "15 experience",
            req: "Fundamental Water",
            desc: "You gain access to the Shower refinement technique. When you use the Shower refinement technique, you gain a -10 bonus to Refinement skill tests, and the duration of the recipe is reduced by 50%. This refinement technique can only be used to refine Blood, Poison, and Water Path Gu."
        },
        {
            name: "Starfall",
            cost: "15 experience",
            req: "Fundamental Fire",
            desc: "When you use the Starfall refinement technique, you gain a -10 bonus to Refinement skill tests, increased to -20 when refining Fire Path Gu. This refinement technique can only be used to refine Fire, Light, Lightning, and Space Path Gu."
        },
        {
            name: "Yin Yang",
            cost: "20 experience",
            req: "none",
            desc: "You gain access to the Yin Yang refinement technique. When you use the Yin Yang refinement technique, you may refine two unique Gu at the same time. Their recipes must have the same duration, and the paths of the Gu must be one of the following pairs:\n•    Fire and Ice Path\n•    Space and Time Path\n•    Strength and Wisdom Path\n•    Light and Dark Path\n•    Earth and Wind Path\n•    Luck and Information Path\nYou make only one Refinement test, but otherwise treat the refinement as if they were two separate refinements."
        }
    ];

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const processedTechniques = useMemo(() => {
        let sortedData = [...techniquesData];
        if (sortConfig.key) {
            sortedData.sort((a, b) => {
                let valA = a[sortConfig.key];
                let valB = b[sortConfig.key];

                if (sortConfig.key === 'cost') {
                    valA = parseInt(valA, 10) || 0;
                    valB = parseInt(valB, 10) || 0;
                    return sortConfig.direction === 'ascending' ? valA - valB : valB - valA;
                }

                valA = String(valA).toLowerCase();
                valB = String(valB).toLowerCase();

                if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return sortedData;
    }, [sortConfig]);

    const renderSortArrow = (key) => {
        if (sortConfig.key !== key) return null;
        return <span style={{ marginLeft: '5px' }}>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>;
    };

    return (
        <div className="gu-shell">
            <header className="gu-topbar">
                <div>
                    <div className="gu-title">Refinement Techniques</div>
                    <div className="gu-subtitle">Master of Gu SRD</div>
                </div>
                <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                    ← Back to Directory
                </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>
                <h1 className="rule-heading">Refinement Techniques</h1>
                <p className="rule-text">
                    Refinement techniques are used to improve the Gu refinement process in many different ways, such as reducing the difficulty, duration, or even material cost of a refinement recipe. Only one refinement technique can be used on a recipe at a time.
                </p>
                <p className="rule-text" style={{ marginBottom: '25px' }}>
                    Click a technique row to expand and view its full description and parameters. Click column headers to sort.
                </p>

                <div className="gu-table-wrap">
                    <table className="gu-table">
                        <thead>
                            <tr>
                                <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => requestSort('name')}>
                                    Technique Name {renderSortArrow('name')}
                                </th>
                                <th style={{ textAlign: 'center', width: '25%', cursor: 'pointer', userSelect: 'none' }} onClick={() => requestSort('cost')}>
                                    Cost {renderSortArrow('cost')}
                                </th>
                                <th style={{ textAlign: 'center', width: '30%', cursor: 'pointer', userSelect: 'none' }} onClick={() => requestSort('req')}>
                                    Requirement {renderSortArrow('req')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {processedTechniques.map((technique) => (
                                <React.Fragment key={technique.name}>
                                    <tr 
                                        className="gu-row" 
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setExpandedName(expandedName === technique.name ? null : technique.name)}
                                    >
                                        <td style={{ fontWeight: 'bold', color: expandedName === technique.name ? '#c19b41' : 'inherit' }}>
                                            {technique.name} {expandedName === technique.name ? '▼' : '►'}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>{technique.cost}</td>
                                        <td style={{ textAlign: 'center', color: technique.req === 'none' ? '#777' : 'inherit' }}>{technique.req}</td>
                                    </tr>
                                    {expandedName === technique.name && (
                                        <tr className="gu-expanded-row">
                                            <td colSpan="3">
                                                <div className="gu-expanded-inner" style={{ padding: '15px 20px', background: '#1e1e1e' }}>
                                                    {technique.desc.split('\n\n').map((paragraph, pIdx) => (
                                                        <p key={pIdx} className="rule-text" style={{ margin: '8px 0', lineHeight: '1.5' }}>
                                                            {paragraph.split('\n').map((line, lIdx) => (
                                                                <React.Fragment key={lIdx}>
                                                                    {line}
                                                                    {lIdx < paragraph.split('\n').length - 1 && <br />}
                                                                </React.Fragment>
                                                            ))}
                                                        </p>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default RefinementTechniques;