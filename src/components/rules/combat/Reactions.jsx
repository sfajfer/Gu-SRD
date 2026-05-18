import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const Reactions = () => {
    return (
        <div className="gu-shell">
            <header className="gu-topbar">
                <div>
                    <div className="gu-title">Reactions</div>
                    <div className="gu-subtitle">Master of Gu SRD</div>
                </div>
                <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                    ← Back to Directory
                </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>
                <h1 className="rule-heading">Reactions</h1>
                <p className="rule-text">
                    You can react to any action, event, or effect that you perceive. You may do so at any time, during your own or another creature's turn. Your total Reactions are replenished at the start of each of your turns up to your maximum (base 2). You cannot use multiple Reactions to the same trigger, for example, dodging and activating a shield Gu when an attack hits you.                </p>

                <p className="rule-subheading">Activate a [Defensive] Gu</p>
                <p className="rule-text">
                    [Defensive] Gu can be activated as a Reaction, including after its determined an attack has hit you, but only before the damage has been dealt.
                </p>

                <p className="rule-subheading">Dodge</p>
                <p className="rule-text">
                    The Dodge Reaction can be taken when its determined an attack has hit you and before the damage has been rolled. Make a Dodge skill test; if you succeed, you successfully dodge the attack and take no damage. If you fail, you are hit and take the full damage of the attack.
                </p>
                <p className="rule-text">
                    When you succeed a Dodge Reaction, you MUST move at least 1 meter and at most half of your movement (rounded down) in any direction. If you are unable to move, you are also unable to take the Dodge Reaction. If half of your movement is insufficient to escape an area of effect attack, you are struck by the attack regardless.
                </p>
                <p className="rule-text">
                    If you use a Reaction to dodge for any trigger except an attack hitting you, you immediately move at least 1 meter and at most 1/2 your movement in any direction.
                </p>
                <p className="rule-text">
                    Dodging  by moving out of a creature's melee range provokes attacks of opportunity, but the attack is made with disadvantage.
                </p>

                <p className="rule-subheading">Parry</p>
                <p className="rule-text">
                    The Parry Reaction can only be taken when its determined a melee attack has hit you and before the damage has been rolled. Make a <Link className="rule-link" to="/rules/skills#close-combat">Close Combat</Link> skill test with a +10 penalty, opposing the opponent’s attack roll. If you win, you take no damage from the attack and can make your own melee attack against the opponent in turn as long as they are within your melee range. You can parry attacks made as part of the Parry Reaction.
                </p>

                <p className="rule-subheading">Make an Attack of Opportunity</p>
                <p className="rule-text">
                    You may make a melee attack as an attack of opportunity when a creature moves from inside your melee range to a square outside your melee range, or if a creature inside your melee range makes a Ranged Attack attack roll against a creature other than you. If you make an unarmed attack, it cannot be a kicking attack.
                </p>
                <p className="rule-text">
                    Flying out of a creature’s melee range still provokes attacks of opportunity.
                </p>

                <p className="rule-subheading">Trigger a Held Action</p>
                <p className="rule-text">
                    When the trigger you specified upon holding a Combat Action occurs, you may take this Reaction to use said action.
                </p>

                <p className="rule-subheading">Detonate Gu Worms</p>
                <p className="rule-text">
                    As a Reaction or for free at any time during their turn, a Gu Master can self-detonate any Gu owned and refined by them with a single thought. The Gu Master must be conscious to do so, and can detonate as many or as few Gu as they want, from any distance. If the Gu is being suppressed, for example by the land spirit of a blessed land, the Gu Master cannot self-detonate it. Otherwise, the chosen Gu instantly die, with no other effects. If the Gu has a self-detonation ability, it does not trigger, since the Gu was not activated.
                </p>
            </main>
        </div>
    );
};

export default Reactions;