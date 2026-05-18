import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const CombatActions = () => {
    return (
        <div className="gu-shell">
            <header className="gu-topbar">
                <div>
                    <div className="gu-title">Combat Actions</div>
                    <div className="gu-subtitle">Master of Gu SRD</div>
                </div>
                <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                    ← Back to Directory
                </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>
                <h1 className="rule-heading">Combat Actions</h1>

                <p className="rule-subheading">Activate Gu</p>
                <p className="rule-text">
                    Your Activations can be used to activate Gu as well as to utilize the lingering effects of many Gu, such as directing manifestations. You may activate a number of Gu equal to your Activations attribute. You may activate each at any time during your turn, including in the middle of movement, but you cannot activate a Gu when it is not your turn. You may activate the same Gu multiple times, unless you are sustaining it. Using up your activations does not prevent you from activating Gu using your Reactions.
                </p>

                <p className="rule-subheading">Activate a Killer Move</p>
                <p className="rule-text">
                    Pick a killer move for which you have all the Gu and enough primeval essence for all activations. For every activation in the killer move over your Activations attribute, take 1 damage to your soul. The killer move activates, applying its effect. If the killer move has the [Sustained] keyword, you take 1 damage to your soul any time you activate a Gu while sustaining the killer move.
                </p>

                <p className="rule-subheading">Melee Attack</p>
                
                <p className="rule-text">
                    <strong>Weapon Attack</strong><br />
                    Roll a <Link className="rule-link" to="/rules/skills#close-combat">Close Combat</Link> skill test against an enemy within your weapon’s range. On a hit, deal the damage of the weapon, +1 damage for every 20 points you have in Strength. Alternatively, you may forego a weapon attack to throw a weapon with a thrown damage property. Thrown weapons have a range of 10 meters, +1 meter for every 5 points you have in Strength, and deal the weapon's thrown damage, +1 damage for every 20 points you have in Strength.
                </p>
                
                <p className="rule-text">
                    <strong>Multi-Weapon Fighting</strong><br />
                    When wielding more than 1 weapon, you can make a number of weapon attacks equal to the number of wielded weapons instead of just 1. If you elect to do so, all weapon attacks made have a penalty equal to +(number of attacks * 10). You cannot wield more weapons than you have hands.
                </p>

                <p className="rule-text">
                    <strong>Unarmed Strike</strong><br />
                    When you take an unarmed strike Combat Action, you may make a punch attack for each arm you have, or a single kick attack or bite attack.
                </p>

                <p className="rule-text" style={{ paddingLeft: '20px' }}>
                    • <strong>Punch:</strong> Roll a <Link className="rule-link" to="/rules/skills#close-combat">Close Combat</Link> skill test against a target within 1 meter. On a hit, deal 1 force damage, +1 damage for every 10 points you have in Strength. For every 5 damage dealt, even if it is reduced, you take 1 force damage directly to your hit points. Gu such as Metal Skin Gu and Copper Tendons Gu are typically used to prevent your own strikes from hurting you. At the Gamemaster's discretion, the recoil damage can be removed when punching a sufficiently soft target like Jelly Bubble Gu.<br /><br />
                    • <strong>Kick:</strong> Roll a <Link className="rule-link" to="/rules/skills#close-combat">Close Combat</Link> skill test against a target within 1 meter. On a hit, deal 1 force damage, +1 damage for every 5 points you have in Strength. If the target is [Large] or smaller, it is knocked backwards 1 meter, +1 meter for every 100 points you have in Strength, and lands prone. Upon striking a creature or object, the target and the creature or object crashed into both take 1 force damage, +1 damage for every 100 points you have in Strength.<br /><br />
                    • <strong>Bite:</strong> You viciously bite the target. Roll a <Link className="rule-link" to="/rules/skills#close-combat">Close Combat</Link> skill test against a target within 1 meter. On a hit, deal 2 rending damage, +1 damage for every 5 points you have in Strength. The target is inflicted with bleeding X, where X is equal to 20% of the rending damage dealt to their hit points, rounded down (to a minimum of 0).<br /><br />
                    • <strong>Shove:</strong> You attempt to push a creature within 1 meter. You roll an Athletics skill test opposed by the creature's <Link className="rule-link" to="/rules/skills#close-combat">Close Combat</Link>. If you win, the creature is pushed backwards 2 meters. If you won by 3 or more degrees of success, they fall prone.
                </p>

                <p className="rule-subheading">Grapple</p>
                <p className="rule-text">
                    Select an enemy of equal or lesser size in an adjacent square. Roll an opposed Athletics skill test against them. If you win, The creature is restrained and now occupies the same square as you while restrained in this way. While you are grappling a creature, you may not make kicking attacks and the number of free hands you can make punch attacks with using the Melee Attack action is reduced by 1.
                </p>
                <p className="rule-text">
                    You may expend your movement to make an Athletics skill test, with a +10 penalty for every 50 kilograms the grappled target weighs. On a success, you can move up to half your movement (rounded down).
                </p>
                <p className="rule-text">
                    As a Bonus Action, you can throw a target grappled by you as long as your Strength attribute is greater than their weight in kilograms. The distance you can throw them is a number of meters equal to 5% of the difference between your Strength attribute and their weight in kilograms, rounded down to a minimum of 1 meter. If the creature strikes another creature or object besides the ground, both take 3 force damage, +1 damage for every 10 points you have in Strength.
                </p>
                <p className="rule-text">
                    As a Combat Action, a grappled creature can attempt to break free, making an opposed Athletics skill test against the grappler. On a success, they break free.
                </p>

                <p className="rule-subheading">Absorb Primeval Stones</p>
                <p className="rule-text">
                    On your turn, you can absorb the essence of a number of primeval stones equal to the number of hands you have. You must have one hand free for each stone being absorbed.
                </p>
                <p className="rule-text">
                    For each primeval stone being absorbed, you gain {"{30, 20, 10, 4, 1}"} portions of primeval essence, and the stone is destroyed in the process, crumbling into dust.
                </p>

                <p className="rule-subheading">Hold an Action</p>
                <p className="rule-text">
                    You can choose to hold your Combat Action, specifying an action and a trigger for it to occur. When the trigger happens, you may use a Reaction to take that Combat Action. If you are reacting to an opponent’s actions, you must make an opposed skill test to see whose action occurs first, with the skill in question being <Link className="rule-link" to="/rules/skills#close-combat">Close Combat</Link> if within 2 meters of each other, or Ranged Attack if not. If you hold the Activate Gu action, you may only specify a single activation.
                </p>
                <p className="rule-text">
                    Triggers can be specific or broad, ranging from “when the opponent uses Fire Pellet Gu” to “when a creature makes any hostile moves”.
                </p>

                <p className="rule-subheading">Sprint</p>
                <p className="rule-text">
                    Taking the sprint action triples your non-flying movement until the end of your turn.
                </p>
            </main>
        </div>
    );
};

export default CombatActions;