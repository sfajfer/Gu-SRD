import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const PrimevalEssence = () => {
    return (
        <div className="gu-shell">
            <header className="gu-topbar">
            <div>
                <div className="gu-title">Primeval Essence</div>
                <div className="gu-subtitle">Master of Gu SRD</div>
            </div>
            <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                ← Back to Directory
            </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>

            <h1 className="rule-heading">Primeval Essence</h1>
            <p className="rule-text">
                Primeval essence is the main resource used by Gu masters to activate and refine Gu as well as cultivate to increase their strength. The representation of primeval essence you see here is an approximation, as the resource quickly becomes quite complex when factoring in the rank and realm of the user alongside the rank of the Gu.
                </p>
                <p className="rule-text">
                A Gu Master’s aperture has a maximum amount of primeval essence, determined by their aptitude. At the initial stage of each rank, a Gu Master has a number of portions of primeval essence equal to their aptitude. A Gu Master at rank 2 initial stage with a 30% aptitude (D-Grade) has a maximum of 30 portions of primeval essence.
                </p>
                <p className="rule-text">
                When out of combat, the recovery rate is 10% of the Gu Master’s maximum primeval essence every hour. Each small realm above initial stage doubles the maximum number of portions available.
                </p>
                <p className="rule-text">
                At higher ranks, your primeval essence is significantly more potent than that of the rank below you. For simplicity, activating any Gu of a rank below your own costs a single portion of primeval essence.
                </p>
                <p className="rule-text">
                As a Bonus Action, you may leak the aura of your primeval essence. Any creature within 10 meters of you can sense this aura and immediately identify the rank and stage of your primeval essence.
            </p>

            </main>
        </div>
    );
};

export default PrimevalEssence;