import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const GuKeywords = () => {
    const [expandedName, setExpandedName] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

    const deductiveTableData = [
        { attainment: "None", maxGu: "1" },
        { attainment: "Fundamental", maxGu: "2" },
        { attainment: "Intermediate", maxGu: "3" },
        { attainment: "Master", maxGu: "5" },
    ];

    const ingredientTableData = [
        { attainment: "Fundamental", maxIngredients: "2" },
        { attainment: "Intermediate", maxIngredients: "3" },
        { attainment: "Master", maxIngredients: "5" },
    ];

    const sizeTableData = [
        { size: "Tiny", mod: "+40" },
        { size: "Small", mod: "+20" },
        { size: "Medium", mod: "0" },
        { size: "Large", mod: "-20" },
        { size: "Huge", mod: "-40" },
    ];

    const keywordsData = [
        {
            name: "Deductive",
            desc: (
                <>
                    <p className="rule-text">
                        When activated, [Deductive] Gu unlock a special Deduction action. To take it, you must spend 4 hours to deduce a specific subject or a killer move and make a Deduction skill test. Penalties and bonuses are determined by the amount of supporting information available to you. You can stack the effects of a number [Deductive] Gu to the same Deduction action according to your Wisdom Path Attainment, given in the following table:

                    </p>
                    <div className="gu-table-wrap">
                        <table className="gu-table">
                            <thead>
                                <tr>
                                    <th style={{ backgroundColor: '#e67e22', color: 'black' }}>Attainment</th>
                                    <th style={{ backgroundColor: '#2980b9', color: 'white', textAlign: 'center' }}>Maximum [Deductive] Gu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deductiveTableData.map((row, idx) => (
                                    <tr key={idx} className="gu-row">
                                        <td>{row.attainment}</td>
                                        <td style={{ textAlign: 'center' }}>{row.maxGu}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="rule-text">
                        A specific subject can be something that occured in the past, such as who might have committed a murder, or something happening in the present or future, like why a rival clan may have purchased a huge amount of an unusual refinement material. At the GM’s discretion, you can also deduce plans of action, such as moneymaking schemes or attack plans. Deductions cannot create information out of thin air, and a success does not necessarily mean your deduction is correct if you lack a key piece of evidence. For every degree of success beyond 1 on the check, however, you gain one additional conclusion about the subject.
                    </p>
                    <p className="rule-text">
                        You may also use the Deduction action to create or improve refinement recipes. When you do so, you make the Refinement skill test like normal and add whatever effects are provided by the [Deductive] Gu you are using.
                    </p>
                </>
            )
        },
        {
            name: "Dao",
            desc: (
                <>
                    <p className="rule-text">
                        Gu with the [Dao] keyword contain much higher traces of dao than most mortal Gu. Dao of different paths naturally conflict, and a Gu Master cannot gain the effect from a [Dao] Gu if they are already under the effect of a [Dao] Gu of a non-compatible path. Path compatibilites are located on page 35. If a Gu belonging to Transformation Path has the [Dao] keyword, it belongs wholly to transformation path and is compatible with all other paths. Transformation Path Gu may instead have the [Dao: [Path]] keyword, indicating that the Dao belongs to a different path and inherits that path’s compatibilities. For example, Earth Chief Zombie Gu, which has the [Dao: Earth] keyword, can only be combined with [Dao] Gu of Metal, Transformation, or Wood Path.
                    </p>
                    <p className="rule-text">
                        Using the same [Dao] Gu multiple times does not stack the effect unless specified in the Gu description. You may also not apply multiple [Dao] Gu to the same body part. Most [Dao] Gu will specify what body part they carve dao into, and if the Gu does not list a body part then it has no body part restrictions.
                    </p>

                    {/* Special Exceptions Table */}
                    <strong className="rule-text" style={{ display: 'block', marginTop: '25px', marginBottom: '10px', color: '#c19b41', fontSize: '1.1rem' }}>
                        Special Body Slots
                    </strong>
                    <div className="gu-table-wrap" style={{ marginBottom: '25px' }}>
                        <table className="gu-table">
                            <thead>
                                <tr>
                                    <th style={{ backgroundColor: '#2980b9', color: 'white', width: '20%' }}>Slot</th>
                                    <th style={{ backgroundColor: '#2980b9', color: 'white' }}>Special Rules</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="gu-row">
                                    <td style={{ fontWeight: 'bold', verticalAlign: 'top' }}>Full Body</td>
                                    <td>
                                        [Dao] Gu with the [Transformation] keyword affect your full body, but you can still apply [Dao] Gu to other body parts as long as you still have that body part after transforming.
                                    </td>
                                </tr>
                                <tr className="gu-row">
                                    <td style={{ fontWeight: 'bold', verticalAlign: 'top' }}>Eyes</td>
                                    <td>
                                        Whether the Gu affects one eye or both, it counts as augmenting your eyes.
                                    </td>
                                </tr>
                                <tr className="gu-row">
                                    <td style={{ fontWeight: 'bold', verticalAlign: 'top' }}>Ears</td>
                                    <td>
                                        Whether the Gu affects one ear or both, it counts as augmenting your ears.
                                    </td>
                                </tr>
                                <tr className="gu-row">
                                    <td style={{ fontWeight: 'bold', verticalAlign: 'top' }}>Muscles</td>
                                    <td>
                                        Can be a specific muscle or the entire muscular system. Beast Strength Gu are an exception, as they can strengthen muscles and still be combined with compatible muscle affecting [Dao] Gu. A Gu Master can only have up to 9 Beast Strength Gu effects at a time.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Clean Grid for Generic Slots */}
                    <strong className="rule-text" style={{ display: 'block', marginBottom: '10px', color: '#c19b41', fontSize: '1.1rem' }}>
                        Standard Body Slots
                    </strong>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
                        gap: '10px', 
                        background: '#1a1a1a', 
                        padding: '15px', 
                        borderRadius: '6px',
                        border: '1px solid #333'
                    }}>
                        {[
                            "Head", "Brain", "Torso", "Heart", 
                            "Lungs", "Aperture", "Arms", "Hands", 
                            "Legs", "Feet", "Skin", "Blood", 
                            "Bones", "Tendons", "Nervous System", "Circulatory System"
                        ].map(slot => (
                            <div key={slot} style={{ 
                                background: '#262626', 
                                padding: '10px', 
                                borderRadius: '4px', 
                                textAlign: 'center',
                                fontSize: '0.95rem',
                                borderLeft: '3px solid #2980b9',
                                color: '#e0e0e0',
                                fontWeight: '500'
                            }}>
                                {slot}
                            </div>
                        ))}
                    </div>
                </>
            )
        },
        {
            name: "Defensive",
            desc: <p className="rule-text">[Defensive] Gu can be activated as a Reaction to any event.</p>
        },
        {
            name: "Expendable X",
            desc: <p className="rule-text">[Expendable] Gu are destroyed after X uses. If there is no number, the Gu can only be used a single time before it is destroyed.</p>
        },
        {
            name: "Extinct",
            desc: <p className="rule-text">[Extinct] Gu no longer appear naturally in the world and require extinct refinement materials for their most common recipes. Refinement and Deduction skill tests made to create a recipe for an [Extinct] Gu are made with an additional +60 penalty.</p>
        },
        {
            name: "Fast",
            desc: <p className="rule-text">[Fast] Gu have a movement of 12 meters instead of 8.</p>
        },
        {
            name: "Ingredient",
            desc: (
                <>
                    <p className="rule-text">
                        Unique to Food Path, [Ingredient] Gu can be used to apply effects to meals you prepare. To prepare a meal, you must spend 30 minutes cooking; expend 1 primeval stone worth of materials and the total primeval essence cost of involved [Ingredient] Gu. The number of [Ingredient] Gu you can apply to the same meal is dependent on your Food Path Attainment. You cannot prepare a meal unless you have at least Fundamental Food Path Attainment.
                    </p>
                    <p className="rule-text">Each meal can feed 5 creatures.</p>
                    <div className="gu-table-wrap">
                        <table className="gu-table">
                            <thead>
                                <tr>
                                    <th style={{ backgroundColor: '#e67e22', color: 'black' }}>Attainment</th>
                                    <th style={{ backgroundColor: '#2980b9', color: 'white', textAlign: 'center' }}>Maximum Ingredients</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ingredientTableData.map((row, idx) => (
                                    <tr key={idx} className="gu-row">
                                        <td>{row.attainment}</td>
                                        <td style={{ textAlign: 'center' }}>{row.maxIngredients}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="rule-text">
                        The effects of a meal last for 4 hours, and a creature can only be under the effect of one meal at a time.
                    </p>
                </>
            )
        },
        {
            name: "Investigative",
            desc: (
                <>
                    <p className="rule-text">
                        Most [Investigative] Gu are divinations that are used to detect your surroundings for creatures, Gu, or even specific objects. The keyword will always be followed by the sense it augments; there are [Investigative: Sight] Gu, [Investigative: Hearing] Gu, [Investigative: Smell] Gu, and [Investigative: Detect] Gu. Sight, hearing, and smell are self explanatory, and you cannot see or hear through sight or hearing [Investigative] Gu if you have the blinded or the deafened condition, respectively. Detect Gu transmit the locations of whatever Gu, objects, or creatures the Gu is meant to detect directly into your mind, and do not require the use of any of your senses. If you use an [Investigative] Gu besides sight while blinded to detect the location of a creature, the +40 penalty to <Link className="rule-link" to="/rules/skills#close-combat">Close Combat</Link> and <Link className="rule-link" to="/rules/skills#ranged-attack">Ranged Attack</Link> skill tests from the blinded condition is reduced to a +10 penalty.
                    </p>
                    <p className="rule-text">
                        Stealthing effects like invisibility and illusions will usually specify one or more of the following:
                    </p>
                    <p className="rule-text" style={{ paddingLeft: '20px' }}>
                        • <strong>Invisible</strong> - Cannot be seen normally or by [Investigative: Sight] Gu. Also a condition that can be applied to creatures and objects.<br />
                        • <strong>Inaudible</strong> - Cannot be heard normally or by [Investigative: Hearing] Gu<br />
                        • <strong>Odorless</strong> - Cannot be smelled normally or by [Investigative: Smell] Gu<br />
                        • <strong>Undetectable</strong> - Cannot be detected by [Investigative: Detect] Gu
                    </p>
                    <p className="rule-text">
                        If the [Investigative] Gu is of high enough rank, it ignores the stealthing or illusory effect entirely. Unless otherwise specified, [Investigative] Gu ignore stealthing effects of a lower rank.
                    </p>
                </>
            )
        },
        {
            name: "Low Vitality",
            desc: <p className="rule-text">[Low Vitality] Gu do not regenerate hit points when they are fed. They will clarify the necessary Gu or process used to recover their health instead.</p>
        },
        {
            name: "Piercing",
            desc: (
                <>
                    <p className="rule-text">
                        [Piercing] Gu can pierce through any material that lacks dao. The only barriers with dao would be either immortal refinement materials or barriers created by Gu. Mundane armor worn by a creature struck by a [Piercing] attack does not reduce the damage of the attack, and the armor takes damage equal to the damage of the attack to its hit points.
                    </p>
                    <p className="rule-text">
                        [Piercing] Gu can also make attacks against targets fully obscured by cover with a +20 penalty. If the target is only partially obscured by cover, or if you know exactly where they are like from an [Investigative] Gu, attacks made with a [Piercing] Gu against them do not have the usual cover penalty.
                    </p>
                </>
            )
        },
        {
            name: "Shield",
            desc: (
                <>
                    <p className="rule-text">
                        When you take damage, that damage is first assigned to any active Gu with the [Shield] keyword so long as the Gu can block that damage type. If you have multiple [Shield] Gu active and it isn’t immediately clear which one would block the attack first, you may decide in what order damage is assigned. If you use a [Shield] Gu to reduce damage, the Gu takes that damage to its hitpoints.
                    </p>
                    <p className="rule-text">
                        If a [Shield] Gu would die from sustaining an attack while active, you may use a Reaction to deactivate the Gu at 1 hit point, taking the remaining damage to your hit points or another [Shield] Gu.
                    </p>
                </>
            )
        },
        {
            name: "Size",
            desc: (
                <>
                    <p className="rule-text">If size is not listed, the Gu is the most common size, [Tiny]; that of a large insect. If the Gu is [Small] it is the size of a child, and [Medium] is the size of a man. [Large] Gu take up 4 squares when outside of your aperture, and [Huge] Gu take up 9 or more squares. Creatures and objects also have a size.</p>
                    <div className="gu-table-wrap">
                        <table className="gu-table">
                            <thead>
                                <tr>
                                    <th style={{ backgroundColor: '#e67e22', color: 'black', textAlign: 'center' }}>Size</th>
                                    <th style={{ backgroundColor: '#2980b9', color: 'white', textAlign: 'center' }}>Modifier to Hit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sizeTableData.map((row, idx) => (
                                    <tr key={idx} className="gu-row">
                                        <td style={{ textAlign: 'center' }}>{row.size}</td>
                                        <td style={{ textAlign: 'center' }}>{row.mod}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )
        },
        {
            name: "Steed",
            desc: (
                <>
                    <p className="rule-text">
                        [Steed] Gu are typically larger than regular Gu and can be ridden while outside your aperture. They also come with a statblock, unlike most other Gu, as they are capable of fighting beyond just activating themselves. That being said, they do not have regular anatomy and are completely unaffected by injuries. It is impossible to sever a [Steed] Gu’s limbs until it is dead, and it has immunity to the bleeding, blinded and deafened conditions. Unless a poison specifically states it works on Gu, Gu are immune to the poisoned condition.
                    </p>
                    <p className="rule-text">
                        While mounted, you cannot move but instead move with the [Steed]. The [Steed] Gu shares your initiative and both of your turns are taken simultaneously. You decide what Reactions are taken by a refined [Steed] Gu, but each Reaction it takes expends one of your Reactions. If you take the Dodge Reaction while mounted, you must dismount and move at least one meter like normal, beginning by moving to a square adjacent to the mount.
                    </p>
                    <p className="rule-text">
                        Wild [Steed] Gu are often difficult to refine as they act more similar to beasts than other Gu, but once refined they cease to move or attack and only act as your will directs them to. Controlling a refined [Steed] Gu is as easy moving your fingers and does not harm your soul.
                    </p>
                </>
            )
        },
        {
            name: "Supplementary",
            desc: (
                <>
                    <p className="rule-text">
                        Supplementary Gu can change the properties of your subsequent activations. When used outside of killer moves, [Supplementary] Gu have no effect on Gu of a higher rank than itself. When used as supplementary Gu in a killer move, you will require a number of the same [Supplementary] Gu to properly apply the effect equal to: 
                    </p>
                    <p className="rule-text" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                        2^(killer move rank - [Supplementary] Gu rank)
                    </p>
                    <p className="rule-text">
                        Supplementary Gu inherit the [Sustained] keyword when used to augment [Sustained] Gu.
                    </p>
                </>
            )
        },
        {
            name: "Sustained",
            desc: (
                <>
                    <p className="rule-text">
                        You must pay the cost of [Sustained] Gu at the start of each of your turns as long as you keep the effect active. Paying the cost does not use one of your activations. While a Gu is being sustained, it cannot be activated (because it is already active). Take 1 damage to your soul for each Gu beyond your Activations attribute that you sustain at the start of each of your turns.
                    </p>
                    <p className="rule-text">
                        You may stop sustaining a Gu at any time, whether or not it is your turn. If you fall unconscious or are stunned, you automatically stop sustaining all Gu. When you stop sustaining a Gu, you cannot activate that Gu again until the start of your next turn.
                    </p>
                </>
            )
        },
        {
            name: "Split Second",
            desc: <p className="rule-text">Attacks made with [Split Second] Gu are too fast for the defender to react in time. When a creature uses a Reaction in response to the activation or effect of an [Split Second] Gu, their Reaction is delayed until after the Gu’s successful activation and application of its effect.</p>
        },
        {
            name: "Transformation",
            desc: (
                <>
                    <p className="rule-text">
                        Gu and, more commonly, killer moves with the [Transformation] keyword completely change the body of the user, granting it different attributes. The most common attribute changed is hit points, though some change other attributes like movement and strength. If your hit point or soul maximums are changed by a [Transformation] Gu, keep track of how much health or soul you had before the transformation. When the transformation ends, either by being reduced to 0 hit points/soul or by deactivating the Gu, Your attributes return to their state before the transformation, including current hit points/soul. You may only ever be under the effect of one [Transformation] Gu or killer move at a time.
                    </p>
                    <p className="rule-text">
                        If your transformation is reduced to 0 hit points, all Gu involved deactivate and any remaining damage from the attack is dealt to your hit points. If the transformation was permanent and is reduced to 0 hit points, you remain in the transformation and roll to see if you enter Final Stand (see Ch. 4, Combat).
                    </p>
                </>
            )
        },
        {
            name: "Undodgeable",
            desc: <p className="rule-text">[Undodgeable] attacks cannot be avoided by moving, such as with the Dodge Reaction. A creature can still take the Dodge Reaction against an [Undodgeable] attack, but it will only move them and not avoid the attack.</p>
        },
        {
            name: "Unrefinable",
            desc: <p className="rule-text">[Unrefinable] Gu exclusively appear naturally in the world. It is impossible to create a recipe for Gu with this keyword.</p>
        },
        {
            name: "Vital",
            desc: <p className="rule-text">A Gu Master can only have 1 [Vital] Gu at a time. If a Gu with the [Vital] keyword dies, the owner of the Gu dies as well. When taking damage from refinement backlash, a [Vital] Gu cannot be brought below 1 hit point. The [Vital] keyword is applied automatically to the first Gu a Gu Master refines, but you can spend a day in closed cultivation with a new Gu to transfer the [Vital] keyword to the new Gu, removing it from your old Vital Gu. When you change your Vital Gu, your current hit points are reduced to 1 as you suffer backlash.</p>
        }
    ];

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const processedKeywords = useMemo(() => {
        let sortedData = [...keywordsData];
        if (sortConfig.key) {
            sortedData.sort((a, b) => {
                const valA = String(a[sortConfig.key]).toLowerCase();
                const valB = String(b[sortConfig.key]).toLowerCase();

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
                    <div className="gu-title">Gu Keywords</div>
                    <div className="gu-subtitle">Master of Gu SRD</div>
                </div>
                <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                    ← Back to Directory
                </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>
                <h1 className="rule-heading">Gu Keywords</h1>
                <p className="rule-text" style={{ marginBottom: '25px' }}>
                    Click a keyword row to expand and view its full description and parameters. Click column headers to sort.
                </p>

                <div className="gu-table-wrap">
                    <table className="gu-table">
                        <thead>
                            <tr>
                                <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => requestSort('name')}>
                                    Keyword Name {renderSortArrow('name')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {processedKeywords.map((keyword) => (
                                <React.Fragment key={keyword.name}>
                                    <tr 
                                        className="gu-row" 
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setExpandedName(expandedName === keyword.name ? null : keyword.name)}
                                    >
                                        <td style={{ fontWeight: 'bold', color: expandedName === keyword.name ? '#c19b41' : 'inherit' }}>
                                            {keyword.name} {expandedName === keyword.name ? '▼' : '►'}
                                        </td>
                                    </tr>
                                    {expandedName === keyword.name && (
                                        <tr className="gu-expanded-row">
                                            <td>
                                                <div className="gu-expanded-inner" style={{ padding: '15px 20px', background: '#1e1e1e' }}>
                                                    {/* Directly render the JSX fragment for full rich text support */}
                                                    {keyword.desc}
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

export default GuKeywords;