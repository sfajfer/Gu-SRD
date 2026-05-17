import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const Light = () => {
    return (
        <div className="gu-shell">
            <header className="gu-topbar">
            <div>
                <div className="gu-title">Light</div>
                <div className="gu-subtitle">Master of Gu SRD</div>
            </div>
            <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                ← Back to Directory
            </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>

            <h1 className="rule-heading">Light</h1>
            <p className="rule-text">
                Light sources specify how many meters of bright light they create in a radius around them. Dim light is emitted in a radius equal to twice the radius of bright light. For example, Little Light Gu emits 3 meters of bright light at all times, which means any square within 3 meters is in bright light, and any square between 4 and 6 meters away would be in dim light, with any squares beyond 6 meters still being in darkness. A creature in total darkness is considered invisible to any creatures that cannot see through that darkness. Awareness skill tests made to see a target in dim light are made with a +20 penalty.
            </p>

            </main>
        </div>
    );
};

export default Light;