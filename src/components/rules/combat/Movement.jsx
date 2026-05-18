import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const Movement = () => {
    return (
        <div className="gu-shell">
            <header className="gu-topbar">
                <div>
                    <div className="gu-title">Movement</div>
                    <div className="gu-subtitle">Master of Gu SRD</div>
                </div>
                <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                    ← Back to Directory
                </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>
                <h1 className="rule-heading">Movement</h1>
                <p className="rule-text">
                    You can move a number of meters on your turn equal to your movement. 1 meter of movement corresponds to moving 1 adjacent square, including corners. If you have a flying speed, you may forego this movement to execute a number of Maneuvers dependent on the flying Gu being used. If you are under the effect of multiple Gu that grant a flying speed, you must choose one Gu and use the flying speed and number of Maneuvers granted by that Gu.
                </p>
                <p className="rule-text">
                    You can move through a [Small] or larger hostile creature’s square with a successful <Link className="rule-link" to="/rules/skills#dodge">Dodge</Link> skill test, but cannot end your turn inside another creature’s square (unless they are [Tiny]). Failing a <Link className="rule-link" to="/rules/skills#dodge">Dodge</Link> skill test made to move through a hostile creature’s square expends your remaining movement.
                </p>

                <p className="rule-subheading">Jumping</p>
                <p className="rule-text">
                    Jumping costs half of your movement in meters, rounded up. If your movement is 0, you cannot jump.
                </p>
                
                <strong className="rule-bold" style={{ textAlign: 'left' }}>Standing Jump</strong>
                <p className="rule-text">
                    From rest, you can jump a maximum of 10% of your <Link className="rule-link" to="/rules/skills#athletics">Athletics</Link> skill (rounded down to a minimum of 1) in meters upwards, or 2 meters forwards.
                </p>
                
                <strong className="rule-bold" style={{ textAlign: 'left' }}>Long Jump</strong>
                <p className="rule-text">
                    If you move at least 1 meter in the direction of your jump before jumping, your forward jumping distance is equal to half your movement, rounded up.
                </p>

                <p className="rule-subheading">Climbing</p>
                <p className="rule-text">
                    When climbing a surface, your movement is halved, rounded down to a minimum of 1 meter. If the surface does not have easy handholds like a ladder the GM may call you to make an <Link className="rule-link" to="/rules/skills#athletics">Athletics</Link> skill test or else fall.
                </p>
                <p className="rule-subheading">Swimming</p>
                <p className="rule-text">
                    Non-aquatic creatures consider water to be difficult terrain. A creature can hold its breath for a number of minutes equal to 10% of their Fortitude attribute (rounded down) before falling unconscious. If the creature remains unable to breath for the same period of time after passing out, they die.
                </p>
                <p className="rule-text">
                    When a creature enters the water, they gain the doused condition.
                </p>
                <p className="rule-subheading">Difficult Terrain</p>
                <p className="rule-text">
                    If a creature is standing in difficult terrain, it costs 2 meters of movement instead of 1 to move to another square.
                </p>
            </main>
        </div>
    );
};

export default Movement;