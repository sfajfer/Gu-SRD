import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const TheDiceMechanic = () => {
    const difficultyData = [
        { mod: "+120", label: "Impossible", example: "Traveling against the Reverse Flow River" },
        { mod: "+100", label: "Unheard of", example: "Refining an Immortal Gu" },
        { mod: "+80", label: "Impossible without the use of Gu", example: "Trading a Gu for a higher ranked one" },
        { mod: "+60", label: "Extreme Difficulty", example: "Identifying a very rare Gu" },
        { mod: "+40", label: "High Difficulty", example: "Convincing a Wisdom Path master to change their plans" },
        { mod: "+20", label: "Difficult", example: "Cultivating with minor distractions" },
        { mod: "0", label: "Challenging", example: "Identifying an uncommon Gu" },
        { mod: "-20", label: "Slightly Challenging", example: "Refining a common Gu" },
        { mod: "-40", label: "Simple", example: "Identifying poisonous plants around your clan's walls" },
        { mod: "-60", label: "Trivial", example: "Haggling a merchant to take a few primeval stones off a large price" },
    ];

    return (
        <div className="gu-shell">
            <header className="gu-topbar">
                <div>
                    <div className="gu-title">The Dice Mechanic</div>
                    <div className="gu-subtitle">Master of Gu SRD</div>
                </div>
                <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                    ← Back to Directory
                </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>
                <h1 className="rule-heading">The Dice Mechanic</h1>
                
                <p className="rule-subheading">Skill Tests</p>
                <p className="rule-text">
                    Skill tests (and attribute tests, which are much less common) are rolled when a character would like to do an action or is forced to do an action that:<br />
                    • has a chance of failure<br />
                    • has a chance of success
                </p>
                <p className="rule-text">
                    The GM should be able to determine if an action is possible for your character to do, as well as if the action should be an automatic success.
                </p>

                <p className="rule-subheading">Dice</p>
                <p className="rule-text">
                    Dice are notated d{"[sides]"}; a d4 is a 4 sided die. The td10 is a 10 sided die where each value is a tens place (10, 20, 30, etc). If instead of the number of dice, the die is annotated with an R (Rd12), then the number of dice is equal to the rank of the Gu. This system uses d4, d6, d8, d10, td10, d12, and d20.
                </p>

                <strong className="rule-bold">The d100</strong>
                <p className="rule-text">
                    Tests are rolled on a d100; to roll a d100, roll a d10 and a td10. The td10 represents the tens place while the d10 represents the ones place. So if you roll an 80 and a 5, your roll is 85. Rolling a 10 on the d10 is just a zero, so rolling 90 and 10 would just be 90. Finally, rolling 00 on the td10 and a 10 on the d10 is 100.
                </p>
                <p className="rule-text">
                    When you take an action, the GM decides what skill that action is related to, determines penalties or bonuses, and then you roll a d100. If your result is equal to or lower than your skill, you succeeded, and can determine degrees of success if they effect the outcome of the action.
                </p>
                <p className="rule-text">
                    If the result is higher than your skill, you fail, and the GM determines the consequences.
                </p>

                <p className="rule-subheading">Penalties and Bonuses</p>
                <p className="rule-text">
                    Penalties and bonuses are a number added or subtracted from the number you roll on the die during a skill test. The GM can add either to represent the difficulty of the check, using the table below as a guideline. Penalties and bonuses do not have to be round multiples of 10, but they typically are.
                </p>

                <div className="gu-table-wrap" style={{ marginTop: '30px', marginBottom: '30px' }}>
                    <table className="gu-table">
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: '#e67e22', color: 'black', width: '20%', textAlign: 'center' }}>Penalty/Bonus</th>
                                <th style={{ backgroundColor: '#2980b9', color: 'white', textAlign: 'center' }}>Difficulty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {difficultyData.map((row, idx) => (
                                <tr key={idx} className="gu-row">
                                    <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{row.mod}</td>
                                    <td style={{ paddingLeft: '15px' }}>
                                        <strong>{row.label}</strong> 
                                        <span style={{ opacity: 0.8, fontStyle: 'italic', marginLeft: '8px' }}>
                                            ({row.example})
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="rule-subheading">Advantage and Disadvantage</p>
                <p className="rule-text">
                    If you have advantage on a test, roll an additional td10 and take the lower of the two. You can stack advantages as long as they come from different sources. Disadvantage works the same way, but you take the higher of the td10 rolls.
                </p>

                <p className="rule-subheading">Help</p>
                <p className="rule-text">
                    You can help another creature with a skill test as a Combat Action. You must be able to explain what action you are taking to help them on the skill test, and if the GM allows it they can give the helped creature up to a -30 bonus on their skill test, depending on the action taken.
                </p>

                <p className="rule-subheading">Degrees of Success/Failure</p>
                <p className="rule-text">
                    A success automatically has 1 degree of success, and a failure has 1 degree of failure. For every 10 you roll below/above your skill value, you gain an additional degree of success/failure, respectively. Some skill tests, such as an opposed Deception/Insight roll, do not take degrees of success into account; they’re either deceived or they aren’t. Many tests, however, will have different effects based on the degrees of success or failure.
                </p>

                <p className="rule-subheading">Critical</p>
                <p className="rule-text">
                    When you roll at or under 1/10 of your skill’s value (rounded down, minimum 1) on the die, you’ve landed a critical. Criticals are automatic successes, though degrees of success are still calculated like normal with a minimum of 1. Some skills have a critical success effect built into them, though the GM can always add a special additional success to any test you critically succeed.
                </p>
                <p className="rule-text">
                    If you score a critical with an attack roll, the attack deals double the damage it normally would.
                </p>

                <p className="rule-subheading">Fumble</p>
                <p className="rule-text">
                    Fumbles occur when 99-100 is rolled on the die for a skill test. If your skill value is above 99, you only fumble on a roll of 100 for that skill. Fumbles are an automatic failure, though degrees of failure are still calculated like normal with a minimum of 1.
                </p>

                <p className="rule-subheading">Opposed Tests</p>
                <p className="rule-text">
                    When competing with your skills against another creature, the two of you may be called to make an Opposed Test. You both roll a skill test, which can be for the same or different skills, and compare results. Critical successes beat any non-critical roll, and fumbles lose to any non-fumble roll. Then, the player with the most degrees of success or least degrees of failure wins. If they’re tied for degrees of success/failure, then the lower number on the die wins. If they’re still tied, the Opposed Test ends in a tie if possible. If the Opposed Test can’t be tied, then the involved parties make the test again until they do not tie.
                </p>

            </main>
        </div>
    );
};

export default TheDiceMechanic;