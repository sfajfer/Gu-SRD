import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles.css';

const Gear = () => {
    const armorData = [
        { armor: "Leather", dt: "4", hp: "20", dodge: "+10", movement: "–" },
        { armor: "Iron", dt: "8", hp: "32", dodge: "+30", movement: "1" },
        { armor: "Shield", dt: "4", hp: "15", dodge: "+10", movement: "–" }
    ];

    const weaponData = [
        { weapon: "Dagger", damage: "6 rending", range: "1 meter", hands: "1", thrown: "6 rending", crit: "4x" },
        { weapon: "Sword", damage: "8/12 rending", range: "1 meter", hands: "V", thrown: "–", crit: "3x" },
        { weapon: "Spear", damage: "12/16 force", range: "2/1 meter(s)", hands: "V", thrown: "10 force", crit: "2x" },
        { weapon: "Staff", damage: "6 force", range: "2 meters", hands: "2", thrown: "–", crit: "2x" },
        { weapon: "Bow", damage: "–", range: "–", hands: "2", thrown: "–", crit: "4x" }
    ];

    const bowDrawData = [
        { draw: "20 kg", minStr: "10", damage: "5 force", range: "12 m" },
        { draw: "40 kg", minStr: "100", damage: "10 force", range: "24 m" },
        { draw: "60 kg", minStr: "200", damage: "15 force", range: "36 m" },
        { draw: "80 kg", minStr: "300", damage: "20 force", range: "48 m" },
        { draw: "cont.", minStr: "cont.", damage: "cont.", range: "cont." }
    ];

    return (
        <div className="gu-shell">
            <header className="gu-topbar">
                <div>
                    <div className="gu-title">Gear</div>
                    <div className="gu-subtitle">Master of Gu SRD</div>
                </div>
                <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                    ← Back to Directory
                </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>
                <h1 className="rule-heading">Gear</h1>

                <p className="rule-subheading">Armor</p>
                <p className="rule-text">
                    Armor is seldom seen in the Gu world, except when used by mortals. Armor is heavy and lacks the defensive strength of even some Rank 1 Gu, and thus has little demand. Still, some Gu Masters will use the effects of Gu to augment their armor for better protection.
                </p>
                <p className="rule-text">
                    When wearing armor, you gain a penalty to your Dodge rolls, but can soak up a bit more damage. Armor has a damage threshold and health statistic. Any force or rending damage dealt to you is reduced by the armor’s damage threshold. Any force or rending damage dealt in excess of the damage threshold is dealt both to your hit points and to the armor’s hit points. If the armor reaches 0 hit points, it breaks and becomes unusable. Shields must be wielded in at least one hand.
                </p>

                {/* Armor Table from image_04b7b2.png */}
                <div className="gu-table-wrap" style={{ marginBottom: '20px' }}>
                    <table className="gu-table">
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: '#e67e22', color: 'black', textAlign: 'center', width: '25%' }}>Armor</th>
                                <th style={{ backgroundColor: '#2980b9', color: 'white', textAlign: 'center' }}>DT</th>
                                <th style={{ backgroundColor: '#2980b9', color: 'white', textAlign: 'center' }}>HP</th>
                                <th style={{ backgroundColor: '#2980b9', color: 'white', textAlign: 'center' }}>Dodge Penalty</th>
                                <th style={{ backgroundColor: '#2980b9', color: 'white', textAlign: 'center' }}>Movement Penalty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {armorData.map((row, idx) => (
                                <tr key={idx} className="gu-row">
                                    <td style={{ textAlign: 'center', fontWeight: '500' }}>{row.armor}</td>
                                    <td style={{ textAlign: 'center' }}>{row.dt}</td>
                                    <td style={{ textAlign: 'center' }}>{row.hp}</td>
                                    <td style={{ textAlign: 'center' }}>{row.dodge}</td>
                                    <td style={{ textAlign: 'center' }}>{row.movement}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="rule-subheading">Weapons</p>
                <p className="rule-text">
                    Most weapons used by Gu Masters are manifested by Gu, but many Gu can improve the effects of common weapons. If a weapon has a V under its “hands” attribute, it can be wielded in one or two hands, taking the former or latter damage number depending on how many you are wielding it with. You may change how many hands you are wielding a weapon with at any time during anyone's turn for free. Some weapons do increased critical damage, as indicated by the Critical Multiplier column.
                </p>

                {/* Weapons Table from image_04b7e7.png */}
                <div className="gu-table-wrap" style={{ marginBottom: '20px' }}>
                    <table className="gu-table">
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: '#e67e22', color: 'black', textAlign: 'center', width: '20%' }}>Weapon</th>
                                <th style={{ backgroundColor: '#2980b9', color: 'white', textAlign: 'center' }}>Damage</th>
                                <th style={{ backgroundColor: '#2980b9', color: 'white', textAlign: 'center' }}>Range</th>
                                <th style={{ backgroundColor: '#2980b9', color: 'white', textAlign: 'center' }}>Hands</th>
                                <th style={{ backgroundColor: '#2980b9', color: 'white', textAlign: 'center' }}>Thrown Damage</th>
                                <th style={{ backgroundColor: '#2980b9', color: 'white', textAlign: 'center' }}>Critical Multiplier</th>
                            </tr>
                        </thead>
                        <tbody>
                            {weaponData.map((row, idx) => (
                                <tr key={idx} className="gu-row">
                                    <td style={{ textAlign: 'center', fontWeight: '500' }}>{row.weapon}</td>
                                    <td style={{ textAlign: 'center' }}>{row.damage}</td>
                                    <td style={{ textAlign: 'center' }}>{row.range}</td>
                                    <td style={{ textAlign: 'center' }}>{row.hands}</td>
                                    <td style={{ textAlign: 'center' }}>{row.thrown}</td>
                                    <td style={{ textAlign: 'center' }}>{row.crit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="rule-subheading">Thrown Weapons</p>
                <p className="rule-text">
                    Thrown weapons have a range of 5 meters, +1 meter for every 20 points you have in Strength, and deal 1 additional force damage for every 20 points you have in Strength. If the weapon does not have a Thrown Damage or is improvised, it deals 2 force or rending damage, depending on the sharpness of the weapon, and deal 1 additional force damage for every 20 points you have in Strength. Throwing attacks have disadvantage on targets further than 30 meters from you.
                </p>

                <strong className="rule-bold" style={{ textAlign: 'left' }}>Improvised Weapons</strong>
                <p className="rule-text">
                    Items that are not intended to be used as weapons deal 4 force or rending damage, depending on the sharpness of the item, and deal 1 additional force damage for every 20 points you have in Strength.
                </p>

                <p className="rule-subheading">Special Rules</p>
                <p className="rule-text">
                    A creature must be wielding a weapon with the proper number of hands to benefit from any special rules.
                </p>

                <strong className="rule-bold" style={{ textAlign: 'left' }}>Bows</strong>
                <p className="rule-text">
                    You must have arrows to make ranged weapon attacks with a bow. Arrows cost 1 primeval stone for a quiver of 30 arrows. Stronger characters can have bows specially made using durable refinement materials to increase their draw weight, making the weapon deal more damage and have longer range. You do not add your Strength Attribute to damage dealt with a bow.
                </p>

                {/* Bow Draw Weights Table from image_04b82d.png */}
                <div className="gu-table-wrap" style={{ marginBottom: '20px' }}>
                    <table className="gu-table">
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: '#e67e22', color: 'black', textAlign: 'center', width: '25%' }}>Draw Weight</th>
                                <th style={{ backgroundColor: '#2980b9', color: 'white', textAlign: 'center' }}>Minimum Strength</th>
                                <th style={{ backgroundColor: '#2980b9', color: 'white', textAlign: 'center' }}>Damage</th>
                                <th style={{ backgroundColor: '#2980b9', color: 'white', textAlign: 'center' }}>Range</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bowDrawData.map((row, idx) => (
                                <tr key={idx} className="gu-row">
                                    <td style={{ textAlign: 'center', fontWeight: '500' }}>{row.draw}</td>
                                    <td style={{ textAlign: 'center' }}>{row.minStr}</td>
                                    <td style={{ textAlign: 'center' }}>{row.damage}</td>
                                    <td style={{ textAlign: 'center' }}>{row.range}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <strong className="rule-bold" style={{ textAlign: 'left' }}>Daggers</strong>
                <p className="rule-text">
                    Daggers have a +40 penalty to attack rolls made to hit a creature wielding a sword, spear, or staff. Attacks made with a dagger against unaware or immobile creatures are automatically critical hits.
                    <br /><br />
                    When a creature takes damage to their hit points from a dagger, they gain bleeding 1.
                </p>

                <strong className="rule-bold" style={{ textAlign: 'left' }}>Spears</strong>
                <p className="rule-text">
                    When a creature takes damage to their hit points from a spear, they gain bleeding 1.
                </p>

                <strong className="rule-bold" style={{ textAlign: 'left' }}>Staves</strong>
                <p className="rule-text">
                    You gain the Block Reaction.
                </p>
                <p className="rule-text" style={{ paddingLeft: '20px' }}>
                    • <strong>Block:</strong> The Block Reaction can only be taken when its determined a melee attack has hit you and before the damage has been rolled. Make a Close Combat skill test opposing the opponent’s attack roll. If you win, you take no damage from the attack; if you win by 3 or more degrees of success or via a critical, you regain the Reaction expended to Block.
                </p>

                <strong className="rule-bold" style={{ textAlign: 'left' }}>Swords</strong>
                <p className="rule-text">
                    Swords have a +20 penalty to attack rolls made to hit a creature wielding a spear.
                    <br /><br />
                    You gain a -20 bonus to skill tests made to parry an attack. When a creature takes damage to their hit points from a sword, they gain bleeding 3.
                </p>
            </main>
        </div>
    );
};

export default Gear;