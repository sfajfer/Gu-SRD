import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const RunningTheGame = () => {
    return (
        <div className="gu-shell">
            <header className="gu-topbar">
                <div>
                    <div className="gu-title">Running the Game</div>
                    <div className="gu-subtitle">Master of Gu SRD</div>
                </div>
                <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                    ← Back to Directory
                </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>
                <h1 className="rule-heading">Running the Game</h1>

                <p className="rule-subheading">Materials</p>
                <p className="rule-text">
                    To run the game, you will need a full set of dice including a d4, d6, d8, d10, td10, d12, and d20. Additionally, each player will need a character sheet and something to write with. This game is intended to be played with miniatures on a grid.
                </p>

                <p className="rule-subheading">The Game Master</p>
                <p className="rule-text">
                    Your role as GM is difficult, but ultimately rewarding. Your most important job is making sure everyone at the table is having fun, but that includes yourself. Come to an agreement with your players before running the game to see what you and them want to get out of the game. 
                </p>
                <p className="rule-text">
                    Also, remember that it is not you against the players. You’re playing the antagonists and will certainly try to kill them. But you’re also creating a challenge for the players to surmount, and you have the right to be excited when they do.
                </p>

                <p className="rule-subheading">Storyteller</p>
                <p className="rule-text">
                    You are the story. If your players are staying in the clan’s walls and quietly cultivating, it’s your fault if they grow bored and don’t know what to do. Maybe an overbearing elder puts his hand on the scale, improving one player’s cultivation and suppressing another’s. A beast tide could put their cultivation on hold as they struggle to defend the clan and gain battle merits. And it’s worth knowing where each event fits into your larger campaign. The Gu World is massive and dangerous, so what are the villains doing in the meantime?
                </p>

                <p className="rule-subheading">Rulemaker</p>
                <p className="rule-text">
                    There are lots of edge cases where a rule just doesn’t work. When that happens, you make a ruling on how it should work. Listen to your player’s input if they don’t agree, but you have the final say as GM.
                </p>

                <p className="rule-subheading">Awarding Experience</p>
                <p className="rule-text">
                    There are two avenues of progression in this game: Experience and <Link className="rule-link" to="/rules/cultivation">Cultivation</Link>. Experience is used to purchase talents as well as increase attributes and skills, while cultivation improves a player’s raw power by increasing their pool of <Link className="rule-link" to="/rules/primeval-essence">Primeval Essence</Link> and allowing the use of higher rank Gu. 
                </p>
                <p className="rule-text">
                    Experience is awarded for overcoming challenges such as by fighting beasts and other Gu Masters, but can also by awarded for engaging in intrigue. The amount of experience awarded should be reflective of the overall difficulty of the encounter, with an average of 8-12 experience per session.
                </p>

                <p className="rule-subheading">Encounter Difficulty</p>
                <p className="rule-text">
                    Combat encounters can be judged by the Challenge Rating (CR) of all creatures in the encounter. The lowest CR a creature can have is 0, representing mortal threats like common wolves and humans without any Gu. 
                </p>
                <p className="rule-text">
                    CR then jumps to 11. The first digit represents the rank of the threat, and the 2nd digit represents the estimated strength of the threat from 1-5. 
                </p>
                <p className="rule-text" style={{ paddingLeft: '20px', borderLeft: '2px solid #444', textIndent: '0' }}>
                    • <strong>1</strong> represents initial stage<br />
                    • <strong>2</strong> middle stage<br />
                    • <strong>3</strong> upper stage<br />
                    • <strong>4</strong> peak stage<br />
                    • <strong>5</strong> means the threat is especially strong for its rank and may even be able to challenge weaker threats in the rank above it.
                </p>
                <p className="rule-text">
                    CR caps at 54, for no mortal Gu Master could ever pose a threat to a Gu Immortal.
                </p>
            </main>
        </div>
    );
};

export default RunningTheGame;