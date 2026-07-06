import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const CharacterCreation = () => {

    const sizeCreationData = [
        { rank: 'Tiny', mod: 'The size of an insect. Attack rolls against [Tiny] targets have a +40 penalty and [Tiny] creatures have their base Close Combat skill reduced by 20.'},
        { rank: 'Small', mod: 'The size of a child. Attack rolls against [Small] targets have a +20 penalty and [Small] creatures have their base Close Combat skill reduced by 10.' },
        { rank: 'Medium', mod: 'The size of a man. No modifiers.' },
        { rank: 'Large', mod: '[Large] things take up 4 squares when outside of an aperture. Attack rolls against [Large] targets have a -20 bonus and [Large] creatures have their base Close Combat skill increased by 20.' },
        { rank: 'Huge', mod: '[Huge] things take up 9 or more squares when outside of an aperture. Attack rolls against [Huge] targets have a -40 bonus and [Huge] creatures have their base Close Combat skill increased by 40.' }
    ];

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
                    Once you know what each primary <Link className="rule-link" to="/rules/attributes">Attribute</Link> does, pick one as your <strong>Tagged Attribute</strong>. Whenever you spend experience to increase the tagged primary attribute, you gain twice as many points as you normally would. Tagging your Fortitude Attribute grants you the *Tough* Talent for free.
                </p>

                <p className="rule-subheading">Experience</p>
                <p className="rule-text">
                    You start with 500 experience to spend on character creation. Any experience left over afterwards is removed from the game, so that you start your first session with 0 experience. Experience can be spent to increase your <Link className="rule-link" to="/rules/attributes">Attributes</Link> and <Link className="rule-link" to="/rules/skills">Skills</Link>, as well as to purchase <Link className="rule-link" to="/rules/talents">Talents</Link>. Talents cannot be purchased and <Link className="rule-link" to="/rules/attainment">Attainments</Link> cannot be invested in until after character creation.
                </p>
                <ul className="rule-text">
                    <li>1 point in any attribute costs 10 experience to increase up to 50, and 15 experience thereafter.</li>
                    <li>1 point in any skill (except Knowledge) costs 2 experience to increase.</li>
                    <li>5 points in your Strength attribute or any single Knowledge skill costs 6 experience.</li>
                </ul>

                <p className="rule-subheading">Size and Fortitude</p>
                <p className="rule-text">
                    All creatures, objects, and Gu have a size. Humans start with a size that determines their minimum and maximum Fortitude, though both the minimum and maximum can be breached with the use of Gu. At character creation, pick either [Small], [Medium], or [Large]. If you pick [Small], you begin with 10 Fortitude and cannot raise it above 20 without the use of Gu. If you pick [Medium], you begin with 20 Fortitude and cannot raise it above 40. If you pick [Large], you begin with 40 Fortitude and cannot raise it above 100.
                </p>

                <table className="gu-table">
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: '#e67e22', color: 'black', textAlign: 'center' }}>Size</th>
                            <th style={{ backgroundColor: '#2980b9', color: 'black', textAlign: 'center' }}>Bonus/Penalty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sizeCreationData.map((row, idx) => (
                            <tr key={idx} className="gu-row">
                                <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{row.rank}</td>
                                <td style={{ textAlign: 'left', padding: '10px' }}>{row.mod}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

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

                <p className="rule-subheading">Starting At Higher Ranks</p>
                <p className="rule-text">
                    If a character dies during the course of play, or if your group just wants to start at a higher rank, you can start at a higher rank and stage than rank 1 initial stage. At initial stage of any rank, you begin with a single Gu of the same rank as you and 4 Gu of the rank immediately below you. For every small realm above initial stage, you gain 1 additional Gu of the same rank as you.
                </p>
                <p className="rule-text">
                    In addition, you start with &#123;25, 250, 2,500, 25,000, 250,000&#125; primeval stones depending on rank and an additional 150 character-creation experience for every rank above 1. Finally, you gain 100 talent experience for every rank above 1 that you start at; this experience can only be spent on talents or invested in attainments and is removed when you finish creating your character just like the ordinary starting experience.
                </p>

                <p className="rule-subheading">Finding a Build</p>
                <p className="rule-text">
                    Since Gu have to be fed, it can be financially draining to have a large collection covering every possible situation. Until they have a steady source of income, most Gu Masters just try to cover attack, defense, healing, and movement with their Gu, and perhaps a few for utility. It is of course possible to rely on your teammates for one or more of those categories, but it's worth noting that support Gu that only affect yourself are usually more potent than those that target others.
                </p>
            </main>
        </div>
    );
};

export default CharacterCreation;