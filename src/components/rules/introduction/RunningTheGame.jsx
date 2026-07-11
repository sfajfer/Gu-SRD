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

                <p className="rule-subheading">Quirks</p>
                <p className="rule-text">
                    This system has some mechanics that don't work like most ttrpgs. Stealth does not exist as a skill, for example; whoever is trying to sneak will specify what they are doing to stay undetected, and then whoever is able to perceive them makes an Awareness skill test with a bonus or penalty depending on the circumstances. See <Link className="rule-link" to="/rules/actions-and-the-initiative-the-turn">Actions and the Initiative</Link> for more details.
                </p>
                <p className="rule-text">
                    Another unique aspect are the Attitude (basically charisma) based skills; player characters are the only things that can make Attitude based skill tests such as Persuasion and Deception; when NPCs are trying to persuade, deceive, intimidate, or haggle with a player character, it is entirely up to the player what their reaction is, so long as they aren't being influenced by a Gu effect. When NPCs try to do the same to other NPCs, it's up to the GM whether or not the target is swayed.
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
                    Combat encounters can be judged by the <i>Battle Strength</i> of all creatures in the encounter. The lowest <i>Battle Strength</i> a creature can have is 1, representing a common Chaff beast like an insect or bird. For the <i>Battle Strength</i> of beasts, see Chapter 5: Southern Border. The base <i>Battle Strength</i> for a Gu Master is &#123;10, 100, 500, 5,000, 50,000&#125;.
                </p>
                <p className="rule-text">
                    The base <i>Battle Strength</i> assumes the Gu Master has some Gu already of the previous rank, except of course for rank 1 Gu Masters. This base value is increased by 10% for every 100 maximum portions of primeval essence in their aperture. <i>Battle Strength</i> is then increased by however many Gu the Gu Master has of the same rank as themselves, with each Gu adding &#123;50, 100, 250, 1,000, 20,000&#125; to the total <i>Battle Strength</i>.
                </p>
                <p className="rule-text">    
                    This number is not a perfect representation since Gu Masters might have higher statistics or advanced killer moves, but it gives a good idea of how strong a threat is compared to the players. If the <i>Battle Strength</i> of the threat is more than double the combined <i>Battle Strength</i> of the party, the encounter is considered deadly. If it is less than half, it is considered trivial.
                </p>
                <p className="rule-text">
                    Challenge Rating then jumps to 11. The first digit represents the rank of the threat, and the 2nd digit represents the estimated strength of the threat from 1-4. 
                </p>
                <p className="rule-text" style={{ paddingLeft: '20px', borderLeft: '2px solid #444', textIndent: '0' }}>
                    • <strong>1</strong> represents initial stage<br />
                    • <strong>2</strong> middle stage<br />
                    • <strong>3</strong> upper stage<br />
                    • <strong>4</strong> peak stage<br />
                </p>
                <p className="rule-text">
                    When designing encounters, it's easy enough to compare power levels by checking the Challenge Ratings of the party and comparing it to the Challenge Ratings of the enemies. If a threat is a rank above any party member's, it poses a deadly challenge. If a threat is 2 ranks above the party, it should be nearly impossible for them to face it without outside assistance or extensive preparation. CR caps at 54; it is advised to use immortal threats and Gu Immortals sparingly and with the proper deference. They are godlike existences compared to even the strongest rank 5 Gu Masters.
                </p>
            </main>
        </div>
    );
};

export default RunningTheGame;