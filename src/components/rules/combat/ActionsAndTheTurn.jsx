import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const ActionsAndTheTurn = () => {
    return (
        <div className="gu-shell">
            <header className="gu-topbar">
                <div>
                    <div className="gu-title">Actions and the Turn</div>
                    <div className="gu-subtitle">Master of Gu SRD</div>
                </div>
                <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                    ← Back to Directory
                </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>
                <h1 className="rule-heading">Actions and the Turn</h1>

                <p className="rule-subheading">Actions and the Initiative</p>
                <p className="rule-text">
                    At the beginning of combat, an initiative is rolled. If an enemy is within 2 meters of you, roll Close Combat. If not, roll Ranged Attack. The player with the most degrees of success goes first. In the case of ties, the lower number on the die goes first. If this is still tied, creatures controlled by a player go before non player characters. If the tied creatures are all player characters, they decide amongst themselves who goes first; if all are NPCs, the GM chooses. Continue this process for the rest of the combatants.
                </p>

                <p className="rule-subheading">Surprise</p>
                <p className="rule-text">
                    Surprised creatures have a +20 penalty to their initiative roll and cannot take Reactions until the start of their first turn.
                </p>

                <p className="rule-subheading">Stealth</p>
                <p className="rule-text">
                    There is no stealth skill in the game. Many Gu render your personal sneaking skills worthless, and so most Gu Masters that wish to walk unobserved will use concealment Gu to do so. In the case either party is not using these Gu, the creature you are trying not to be detected by makes an Awareness skill test with a penalty or bonus determined by the GM for the circumstance, including the stealthing party’s measures to hide themselves. If the stealthing party is invisible, creatures cannot make Awareness skill tests to perceive them unless they take an action that makes noise.
                </p>

                <p className="rule-subheading">The Turn</p>
                <p className="rule-text">
                    One turn lasts 10 seconds.
                </p>

                <p className="rule-subheading">Start and End of Turn Effects</p>
                <p className="rule-text">
                    If you have multiple start or end of turn effects, you choose in what order they resolve. If an effect is applied to a creature for a specified duration, say 3 turns, the number of turns remaining ticks down at the end of the creature’s turns, with the effect ending if it hits 0.
                </p>

                <p className="rule-subheading">Action Economy</p>
                <p className="rule-text">
                    Gu Masters can take a Combat Action, two Reactions, a Bonus Action, and a movement on each of their turns. Bonus Actions generally fast and low-effort, such as giving an ally a Gu from your aperture, opening an unlocked door, or pulling a lever.
                </p>
            </main>
        </div>
    );
};

export default ActionsAndTheTurn;