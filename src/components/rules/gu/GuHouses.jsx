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
WIP
            </p>

            </main>
        </div>
    );
};

export default TheAperture;