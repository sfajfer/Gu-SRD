import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const CharacterCreation = () => {
    return (
        <div className="gu-shell">
            <header className="gu-topbar">
                <div>
                    <div className="gu-title">Character Creation</div>
                    <div className="gu-subtitle">Master of Gu SRD</div>
                </div>
                <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                    ← Back to Directory
                </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>
                <h1 className="rule-heading">Character Creation</h1>
                <p className="rule-text">
                    In this game, you will create and play a Gu Master. Gu Masters are humans or variant-humans who have awakened their aperture, a kind of extradimensional space within the stomach that can contain Gu and primeval essence. The first thing to mark down is your starting rank. For first-time players, it is recommended to start at rank 1 initial stage. You, your group, and the game master should also determine if you want to follow the righteous path, living and working with a clan, or if you’d like to tread the demonic path, living free in the world with no masters. Your path can always be changed later on, as demonic Gu Masters seek safety and resources, and righteous Gu Masters grow disillusioned and yearn for freedom.
                </p>

                <p className="rule-text">
                    Once you know what each primary <Link className="rule-link" to="/rules/attributes">Attribute</Link> does, pick one as your <strong>Tagged Attribute</strong>. Whenever you spend experience to increase the tagged primary attribute, you gain twice as many points as you normally would.
                </p>

                <p className="rule-subheading">Experience</p>
                <p className="rule-text">
                    You start with 500 experience to spend on character creation. Any experience left over afterwards is removed from the game, so that you start your first session with 0 experience. Experience can be spent to increase your <Link className="rule-link" to="/rules/attributes">Attributes</Link> and <Link className="rule-link" to="/rules/skills">Skills</Link>, as well as to purchase <Link className="rule-link" to="/rules/talents">Talents</Link>. Talents cannot be purchased and <Link className="rule-link" to="/rules/attainment">Attainments</Link> cannot be invested in until after character creation. At character creation, attributes cannot be raised above 50.
                </p>
                <ul className="rule-text">
                    <li>1 point in any attribute costs 10 experience to increase up to 50, and 15 experience thereafter.</li>
                    <li>1 point in any skill (except Knowledge) costs 2 experience to increase.</li>
                    <li>5 points in your Strength attribute or any single Knowledge skill costs 6 experience.</li>
                </ul>

                <p className="rule-subheading">Attainment</p>
                <p className="rule-text">
                    Attainment is your understanding of the different Gu paths. That includes your knowledge of refining, using, and identifying Gu of the same path. You can find the different Attainments in the Talents section (Chapter 2. Progression), and your character begins the game with 50 free experience invested in a single path.
                </p>

                <p className="rule-subheading">Starting Items</p>
                <p className="rule-text">
                    All characters start with a Gu Master robe, a Vital Gu of rank 1, and 25 primeval stones. At the GM’s discretion (for price and availability) you may trade your starting primeval stones for additional rank 1 Gu.
                </p>

                <p className="rule-subheading">Lifespan</p>
                <p className="rule-text">
                    If your character reaches age 100 without increasing their lifespan, they die.
                </p>
            </main>
        </div>
    );
};

export default CharacterCreation;