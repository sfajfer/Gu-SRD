import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const Flying = () => {
    return (
        <div className="gu-shell">
            <header className="gu-topbar">
                <div>
                    <div className="gu-title">Flying</div>
                    <div className="gu-subtitle">Master of Gu SRD</div>
                </div>
                <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                    ← Back to Directory
                </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>
                <h1 className="rule-heading">Maneuvers</h1>
                <p className="rule-text">
                    You may only execute a Maneuver if you have a flying speed. With the exception of Take Flight, you must be airborne to execute a maneuver. While airborne, you make Dodge skill tests with your Flying skill until you return to the ground, and use your flying speed when dodging. Penalties to your Dodge skill tests also apply to Flying skill tests made to dodge attacks.
                </p>

                <p className="rule-subheading">Take Flight</p>
                <p className="rule-text">
                    Taking flight can only be done when on the ground. You rise a number of meters into the air equal to half your flying speed, rounded down, and are now airborne.
                </p>

                <p className="rule-subheading">Fly</p>
                <p className="rule-text">
                    You move a number of meters equal to your flying speed in a straight line in any direction.
                </p>

                <p className="rule-subheading">Dive</p>
                <p className="rule-text">
                    You must be at least 5 meters above the ground to perform a Dive. Make a Flying skill test. On a success, you dive down a distance of up to triple your flying speed, and can move up to your flying speed in meters forward. When you finish a Dive, you may make a single weapon or punch attack or activate a Gu with a range of touch targeting a creature within your melee range. Whether you do or not, you can try to execute a Land maneuver or else rise 1 meter directly upward at the end of the dive.
                </p>
                <p className="rule-text">
                    If you make a weapon or punch attack at the end of your dive, it deals additional force damage equal to your flying speed.
                </p>
                <p className="rule-text">
                    If you fail the test, you dive directly downward a number of meters equal to your flying speed before regaining control. If this would cause you to hit the ground, you do so, are no longer airborne, and take 4 force damage for every meter you dove.
                </p>

                <p className="rule-subheading">Evade</p>
                <p className="rule-text">
                    Make a Flying skill test. On a success, all skill tests made to hit you with an attack are made with a penalty equal to +(50% of your flying skill, rounded down to the nearest multiple of 5) until the start of your next turn. You can only make one Evade Maneuver each turn.
                </p>

                <p className="rule-subheading">Land</p>
                <p className="rule-text">
                    You land on solid ground. If executed at the end of a dive or atop Difficult Terrain, you must succeed a Flying skill test or else land prone.
                </p>
            </main>
        </div>
    );
};

export default Flying;