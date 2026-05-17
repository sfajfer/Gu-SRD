import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const Cover = () => {
    return (
        <div className="gu-shell">
            <header className="gu-topbar">
            <div>
                <div className="gu-title">Cover</div>
                <div className="gu-subtitle">Master of Gu SRD</div>
            </div>
            <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                ← Back to Directory
            </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>

            <h1 className="rule-heading">Cover</h1>
            <p className="rule-text">
                If a creature is completely hidden behind cover from the attacker, they have full cover and typically are not a valid target for attacks. If the attacker uses a Gu with the [Piercing] keyword, however, they can make an attack against an obscured target with a +20 penalty. Gu that reveal the exact location of a target remove this penalty.
            </p>
            <p className="rule-text">
                If a creature is only partially obscured by cover, they have partial cover; they are a viable target, but attacks made against them are made with a +10 penalty. If the attacker uses a Gu with the [Piercing] keyword, however, there is no penalty to the attack roll.
            </p>
            </main>
        </div>
    );
};

export default Cover;