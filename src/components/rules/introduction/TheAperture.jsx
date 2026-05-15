import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const TheAperture = () => {
    return (
        <div className="gu-shell">
            <header className="gu-topbar">
            <div>
                <div className="gu-title">The Aperture</div>
                <div className="gu-subtitle">Master of Gu SRD</div>
            </div>
            <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                ← Back to Directory
            </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>

            <h1 className="rule-heading">The Aperture</h1>
            <p className="rule-text">
                    The aperture is a sort of extra-dimensional space located in a Gu Master’s stomach. Around the age of puberty, people can awaken their aperture by coming into contact with Hope Gu. Not everyone is lucky enough to be able to awaken their aperture, but those that do are henceforth called Gu Masters. People without an awakened aperture are called mortals, and are just regular people.
                </p>
                <p className="rule-text">
                    The aperture is a simple sphere bounded by walls and filled with a sea of primeval essence, a resource used to activate Gu as well as to cultivate. Cultivation consists of attacking your aperture walls with this primeval essence, eventually breaking them and moving on to a new realm. Gu Masters begin at rank 1 and can cultivate to rank 5. Each rank is considered a large realm, and are subdivided into 4 small realms: initial stage, middle stage, upper stage, and peak stage. After rank 5, there are still ranks 6 through 9, but that is the realm of Gu Immortals and the rules change massively. In this system, the maximum rank attainable is rank 5 peak stage.
                </p>
                <p className="rule-text">
                    You can store Gu in your aperture no matter their size, and there is no limit to the number of Gu that can be stored in your aperture. The aperture is accessible to its owner at any time through their thoughts, but other creatures can only access someone else’s aperture after they are dead or through the use of special Gu.
            </p>

            </main>
        </div>
    );
};

export default TheAperture;