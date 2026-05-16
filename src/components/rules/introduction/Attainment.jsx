import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const Attainment = () => {
    return (
        <div className="gu-shell">
            <header className="gu-topbar">
                <div>
                    <div className="gu-title">Attainment</div>
                    <div className="gu-subtitle">Master of Gu SRD</div>
                </div>
                <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                    ← Back to Directory
                </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>
                <h1 className="rule-heading">Attainment</h1>
                <p className="rule-text">
                    It’s difficult to use and improve Gu of a path you aren’t familiar with. Oftentimes, a Gu Master that achieves Master Attainment in any path gains fame for their accomplishment, and may be contacted by other forces to refine Gu or complete difficult tasks related to the path.
                </p>
                <p className="rule-text">
                    Attainment in each path is tracked on your character sheet by the amount of experience invested in it. Whenever you can spend experience to purchase talents or improve your attributes and skills, you may choose to invest experience in specific paths. When you reach the threshold of invested experience in a path, you gain the Attainment as if it were a Talent. This means once you have invested 250 total experience in a path, you will have Fundamental, Intermediate, and Master Attainment in that path. You can also gain experience in a path by creating and improving recipes, deducing killer moves, and refining Gu that belong to that path. Every character starts with 50 free experience invested in a single path.
                </p>

                <p className="rule-subheading">[Path] Attainment</p>

                <strong className="rule-text" style={{ display: 'block', fontSize: '1.2rem', marginTop: '20px', color: '#c19b41' }}>Fundamental</strong>
                <p className="rule-text" style={{ fontStyle: 'italic', opacity: 0.8, marginBottom: '10px' }}>
                    Threshold: 50 experience
                </p>
                <p className="rule-text">
                    You become familiar with the core teachings of [Path], and you gain the following benefits:<br />
                    •    You gain an additional Bonus Action that can only be used to activate a single [Path] Gu on your turn.<br />
                    •    You can improve refinement recipes for [Path] Gu.<br />
                    •    You can deduce killer moves whose core Gu includes [Path] Gu.
                </p>

                <strong className="rule-text" style={{ display: 'block', fontSize: '1.2rem', marginTop: '25px', color: '#c19b41' }}>Intermediate</strong>
                <p className="rule-text" style={{ fontStyle: 'italic', opacity: 0.8, marginBottom: '10px' }}>
                    Threshold: 120 experience
                </p>
                <p className="rule-text">
                    Your understanding of [Path] has reached a qualitative change, and you gain the following benefits:<br />
                    •    You gain a -20 bonus to all Refinement and Knowledge (Gu) skill tests to refine or identify [Path] Gu.<br />
                    •    You gain a -20 bonus to Refinement skill tests made to improve or create refinement recipes for [Path] Gu.<br />
                    •    You gain a -10 bonus on Deduction skill tests made to deduce killer moves if they have a [Path] Gu in its core.<br />
                    •    You can create refinement recipes for [Path] Gu.
                </p>

                <strong className="rule-text" style={{ display: 'block', fontSize: '1.2rem', marginTop: '25px', color: '#c19b41' }}>Master</strong>
                <p className="rule-text" style={{ fontStyle: 'italic', opacity: 0.8, marginBottom: '10px' }}>
                    Threshold: 250 experience
                </p>
                <p className="rule-text">
                    Your understanding of [Path] reaches the apex of mortal comprehension. You gain the following benefits:<br />
                    •    You gain a -40 bonus to all Refinement and Knowledge (Gu) skill tests to refine or identify [Path] Gu.<br />
                    •    You gain a -40 bonus to Refinement skill tests made to improve or create refinement recipes for [Path] Gu.<br />
                    •    You gain a -20 bonus on Deduction skill tests made to deduce killer moves if they have a [Path] Gu in its core.
                </p>
            </main>
        </div>
    );
};

export default Attainment;