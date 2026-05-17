import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const HighGround = () => {
    return (
        <div className="gu-shell">
            <header className="gu-topbar">
            <div>
                <div className="gu-title">High Ground</div>
                <div className="gu-subtitle">Master of Gu SRD</div>
            </div>
            <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                ← Back to Directory
            </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>

            <h1 className="rule-heading">High Ground</h1>
            <p className="rule-text">
                Ranged Attack skill tests are made with a -10 bonus if the target is at least 2 meters lower than the attacker in elevation.
            </p>

            </main>
        </div>
    );
};

export default HighGround;