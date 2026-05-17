import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const Damage = () => {
    const forceInjuryData = [
        { d4: "1 - Broken Arm", effect: "Unusable limb" },
        { d4: "2 - Broken Leg", effect: "-4 movement. If both legs are broken, your movement is reduced to 0." },
        { d4: "3 - Internal Bleeding", effect: "Bleeding 1" },
        { d4: "4 - Concussion", effect: "Dazed. Cognition reduced by 15 for 3 days." }
    ];
    const sizeModifierData = [
        { size: "Tiny", mod: "+40" },
        { size: "Small", mod: "+20" },
        { size: "Medium", mod: "0" },
        { size: "Large", mod: "-20" },
        { size: "Huge", mod: "-40" }
    ];

    const headInjuryData = [
        { d4: "1 - Brain Damage", effect: "Maximum Soul permanently reduced by 5" },
        { d4: "2 - Blinded", effect: "Blinded until the end of their next turn" },
        { d4: "3 - Hemorrhage", effect: "Bleeding 5" },
        { d4: "4 - Concussion", effect: "Dazed. Cognition reduced by 15 for 3 days." }
    ];
    return (
        <div className="gu-shell">
            <header className="gu-topbar">
                <div>
                    <div className="gu-title">Damage</div>
                    <div className="gu-subtitle">Master of Gu SRD</div>
                </div>
                <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                    ← Back to Directory
                </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>
                <h1 className="rule-heading">Damage</h1>
                <p className="rule-text">
                    When you take damage, subtract that amount from your current Hit Points, to a minimum of 0. When you hit 0 Hit Points, make a Perseverance attribute test. On a failure, you are Dying. On a success, you enter Final Stand.
                </p>

                <p className="rule-subheading">Damage Types</p>
                <p className="rule-text" style={{ paddingLeft: '20px' }}>
                    •    <strong>Force:</strong> Being struck with an object or force, such as Qi; piercing attacks are included but generally have the [Piercing] keyword<br />
                    •    <strong>Rending:</strong> Being cut or slashed.<br />
                    •    <strong>Cold:</strong> Low temperature attacks<br />
                    •    <strong>Heat:</strong> Fire and heat<br />
                    •    <strong>Poison:</strong> Damage taken as long as you are poisoned by a source; reduce all poison damage dealt to a creatures hit points by 10% of their Fortitude, rounding down.<br />
                    •    <strong>Shock:</strong> Electricity damage.<br />
                    •    <strong>Sonic:</strong> Sound-based attacks that bypass many shield Gu but are quite rare and typically weak<br />
                    •    <strong>Direct:</strong> Direct damage can be of any damage type and, as the name suggests, deals that damage directly to a creature’s hit points. If a source says it deals damage directly to a creature’s hit points, the damage cannot be assigned to any active [Shield] Gu, but some effects may still reduce it. Damage from bleeding is always direct.
                </p>
                <p className="rule-text">
                    If a source says you take damage to your soul, that number is subtracted from your current soul value; you take no damage to your hit points.
                </p>

                <p className="rule-subheading">Damage Reduction</p>
                <p className="rule-text">
                    Many defensive Gu reduce the amount of damage taken from attacks. When damage is reduced by a flat number, the damage can be reduced to 0 unless the source of the damage is of greater rank than the source of the damage reduction. If the source of the damage is of greater rank than the source of the damage reduction, the damage can be reduced to a minimum of 1. Damage reduction is applied before vulnerability and resistance.
                </p>
                <p className="rule-text">
                    If damage says it is unmitigatable, damage reduction does not apply to it. Damage is typically only unmitigatable if it is part of the cost of activating a Gu.
                </p>

                <p className="rule-subheading">Vulnerability, Resistance, and Invulnerability</p>
                <p className="rule-text" style={{ paddingLeft: '20px', textIndent: 0 }}>
                    (+2) Invulnerability: If you have invulnerability to a damage type, you cannot take damage of that type to your hit points.<br />
                    (+1) Resistance: If you have resistance to a damage type, halve all damage you take from that type to your hit points (rounded down).<br />
                    (0) Normal: You take the normal amount of damage to your hit points from this damage type.<br />
                    (-1) Vulnerability: If you have vulnerability to a damage type, double all damage you take from that type to your hit points.
                    
                </p>

                <strong className="rule-bold" style={{ textAlign: 'left' }}>Rank Superiority</strong>
                <p className="rule-text">
                    Higher-ranked Gu and killer moves always overpower lower-ranked ones. If you have vulnerability to a damage type from a rank 2 Gu and resistance or invulnerability to the same damage type from a rank 3 Gu, the higher-ranked effect completely overrides the vulnerability; the same is true the other way around, with a higher ranked source of invulnerability or resistance against a lower ranked source of vulnerability.
                </p>
                <p className="rule-text">
                    If you take damage from a Gu or killer move that outranks the source of resistance or invulnerability, your defense drops by one tier (Invulnerability drops to resistance; resistance drops to normal damage) for each rank of difference, to a minimum of 0 (normal damage).
                </p>

                <strong className="rule-bold" style={{ textAlign: 'left' }}>Stacking Effects</strong>
                <p className="rule-text">
                    When multiple resistance effects of the same rank are applied to a creature, sum the values of all of the effects, with a minimum of -1 and a maximum of 2, to determine how vulnerable you are to the damage. For example, if you have vulnerability from 2 separate rank 2 Gu and invulnerability from another rank 2 Gu, 2 - 1 - 1 = 0, so you take normal damage from that damage type.
                </p>

                <p className="rule-subheading">Immunity</p>
                <p className="rule-text">
                    If you are immune to a condition, it cannot be applied to you regardless of the rank of the source. If you gain immunity to a condition while they have it, the condition is removed.
                </p>

                <p className="rule-subheading">Instant Death</p>
                <p className="rule-text">
                    If you take an amount of damage equal to double your maximum hit points from a single source, you instantly die, and do not get to roll to see if you enter Final Stand.
                </p>

                <p className="rule-subheading">Final Stand</p>
                <p className="rule-text">
                    While you have the Final Stand condition, you cannot move or take Combat Actions or Reactions other than to activate Gu, detonate Gu, or hold your action to do so. If you take any amount of damage to your hit points while in Final Stand, you enter the Dying state and fall unconscious. If you gain any hit points while in Final Stand, you are no longer in Final Stand and can act as normal.
                </p>

                <p className="rule-subheading">Dying</p>
                <p className="rule-text">
                    If you are Dying, you are unconscious. At the end of each of your turns, roll a Perseverance attribute test. On a success, you gain a Perseverance Token. On a failure, you gain a Predicament Token. Critical successes and fumbles grant 2 of the respective token. When you have 3 Perseverance Tokens, you are no longer Dying and instead enter Final Stand, and your Perseverance token count resets to 0. If you ever have 5 Predicament Tokens, you die. Predicament Tokens are permanent unless removed by a Gu.
                </p>

                <p className="rule-subheading">Non-Lethal Damage</p>
                <p className="rule-text">
                    You may declare any melee attack to be non-lethal at any point up until the damage of the attack is dealt. If the damage reduces the target to 0 hit points, they roll to enter Final Stand like usual, becoming unconscious instead of Dying on a failure. If you deal damage to a creature in Final Stand with a non-lethal attack, they automatically fall unconscious.
                </p>

                <p className="rule-subheading">Called Shot</p>
                <p className="rule-text">
                    When you make an attack roll against a creature, you can choose to pick a particular body part, worn or carried item, or manifested body parts like wings as the target of your attack. A called attack roll is made with a penalty based on the size of the target; for an average person, their hands would be tiny, arms and the head are small, and the torso is medium.
                </p>

                <p className="rule-subheading">Fall Damage</p>
                <p className="rule-text">
                    When falling from a height of more than 2 meters, you take 3 force damage for every meter you fell.
                </p>

                <p className="rule-subheading">Injury</p>
                <p className="rule-text">
                    When a creature takes damage to their hit points greater than or equal to half their maximum (rounded down), some damage types apply a special effect.
                </p>
                <p className="rule-text" style={{ paddingLeft: '20px' }}>
                    •    Force:<br /><br />
                    <div className="gu-table-wrap">
                        <table className="gu-table">
                            <thead>
                                <tr>
                                    <th style={{ backgroundColor: '#e67e22', color: 'black', textAlign: 'center', width: '30%' }}>d4</th>
                                    <th style={{ backgroundColor: '#2980b9', color: 'white', textAlign: 'left', paddingLeft: '15px' }}>Effect</th>
                                </tr>
                            </thead>
                            <tbody>
                                {forceInjuryData.map((row, idx) => (
                                    <tr key={idx} className="gu-row">
                                        <td style={{ textAlign: 'center', fontWeight: '500' }}>{row.d4}</td>
                                        <td style={{ textAlign: 'left', paddingLeft: '15px' }}>
                                            {idx === 2 ? (
                                                <em>{row.effect}</em>
                                            ) : idx === 3 ? (
                                                <><em>Dazed.</em> Cognition reduced by 15 for 3 days.</>
                                            ) : (
                                                row.effect
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    •    Rending: Bleeding 1<br />
                    •    Cold: Fatigued<br />
                    •    Heat: Burning<br />
                    •    Shock: Dazed
                </p>

                <p className="rule-subheading">Called Shot Injuries</p>
                <div className="gu-table-wrap">
                    <table className="gu-table">
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: '#e67e22', color: 'black', textAlign: 'center' }}>Size</th>
                                <th style={{ backgroundColor: '#2980b9', color: 'white', textAlign: 'center' }}>Modifier to Hit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sizeModifierData.map((row, idx) => (
                                <tr key={idx} className="gu-row">
                                    <td style={{ textAlign: 'center' }}>{row.size}</td>
                                    <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{row.mod}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="rule-text">
                    When you make a called shot and successfully hit a specific body part, if at least 10 force or rending damage is dealt to the creature’s hit points they take a corresponding injury.
                </p>
                <p className="rule-text" style={{ paddingLeft: '20px' }}>
                    •    Hand: Broken Hand; disarmed and unusable<br />
                    •    Arm: Crippled Limb; Unusable<br />
                    •    Torso: Internal Bleeding; Bleeding 3.<br />
                    •    Leg: Crippled; -4 movement. If both legs are crippled, your movement is reduced to 0.<br />
                    •    Head: Roll 1d4
                </p>
                <div className="gu-table-wrap">
                    <table className="gu-table">
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: '#e67e22', color: 'black', textAlign: 'center', width: '30%' }}>d4</th>
                                <th style={{ backgroundColor: '#2980b9', color: 'white', textAlign: 'left', paddingLeft: '15px' }}>Effect</th>
                            </tr>
                        </thead>
                        <tbody>
                            {headInjuryData.map((row, idx) => (
                                <tr key={idx} className="gu-row">
                                    <td style={{ textAlign: 'center', fontWeight: '500' }}>{row.d4}</td>
                                    <td style={{ textAlign: 'left', paddingLeft: '15px' }}>
                                        {idx === 0 ? (
                                            row.effect
                                        ) : idx === 1 ? (
                                            <><em>Blinded</em> until the end of their next turn</>
                                        ) : idx === 2 ? (
                                            <em>{row.effect}</em>
                                        ) : (
                                            <><em>Dazed.</em> Cognition reduced by 15 for 3 days.</>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="rule-subheading">Sleeping</p>
                <p className="rule-text">
                    When you sleep, you regain 1 hit point and 10% of your maximum soul for every hour spent sleeping (rounded down, but sleeping for 10 hours always restores your soul to its maximum). If you go longer than 16 hours without sleep, you gain the fatigued condition. Unless curing sleep-deprivation is explicitly stated to be an effect of a Gu, this condition cannot be removed by any means other than sleeping for at least 8 hours.
                </p>
                <p className="rule-text">
                    Every 4 hours you have this condition, you must make a Perseverance attribute test with a cumulative +10 penalty for every time you've succeeded the test since the last time you slept. On a failure, you fall asleep on the spot.
                </p>
            </main>
        </div>
    );
};

export default Damage;