import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const PrimevalStones = () => {
    return (
        <div className="gu-shell">
            <header className="gu-topbar">
            <div>
                <div className="gu-title">Primeval Stones</div>
                <div className="gu-subtitle">Master of Gu SRD</div>
            </div>
            <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                ← Back to Directory
            </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>

            <h1 className="rule-heading">Primeval Stones</h1>
            <p className="rule-text">
                Small, smooth stones naturally formed from primeval essence, primeval stones are the main currency in the Gu world. On your turn, you can absorb the essence of a number of primeval stones equal to the number of hands you have as a Combat Action. You must have one hand free for each stone being absorbed.
            </p>
            <p className="rule-text">
                For each primeval stone being absorbed, you gain {"{30, 20, 10, 4, 1}"}¹ portion(s) of primeval essence, and the stone is destroyed in the process, crumbling into dust.
            </p>
            <p className="rule-text">
                You can carry up to 250 primeval stones on your person, but many storage type Gu exist to hold additional stones.
            </p>

            <i>¹ When you see curly brace notation, it represents your rank, or the rank of the Gu if it appears in a Gu’s description. In this case, it means expending a primeval stone restores 5 primeval essence if you are rank 1, 4 if you are rank 2, and so on.</i>

            </main>
        </div>
    );
};

export default PrimevalStones;