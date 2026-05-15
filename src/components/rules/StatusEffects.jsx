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
                <div className="rule-subheading">
                    <strong style={{ color: 'var(--accent)' }}>Ablaze</strong><br />
                    A creature with the ablaze condition is completely engulfed in flames. An ablaze creature cannot have or gain the burning condition. If a creature with the burning condition gains the ablaze condition, the burning condition is removed. At the start of each of their turns, the creature takes 30 heat damage. If a human or variant human takes heat damage to their hit points on a turn from the ablaze condition, at the end of the turn they must succeed a Perseverance attribute test or else fall unconscious. For creatures and Gu invulnerable or resistant to heat damage, consider damage dealt by the ablaze condition to be of the rank of the Gu that applied the ablaze condition, or rank 1 if the fire was natural. Being submerged in water removes the ablaze condition.

                </div>
                 <br />
                <div className="rule-subheading">
                    <strong style={{ color: 'var(--accent)' }}>Airborne</strong><br />
                    An airborne creature cannot move or take the Dodge Reaction. If a creature has a flying speed when it becomes airborne from anything other than the Take Flight Maneuver, it may immediately fly up to half its flying speed in any direction. If a creature does not have a flying speed when it becomes airborne, it immediately falls up to 500 meters. If the creature is still falling, it falls 500 meters at the end of each of its turns until it hits the ground.

                </div>
                 <br />
                <div className="rule-subheading">
                    <strong style={{ color: 'var(--accent)' }}>Bleeding X</strong><br />
                    Bleeding creatures take 1 damage directly to their hit points at the start of each of their turns for every stack of bleeding. This damage has no type and cannot be reduced by Gu, unless the bleeding condition is explicitly stated. Levels of bleeding can stack additively from the same or different sources. For every 5 hit points a bleeding creature restores, reduce the number of bleeding stacks they have by 1. If a creature is restored to their maximum hit points, they lose the bleeding condition.
                </div>
                <br />
                <div className="rule-subheading">
                    <strong style={{ color: 'var(--accent)' }}>Blinded</strong><br />
                    Blinded creatures cannot see, have a +40 penalty to Dodge, Close Combat, and Ranged Attack skill tests, and cannot make Awareness skill tests that rely on sight. 
                    Some effects like smoke and steam may say they obscure the vision of creatures inside. This does not give the creature the blinded condition; it means all other targets have full cover from them, until the creature leaves the area of effect or uses an [Investigative: Sight] Gu to see through the effect.

                </div>
                 <br />
                <div className="rule-subheading">
                    <strong style={{ color: 'var(--accent)' }}>Burning</strong><br />
                    Burning creatures take 10 heat damage at the start of each of their turns. For creatures and Gu invulnerable or resistant to heat damage, consider damage dealt by the burning condition to be of the rank of the Gu that applied the burning condition, or rank 1 if the fire was natural. Being submerged in water removes the burning condition. A creature can use their Combat Action to roll around on the ground, removing the burning condition.

                </div>
                 <br />
                <div className="rule-subheading">
                    <strong style={{ color: 'var(--accent)' }}>Dazed</strong><br />
                    A dazed creature has their Activations attribute reduced by 2 and gains a +10 penalty to all Dodge skill tests. At the end of their turn, they lose the dazed condition.

                </div>
                 <br />
                <div className="rule-subheading">
                    <strong style={{ color: 'var(--accent)' }}>Deafened</strong><br />
                    A deafened creature cannot hear, has resistance to sonic damage regardless of the rank of the effect, and cannot make Awareness tests that rely on hearing.

                </div>
                 <br />
                <div className="rule-subheading">
                    <strong style={{ color: 'var(--accent)' }}>Doused</strong><br />
                    When a creature gains the doused condition, they immediately lose the burning and ablaze conditions if they have one of them. A creature with the doused condition is vulnerable to shock damage, resistant to heat damage, and immune to the burning condition. If a doused creature takes heat damage, they lose the doused condition. The doused condition lasts for 10 minutes.

                </div>
                 <br />
                <div className="rule-subheading">
                    <strong style={{ color: 'var(--accent)' }}>Fatigued</strong><br />
                    A fatigued creature’s movement is reduced by 3 meters and makes all Dodge, Cultivation, and Athletics skill tests with a -30 penalty. The fatigued condition lasts until the creature rests for at least an hour.

                </div>
                 <br />
                <div className="rule-subheading">
                    <strong style={{ color: 'var(--accent)' }}>Invisible</strong><br />
                    Both creatures and objects can be invisible, meaning they cannot be seen or targeted with attacks. Dodge tests made to avoid attacks from an invisible creature are made with a +40 penalty. Dodge tests to avoid attacks made with an invisible weapon or effect are made with a +20 penalty. These penalties can stack with each other, but only apply if the target cannot see invisible things with an [Investigative: Sight] Gu of high enough rank.
                    If a creature can detect an invisible creature via hearing, smell, or detect [Investigative] Gu, the Dodge penalty against their attacks is reduced to +20, and they become a valid target for attacks; attack rolls made against a detected invisible creature are made with a +20 penalty.

                </div>
                 <br />
                <div className="rule-subheading">
                    <strong style={{ color: 'var(--accent)' }}>Poisoned</strong><br />
                    Poison can have any number of effects, and a creature can gain multiple instances of the poisoned condition so long as each is unique.

                </div>
                 <br />
                <div className="rule-subheading">
                    <strong style={{ color: 'var(--accent)' }}>Prone</strong><br />
                    A prone creature has a +30 penalty to all skill tests and can only move 1 meter when they succeed a Dodge skill test. Close Combat skill tests made to hit a prone creature are made with a -10 bonus. Ranged Attack skill tests made to hit a prone creature are made with a +10 penalty. A creature can expend half their movement to stand up.

                </div>
                 <br />
                <div className="rule-subheading">
                    <strong style={{ color: 'var(--accent)' }}>Restrained</strong><br />
                    A restrained creature’s movement is 0. A restrained creature automatically fails all Dodge and Flying skill tests.

                </div>
                 <br />
                <div className="rule-subheading">
                    <strong style={{ color: 'var(--accent)' }}>Stunned</strong><br />
                    A stunned creature cannot move or take Combat Actions, Bonus Actions or Reactions. At the end of their turn, they lose the stunned condition and gain the dazed condition.
                </div>
            </p>

            </main>
        </div>
    );
};

export default StatusEffects;