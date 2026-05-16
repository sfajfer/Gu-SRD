import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles.css';

const StatusEffects = () => {
    return (
        <div className="gu-shell">
            <header className="gu-topbar">
            <div>
                <div className="gu-title">Status Effects</div>
                <div className="gu-subtitle">Master of Gu SRD</div>
            </div>
            <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                ← Back to Directory
            </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>

            <h1 className="rule-heading">Status Effects</h1>
            <p className="rule-text">
                <div className="status-effect-text">
                    <p className="rule-subheading">Ablaze</p>
                    <p className="rule-text">
                    A creature with the <i>ablaze</i> condition is completely engulfed in flames. An <i>ablaze</i> creature cannot have or gain the burning condition. If a creature with the <i>burning</i> condition gains the <i>ablaze</i> condition, the <i>burning</i> condition is removed. At the start of each of their turns, the creature takes 30 heat damage. If a human or variant human takes heat damage to their hit points on a turn from the <i>ablaze</i> condition, at the end of the turn they must succeed a Perseverance attribute test or else fall unconscious. For creatures and Gu invulnerable or resistant to heat damage, consider damage dealt by the <i>ablaze</i> condition to be of the rank of the Gu that applied the <i>ablaze</i> condition, or rank 1 if the fire was natural. Being submerged in water removes the <i>ablaze</i> condition.
                    </p>
                </div>
                 <br />
                <div className="status-effect-text">
                    <p className="rule-subheading">Airborne</p>
                    <p className="rule-text">
                    An <i>airborne</i> creature cannot use movement or take the Dodge Reaction. If a creature has a flying speed when it becomes <i>airborne</i> from anything other than the Take Flight Maneuver, it may immediately fly up to half its flying speed in any direction. If a creature does not have a flying speed when it becomes <i>airborne</i>, it immediately falls up to 500 meters. If the creature is still falling, it falls 500 meters at the end of each of its turns until it hits the ground.
                    </p>
                </div>
                 <br />
                <div className="status-effect-text">
                    <p className="rule-subheading">Bleeding X</p>
                    <p className="rule-text">
                    <i>Bleeding</i> creatures take 1 damage directly to their hit points at the start of each of their turns for every stack of <i>bleeding</i>. This damage has no type and cannot be reduced by Gu, unless the <i>bleeding</i> condition is explicitly stated. Levels of <i>bleeding</i> can stack additively from the same or different sources. If a creature's current hit points are equal to their maximum hit points, they are immune to the <i>bleeding</i> condition; if a source does damage and applies the <i>bleeding</i> condition, the condition is applied after the damage, circumventing this immunity. For every 5 hit points a <i>bleeding</i> creature restores, reduce the number of <i>bleeding</i> stacks they have by 1. If a creature is restored to their maximum hit points, they lose the <i>bleeding</i> condition.
                    </p>
                </div>
                <br />
                <div className="status-effect-text">
                    <p className="rule-subheading">Blinded</p>
                    <p className="rule-text">
                    <i>Blinded</i> creatures cannot see, have a +40 penalty to Dodge, Close Combat, and Ranged Attack skill tests, and cannot make Awareness skill tests that rely on sight. 
                    </p>
                    <p className="rule-text">
                    Some effects like smoke and steam may say they obscure the vision of creatures inside. This does not give the creature the <i>blinded</i> condition; it means all other targets have full cover from them, until the creature leaves the area of effect or uses an [<strong>Investigative: Sight</strong>] Gu to see through the effect.
                    </p>
                </div>
                 <br />
                <div className="status-effect-text">
                    <p className="rule-subheading">Burning</p>
                    <p className="rule-text">
                    Burning creatures take 10 heat damage at the start of each of their turns. For targets invulnerable or resistant to heat damage, consider damage dealt by the burning condition to be of the rank of the Gu that applied the burning condition, or rank 1 if the fire was natural. Being submerged in water removes the burning condition. A creature can use their Combat Action to roll around on the ground, removing the burning condition.
                    </p>
                </div>
                 <br />
                <div className="status-effect-text">
                    <p className="rule-subheading">Dazed</p>
                    <p className="rule-text">
                    A dazed creature has their Activations attribute reduced by 2 and gains a +10 penalty to all Dodge skill tests. At the end of their turn, they lose the dazed condition.
                    </p>
                </div>
                 <br />
                <div className="status-effect-text">
                    <p className="rule-subheading">Deafened</p>
                    <p className="rule-text">
                    A deafened creature cannot hear, has resistance to sonic damage regardless of the rank of the effect, and cannot make Awareness tests that rely on hearing.
                    </p>
                </div>
                 <br />
                <div className="status-effect-text">
                    <p className="rule-subheading">Doused</p>
                    <p className="rule-text">
                    When a creature gains the doused condition, they immediately lose the burning and ablaze conditions if they have one of them. A creature with the doused condition is vulnerable to shock damage, resistant to heat damage, and immune to the burning condition. If a doused creature takes heat damage, they lose the doused condition. The doused condition lasts for 10 minutes.
                    </p>
                </div>
                 <br />
                <div className="status-effect-text">
                    <p className="rule-subheading">Fatigued</p>
                    <p className="rule-text">
                    A fatigued creature’s movement is reduced by 3 meters and makes all Dodge, Cultivation, and Athletics skill tests with a -30 penalty. The fatigued condition lasts until the creature rests for at least an hour.
                    </p>
                </div>
                 <br />
                <div className="status-effect-text">
                    <p className="rule-subheading">Invisible</p>
                    <p className="rule-text">
                    Both creatures and objects can be invisible, meaning they cannot be seen or targeted with attacks. Dodge tests made to avoid attacks from an invisible creature are made with a +40 penalty. Dodge tests to avoid attacks made with an invisible weapon or effect are made with a +20 penalty. These penalties can stack with each other, but only apply if the target cannot see invisible things with an [Investigative: Sight] Gu of high enough rank.
                    </p>
                    <p className="rule-text">
                    If a creature can detect an invisible creature via hearing, smell, or detect [Investigative] Gu, the Dodge penalty against their attacks is reduced to +20, and they become a valid target for attacks; attack rolls made against a detected invisible creature are made with a +20 penalty.
                    </p>
                </div>
                 <br />
                <div className="status-effect-text">
                    <p className="rule-subheading">Poisoned</p>
                    <p className="rule-text">
                    Poison can have any number of effects, and a creature can gain multiple instances of the poisoned condition so long as each is unique.
                    </p>
                </div>
                 <br />
                <div className="status-effect-text">
                    <p className="rule-subheading">Prone</p>
                    <p className="rule-text">
                    A prone creature has a +30 penalty to all skill tests and can only move 1 meter when they succeed a Dodge skill test. Close Combat skill tests made to hit a prone creature are made with a -10 bonus. Ranged Attack skill tests made to hit a prone creature are made with a +10 penalty. A creature can expend half their movement to stand up.
                    </p>
                </div>
                 <br />
                <div className="status-effect-text">
                    <p className="rule-subheading">Restrained</p>
                    <p className="rule-text">
                    A restrained creature’s movement is 0. A restrained creature automatically fails all Dodge and Flying skill tests.
                    </p>
                </div>
                 <br />
                <div className="status-effect-text">
                    <p className="rule-subheading">Stunned</p>
                    <p className="rule-text">
                    A stunned creature cannot move or take Combat Actions, Bonus Actions or Reactions. At the end of their turn, they lose the stunned condition and gain the dazed condition.
                    </p>
                </div>
            </p>

            </main>
        </div>
    );
};

export default StatusEffects;