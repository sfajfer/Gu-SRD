import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const Talents = () => {
    const [expandedName, setExpandedName] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

    const talentsData = [
        {
            name: "Agile Strikes",
            cost: "20 experience",
            req: "Fundamental Wind",
            desc: "Whenever you add your Strength Attribute to the damage of an attack, you may instead use your Athletics skill."
        },
        {
            name: "Charger",
            cost: "20 experience",
            req: "none",
            desc: "When you take the Sprint Combat Action, you may make a single punch attack or activate a Gu with a range of Touch at some point during your turn. If you make a punch attack and it hits, the target is thrown backward 1 meter for every 100 points you have in Strength. Making the attack or activating a Gu with a range of Touch expends the remainder of your movement."
        },
        {
            name: "Combat Absorption",
            cost: "30 experience",
            req: "none",
            desc: "You can multitask on absorbing primeval stones in the heat of combat. You may absorbe the essence of primeval stones as a Bonus Action or a Combat Action."
        },
        {
            name: "Charlatan",
            cost: "60 experience",
            req: "none",
            desc: "Your Attitude attribute is permanently increased by 5 and you gain advantage on Deception skill tests."
        },
        {
            name: "Flurry",
            cost: "20 experience",
            req: "Fundamental Strength",
            desc: "You gain access to the Flurry Combat Action.\n\nFlurry: For every arm you have, make two punch attacks against a creature within 1 meter. You gain a +20 penalty to Dodge skill tests and Close Combat skill tests made to parry attacks until the start of your next turn."
        },
        {
            name: "Cultivation Practice",
            cost: "30 experience",
            req: "none",
            desc: "Your Cultivation skill is permanently increased by 10. Reduce any damage dealt to your soul when you fail a Cultivation skill test by 1."
        },
        {
            name: "Flying Master",
            cost: "45 experience",
            req: "none",
            desc: "Taking flight no longer expends one of your Maneuvers per turn. Your Flying skill is permanently increased by 20."
        },
        {
            name: "Glib",
            cost: "70 experience",
            req: "none",
            desc: "Your Attitude attribute is permanently increased by 5. You gain advantage on Haggle and Persuasion skill tests."
        },
        {
            name: "Lightning Reflexes",
            cost: "10 experience",
            req: "Master Lightning",
            desc: "Your Dodge skill is permanently increased by 10 and you gain advantage on initiative rolls."
        },
        {
            name: "Martial Artist",
            cost: "15 experience",
            req: "none",
            desc: "Can be purchased up to 3 times\n\nYou gain a -5 bonus to Close Combat and Dodge skill tests while not wielding any weapons."
        },
        {
            name: "Multitasker",
            cost: "40 experience",
            req: "none",
            desc: "Can be purchased up to 3 times\n\nYou can sustain an additional Gu every turn without incurring damage to your soul."
        },
        {
            name: "Multi-Weapon Fighting",
            cost: "20 experience",
            req: "none",
            desc: "You can make a number of melee attacks as part of a melee attack Combat Action as you have wielded weapons, with a +10 penalty to each attack. When wielding only 2 weapons, this penalty is removed."
        },
        {
            name: "Natural Muscle Training",
            cost: "15 experience",
            req: "none",
            desc: "Can be purchased up to 5 times\n\nYour Strength attribute is permanently increased by 9 and your Fortitude attribute is permanently increased by 1."
        },
        {
            name: "Not So Fast",
            cost: "25 experience",
            req: "none",
            desc: "You may make the Grapple Combat Action as an attack of opportunity. You still have disadvantage on the Close Combat skill test if the target triggered your attack of opportunity with a Dodge skill test."
        },
        {
            name: "Pain Tolerance",
            cost: "10 experience",
            req: "Intermediate Strength",
            desc: "Can be purchased up to 3 times\n\nCannot be learned through downtime\n\nYour maximum hit points are increased by 5, and you gain a -10 bonus to all Perseverance attribute tests."
        },
        {
            name: "Partial Artist",
            cost: "80 experience",
            req: "none",
            desc: "You’ve had an epiphany and internalized the idea of Painting Path. Choose a single Gu with the [Dao] keyword (whether you own it or not). You may be under the effects of that Gu even if its path is not compatible with the paths of your other [Dao] Gu. Whenever you break through a small or large realm, you may replace your chosen Gu with a different one."
        },
        {
            name: "[Path] Scholar",
            cost: "10 experience",
            req: "Fundamental [Path]",
            desc: "You gain a -20 bonus to Knowledge (Gu) skill tests made to identify [Path] Gu."
        },
        {
            name: "Pickpocket",
            cost: "10 experience",
            req: "Fundamental Theft",
            desc: "Awareness skill tests made to detect you stealing from someone's pockets are made with disadvantage"
        },
        {
            name: "Poison Resistant",
            cost: "20 experience",
            req: "Intermediate Poison",
            desc: "The duration of poisons affecting you are reduced by half, rounded down to a minimum of 1 turn.\n\nYour Fortitude is permanently increased by 5."
        },
        {
            name: "Reactive Flight",
            cost: "15 experience",
            req: "none",
            desc: "As a Reaction to being sent airborne, you can activate a Gu that grants a flying speed and immediately execute a Maneuver for free."
        },
        {
            name: "Sentinel",
            cost: "25 experience",
            req: "none",
            desc: "Whenever a creature within your melee range makes a melee attack against your ally, you may use the Parry Reaction against it. You gain a -10 bonus to all Close Combat skill tests made as part of the Parry Reaction (including the follow-up attack)."
        },
        {
            name: "Shoal Skirter",
            cost: "10 experience",
            req: "Fundamental Water",
            desc: "Your swimming speed is increased by 4 meters and you can hold your breath twice as long."
        },
        {
            name: "Skulker",
            cost: "15 experience",
            req: "Fundamental Dark",
            desc: "Awareness skill tests made to perceive you are made with a +20 penalty."
        },
        {
            name: "Spear Master",
            cost: "20 experience",
            req: "none",
            desc: "When you hit a creature with a weapon attack using a spear for the first time each turn, you may immediately make a second weapon attack with the same spear. The second attack must be made with one hand and can be against any target within range."
        },
        {
            name: "Swordsman",
            cost: "20 experience",
            req: "Fundamental Sword",
            desc: "You have a -10 bonus to attack rolls made with swords and skill tests made to parry an attack while wielding a sword."
        },
        {
            name: "Tough",
            cost: "60 experience",
            req: "none",
            desc: "Cannot be learned through downtime\n\nYour base hit points are equal to twice your Fortitude."
        },
        {
            name: "Twice as Bright, Twice as Fast",
            cost: "20 experience",
            req: "Fundamental Fire",
            desc: "Once per turn, when you activate a Fire Path Gu of the same rank as you, you may expend twice its primeval essence cost to activate a Fire Path Gu of a lower rank than you for free, without spending an activation."
        },
        {
            name: "Weapon Training",
            cost: "15 experience",
            req: "none",
            desc: "Can be purchased up to 3 times\n\nWhen you purchase this talent, pick a class of mundane weapons (daggers, swords, spears, staves, or bows) or a single Gu.\n\nYou gain a -10 bonus on Close Combat and Ranged Attack skill tests made with the chosen weapon for each time you’ve purchased this talent and selected that weapon. Higher ranked versions of a Gu are typically close enough in form to the original for the bonus to apply to them."
        },
        {
            name: "Well Fed",
            cost: "20 experience",
            req: "Fundamental Food",
            desc: "Can be purchased up to 3 times\n\nCannot be learned through downtime\n\nYour Fortitude is permanently increased by 5, your weight is increased by 25 kilograms, and your movement is reduced by 1. If you purchase this talent 3 times, your size becomes [Large]."
        },
        {
            name: "Wrestling Techniques",
            cost: "20 Experience",
            req: "Fundamental Strength",
            desc: "You gain a -10 bonus to Athletics skill tests resulting from a Grapple Combat Action. When you successfully grapple a creature, you may make a single punch attack against them as part of the Grapple Combat Action."
        }
    ];

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const processedTalents = useMemo(() => {
        let sortedData = [...talentsData];
        if (sortConfig.key) {
            sortedData.sort((a, b) => {
                let valA = a[sortConfig.key];
                let valB = b[sortConfig.key];

                // Numeric parsing for cost row (e.g. "20 experience" -> 20)
                if (sortConfig.key === 'cost') {
                    valA = parseInt(valA, 10) || 0;
                    valB = parseInt(valB, 10) || 0;
                    return sortConfig.direction === 'ascending' ? valA - valB : valB - valA;
                }

                // Standard string comparison for name and requirement strings
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
                    <div className="gu-title">Talents</div>
                    <div className="gu-subtitle">Master of Gu SRD</div>
                </div>
                <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                    ← Back to Directory
                </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>
                <h1 className="rule-heading">Talents</h1>
                <p className="rule-text" style={{ marginBottom: '25px' }}>
                    Click a talent row to expand and view its full description and parameters. Click column headers to sort.
                </p>

                <div className="gu-table-wrap">
                    <table className="gu-table">
                        <thead>
                            <tr>
                                <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => requestSort('name')}>
                                    Talent Name {renderSortArrow('name')}
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
                            {processedTalents.map((talent) => (
                                <React.Fragment key={talent.name}>
                                    <tr 
                                        className="gu-row" 
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setExpandedName(expandedName === talent.name ? null : talent.name)}
                                    >
                                        <td style={{ fontWeight: 'bold', color: expandedName === talent.name ? '#c19b41' : 'inherit' }}>
                                            {talent.name} {expandedName === talent.name ? '▼' : '►'}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>{talent.cost}</td>
                                        <td style={{ textAlign: 'center', color: talent.req === 'none' ? '#777' : 'inherit' }}>{talent.req}</td>
                                    </tr>
                                    {expandedName === talent.name && (
                                        <tr className="gu-expanded-row">
                                            <td colSpan="3">
                                                <div className="gu-expanded-inner" style={{ padding: '15px 20px', background: '#1e1e1e' }}>
                                                    {talent.desc.split('\n\n').map((paragraph, pIdx) => (
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

export default Talents;