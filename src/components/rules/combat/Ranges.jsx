import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const Ranges = () => {
    return (
        <div className="gu-shell">
            <header className="gu-topbar">
                <div>
                    <div className="gu-title">Ranges</div>
                    <div className="gu-subtitle">Master of Gu SRD</div>
                </div>
                <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                    ← Back to Directory
                </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>
                <h1 className="rule-heading">Ranges</h1>

                <p className="rule-subheading">Targeted Attacks</p>
                <p className="rule-text">
                    The range of a targeted attack refers to how many meters of movement would have to be expended to reach the square of a valid target. This includes targeted area of effect attacks, such as lobbing a bomb to a square within range.
                </p>
                <p className="rule-text">
                    If an effect targets a creature, it can target anything living and thinking. Anything that isn't a creature is considered an object. If the effect just says to pick a target, the target can be a creature or object.
                </p>

                <p className="rule-subheading">Touch</p>
                <p className="rule-text">
                    You must be within 1 meter of a creature to hit them with an attack with a range of <em>touch</em>. Touch attacks can be reacted to, but <strong>[Shield]</strong> Gu do not block touch attacks unless noted in the Gu’s description, such as Jelly Bubble Gu. You can target yourself with Touch attacks.
                </p>

                <p className="rule-subheading">Area of Effect Attacks</p>
                <p className="rule-text" style={{ marginBottom: '30px' }}>
                    When a creature is caught in an area of effect, they can use the <strong>Dodge Reaction</strong>, escaping the area of effect if they succeed and are able to move outside the area of effect.
                </p>

                {/* Grid Layout for AoE shapes and their diagrams */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                    
                    {/* Cone Section */}
                    <div className="gu-aoe-section">
                        <strong className="rule-text" style={{ display: 'block', fontSize: '1.2rem', color: '#c19b41', marginBottom: '10px' }}>
                            Cone
                        </strong>
                        <p className="rule-text">
                            A 3 meter long cone will spread to any square that could be reached using 3 meters of movement between two adjacent diagonals or cardinal directions.
                        </p>
                        <div style={{ marginTop: '15px', padding: '10px', background: '#1a1a1a', borderRadius: '6px', border: '1px solid #333', textAlign: 'center' }}>
                            <p style={{ color: '#888', fontStyle: 'italic', marginBottom: '10px' }}>Valid 3-meter cones</p>
                            <img 
                                src="../../../../3mCone.png" 
                                alt="" 
                                style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} 
                            />
                            <img 
                                src="../../../../3mConeLeft.png" 
                                alt="" 
                                style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} 
                            />
                        </div>
                    </div>

                    {/* Line Section */}
                    <div className="gu-aoe-section">
                        <strong className="rule-text" style={{ display: 'block', fontSize: '1.2rem', color: '#c19b41', marginBottom: '10px' }}>
                            Line
                        </strong>
                        <p className="rule-text">
                            Lines have a height, width, and length. If the height is not specified, it is the same as the width. Usually, lines originate from the square in front of the Gu Master creating it, but some Gu such as Fire Curtain Gu allow the user to choose a source square. In that case, the source and end of the line must both be within the range of the Gu.
                        </p>
                        <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ padding: '10px', background: '#1a1a1a', borderRadius: '6px', border: '1px solid #333', textAlign: 'center' }}>
                                <p style={{ color: '#888', fontStyle: 'italic', marginBottom: '10px' }}>Valid 4-meter lines</p>
                                <img 
                                    src="../../../../4x1LineCenter.png" 
                                    alt="" 
                                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} 
                                />
                                <img 
                                    src="../../../../4x1LineLeft.png" 
                                    alt="" 
                                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} 
                                />
                            </div>
                            <div style={{ padding: '10px', background: '#1a1a1a', borderRadius: '6px', border: '1px solid #333', textAlign: 'center' }}>
                                <p style={{ color: '#888', fontStyle: 'italic', marginBottom: '10px' }}>Valid 5-meter long, 2-meter wide lines</p>
                                <img 
                                    src="../../../../5x2LineCenter.png" 
                                    alt="" 
                                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} 
                                />
                                <img 
                                    src="../../../../5x2LineLeft.png" 
                                    alt="" 
                                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Radius Section */}
                    <div className="gu-aoe-section">
                        <strong className="rule-text" style={{ display: 'block', fontSize: '1.2rem', color: '#c19b41', marginBottom: '10px' }}>
                            Radius
                        </strong>
                        <p className="rule-text">
                            Circular areas of effect will originate from a source square and have a radius. If an area of effect has a radius of 3 meters, it will affect the source square and any square that could be reached using 3 meters of movement from the source square. This translates to a square with a side length of 7 meters.
                        </p>
                        <div style={{ marginTop: '15px', padding: '10px', background: '#1a1a1a', borderRadius: '6px', border: '1px solid #333', textAlign: 'center' }}>
                            <p style={{ color: '#888', fontStyle: 'italic', marginBottom: '10px' }}>A 3-meter radius</p>
                            <img 
                                src="../../../../3mRadius.png" 
                                alt="" 
                                style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} 
                            />
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Ranges;