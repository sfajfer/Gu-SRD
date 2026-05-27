import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const Cultivation = () => {
    const HoursBankedData = [
        { apt: "Extreme Physique", hours: 5},
        { apt: "A-Grade", hours: 4 },
        { apt: "B-Grade",  hours: 3 },
        { apt: "C-Grade",  hours: 2 },
        { apt: "D-Grade",  hours: 1 },
    ];

    const HoursBankedNeededData = [
        { target: "Middle Stage", wall: "Light Membrane", needed: "50 * Rank" },
        { target: "Upper Stage", wall: "Water Membrane", needed: "100 * Rank" },
        { target: "Peak Stage", wall: "Stone Membrane", needed: "200 * Rank" },
    ];

    const aptitudeData = [
        { label: "Extreme Physique", ranks: ["8", "16", "24", "32"] },
        { label: "A-Grade", ranks: ["16", "24", "32", "40"] },
        { label: "B-Grade", ranks: ["24", "32", "40", "-"] },
        { label: "C-Grade", ranks: ["32", "40", "-", "-"] },
        { label: "D-Grade", ranks: ["40", "-", "-", "-"] },
    ];

    const modifierData = [
        { rank: "1", mod: "-40" },
        { rank: "2", mod: "-20" },
        { rank: "3", mod: "none" },
        { rank: "4", mod: "+20" },
        { rank: "5", mod: "+40" },
    ];

    return (
        <div className="gu-shell">
            <header className="gu-topbar">
                <div>
                    <div className="gu-title">Cultivation</div>
                    <div className="gu-subtitle">Master of Gu SRD</div>
                </div>
                <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                    ← Back to Directory
                </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>
                <h1 className="rule-heading">Cultivating</h1>
                <p className="rule-text" style={{fontStyle: 'italic', color: 'gray'}}> Note: Curly braces in this section refer to the target rank you are cultivating to. If you're breaking through a small realm, its just your current rank. Otherwise, its the rank you're breaking through to. For example, if you are rank 1 peak stage and cultivating to break through to rank 2, you make your Cultivation skill tests with a -20 bonus since all Cultivation skill tests have a {"{-40, -20, 0, +20, +40}"} bonus/penalty.</p>

                <p className="rule-text">
                    The process of increasing your rank in small and large realms is called cultivating. To cultivate, you must meditate and will the primeval essence in your aperture to attack and weaken the aperture walls.
                </p>

                <p className="rule-subheading">Small Realms</p>
                <p className="rule-text">
                    When you’re attempting to break through a small realm, the walls retain any damage done by your primeval essence; thus you can slowly break through over time.
                </p>
                <p className="rule-text">
	                For every 2 sequential hours that you spend cultivating, make a Cultivation skill test. You bank a number of hours according to the Aptitude vs Hours Banked table whether or not you succeed, but on a failure, you take damage to your soul equal to the number of degrees of failure on the test, with fumbles counting as an additional degree of failure. On a critical success, you bank an additional hour of cultivation.
                </p>
                <p className="rule-text">
                    When your banked hours reach the number you need to break through to the next realm, you lose all banked hours and your rank increases by a small realm. When you successfully break through a small realm, your maximum portions of primeval essence is doubled but you retain your current number of portions.
                </p>

                <div className="gu-table-wrap" style={{ marginTop: '30px', marginBottom: '30px' }}>
                    <table className="gu-table">
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: '#e67e22', color: 'black', width: '20%', textAlign: 'center' }}>Aptitude</th>
                                <th style={{ backgroundColor: '#2980b9', color: 'white', textAlign: 'center' }}>Hours Banked / 2 hours</th>
                            </tr>
                        </thead>
                        <tbody>
                            {HoursBankedData.map((row, idx) => (
                                <tr key={idx} className="gu-row">
                                    <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{row.apt}</td>
                                    <td style={{ paddingLeft: '15px' }}>
                                        <strong>{row.hours}</strong> 
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="gu-table-wrap" style={{ marginTop: '30px', marginBottom: '30px' }}>
                    <table className="gu-table">
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: '#e67e22', color: 'black', width: '20%', textAlign: 'center' }}>Target Realm</th>
                                <th style={{ backgroundColor: '#2980b9', color: 'white', textAlign: 'center' }}>Aperture Wall</th>
                                <th style={{ backgroundColor: '#2980b9', color: 'white', textAlign: 'center' }}>Banked Hours Needed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {HoursBankedNeededData.map((row, idx) => (
                                <tr key={idx} className="gu-row">
                                    <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{row.target}</td>
                                    <td style={{ paddingLeft: '15px' }}>
                                        <strong>{row.wall}</strong> 
                                    </td>
                                    <td style={{ paddingLeft: '15px' }}>
                                        <strong>{row.needed}</strong> 
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="rule-subheading">Breaking Through to the Next Rank</p>
                <p className="rule-text">
                    When you reach peak stage of a rank, the aperture wall becomes a crystal membrane and the walls gain the ability to naturally recover over a short time, making it necessary to break the walls in a single sitting. This takes a number of hours according to the following table:
                </p>
                
                <div className="gu-table-wrap" style={{ marginTop: '20px', marginBottom: '30px' }}>
                    <table className="gu-table">
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: '#7f8c8d', color: 'black', fontStyle: 'italic' }}>Aptitude vs Target Rank</th>
                                <th style={{ backgroundColor: '#2980b9', color: 'black', textAlign: 'center' }}>2</th>
                                <th style={{ backgroundColor: '#2980b9', color: 'black', textAlign: 'center' }}>3</th>
                                <th style={{ backgroundColor: '#2980b9', color: 'black', textAlign: 'center' }}>4</th>
                                <th style={{ backgroundColor: '#2980b9', color: 'black', textAlign: 'center' }}>5</th>
                            </tr>
                        </thead>
                        <tbody>
                            {aptitudeData.map((row, idx) => (
                                <tr key={idx} className="gu-row">
                                    <td style={{ backgroundColor: 'rgba(41, 128, 185, 0.2)', fontWeight: 'bold' }}>{row.label}</td>
                                    {row.ranks.map((val, cellIdx) => (
                                        <td 
                                            key={cellIdx} 
                                            style={{ 
                                                textAlign: 'center', 
                                                backgroundColor: val === "-" ? '#555' : 'transparent',
                                                color: val === "-" ? '#777' : 'inherit'
                                            }}
                                        >
                                            {val}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="rule-text">
                    If your Aptitude is too low to break through to the next rank, you must either increase your Aptitude to a higher grade or consume primeval stones to make up for the difference.
                </p>

                <p className="rule-text">
                    Taking any breaks from the process gives your aperture time to fully heal, meaning you need to restart from the beginning. Every 2 hours you spend cultivating to break through a large realm, make a Cultivation skill test. On a failure, you take damage to your soul equal to the number of degrees of failure on the test. On a fumble, you take an additional point of damage to your soul.
                </p>
                <p className="rule-text">
                    Whether you are breaking through a large realm or a small realm, all Cultivation skill tests are made with a {"{-40, -20, 0, +20, +40}"} bonus/penalty.
                </p>

                <p className="rule-text">
                    When you break through a large realm, your primeval sea is completely emptied of the previous rank’s primeval essence and your maximum primeval essence is reset to your aptitude.
                </p>

                <p className="rule-subheading">Consuming Primeval Stones</p>
                <p className="rule-text">
                    You can expend primeval stones to hasten your cultivation, and you may do so to assist in breaking through both small and large realms. Every 2 sequential hours spent cultivating to break through a small realm, you can expend {"{10, 100, 1,000, 10,000, 100,000}"} primeval stones. If you do so, you bank 5 additional hours.
                </p>
                <p className="rule-text">
                    For every {"{N/A, 100, 1,000, 10,000, 100,000}"} primeval stones you expend when cultivating to break through to the next rank, it takes 1 less hour of cultivation.
                </p>

                <p className="rule-text">
                    If your Aptitude is too low to break through to the next rank, you can consume {"{N/A, 1,000, 10,000, 100,000, 1,000,000}"} primeval stones to consider your Aptitude 1 grade higher during this cultivation session. You may do this multiple times.
                </p>
                <p className="rule-text">
                    If your cultivation is interrupted, divide the number of primeval stones that would have been expended had you been successful by the total number of hours you would have cultivated to find how many stones you consumed each hour. Multiply that figure by the number of hours your cultivated before being interrupted to find how many stones you expended.
                </p>
            </main>
        </div>
    );
};

export default Cultivation;