import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const KillerMoves = () => {
    return (
        <div className="gu-shell">
            <header className="gu-topbar">
                <div>
                    <div className="gu-title">Killer Moves</div>
                    <div className="gu-subtitle">Master of Gu SRD</div>
                </div>
                <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                    ← Back to Directory
                </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>
                <h1 className="rule-heading">Killer Moves</h1>
                <p className="rule-text">
                    When multiple Gu are combined into a single effect it is colloquially known as a killer move. Killer moves have a core of 1 or more same-ranked Gu as well as any number of supplemental Gu.
                </p>

                <p className="rule-text" style={{ fontWeight: 'bold', fontSize: '1.2rem', marginTop: '20px', color: '#c19b41' }}>
                    Blood Vision
                </p>
                <p className="rule-text">
                    Rank 4 Divination Killer Move
                </p>
                <p className="rule-text">
                    Core Gu: Rank 4 Blood Sense Gu, Rank 4 Blood Brother Gu
                </p>
                <p className="rule-text">
                    Supplementary Gu: Rank 4 Ten Meter Gu,
                </p>
                <p className="rule-text">
                    Total Activations: 4
                </p>
                <p className="rule-text">
                    Activation Cost: 49 portions
                </p>
                <p className="rule-text">
                    Keywords: [Investigative: Detect], [Sustained]
                </p>
                <p className="rule-text" style={{ marginBottom: '30px' }}>
                    Effect: Any creatures within 10 meters have their blood tainted with yours. These creatures are permanently considered your siblings by blood path methods. While this killer move is sustained, you can sense the exact location of any of your blood relatives within 10 meters.
                </p>

                <p className="rule-subheading">Components of a Killer Move</p>
                
                <p className="rule-subheading">Core Gu</p>
                <p className="rule-text">
                    Core Gu are the most important part of a killer move, and determine the main paths, rank, and general effect of the killer move. Looking at the Rank 4 killer move Blood Vision, shown above, It uses Rank 4 Blood Sense Gu and Rank 4 Blood Brother Gu as its core. Blood Brother Gu can turn a creature into your blood relative, and Blood Sense Gu senses the location of blood relatives nearby, so a natural effect would be to both transmute the blood of and sense nearby creatures. These are also both Blood Path Gu, and thus the killer move belongs to Blood Path as well. Finally, the Rank of the killer move is equal to the highest ranked Gu among the killer move’s core.
                </p>

                <p className="rule-subheading">Supplementary Gu</p>
                <p className="rule-text">
                    Supplementary Gu are used to amplify or mutate the effects of the core Gu. Supplementary Gu can be of a different path and even a higher rank than the core Gu, but must have the [Supplementary] keyword and do not change the overall rank of the killer move. If the supplementary Gu is of a lower rank than the killer move, you must have 2(killer move rank - [Supplementary] Gu rank)  of the Gu in the killer move for it to have any effect.
                </p>

                <p className="rule-subheading">Activations</p>
                <p className="rule-text">
                    The activations stat is simply the number of Gu in the Killer Move. More complicated killer moves use many Gu and are more taxing on the user’s soul. For each Gu over your Activations attribute, your soul takes 1 damage upon activation. Every Gu in the killer move counts towards your number of currently sustained Gu if the killer move has the [Sustained] keyword.
                </p>

                <p className="rule-subheading">Activation Cost</p>
                <p className="rule-text">
                    The combined primeval essence cost of all Gu in the recipe. This number assumes the user is of the same rank as the killer move. If the user is of a higher or lower rank, adjust the cost accordingly.
                </p>

                <p className="rule-subheading">Expendable Gu</p>
                <p className="rule-text">
                    Gu with the [Expendable] keyword can be involved in a killer move even if killer moves themselves cannot have the [Expendable] keyword. When you activate the killer move, just expend the [Expendable] Gu as if you had activated it.
                </p>

                <p className="rule-subheading">Shields</p>
                <p className="rule-text">
                    If your killer move has the [Shield] keyword, it has a total pool of hit points equal to the sum of the current hit points of all [Shield] Gu involved; any damage assigned to the killer move's hit points are dealt to the component Gu when you stop deactivating the killer move or if the killer move's hit points are reduced to 0. When this happens, you must assign the damage to any number of [Shield] Gu in the killer move in any way you wish to divide it, but of course you cannot assign more damage to a Gu than its current hit points.
                </p>

                <p className="rule-subheading">Restrictions</p>
                <p className="rule-text">
                    Killer moves cannot be constructed around single-use permanent buffs like Beast Strength Gu to make the permanent effect even stronger. Killer moves also cannot have any of the following keywords: [Defensive] [Expendable] [Extinct] [Fast] [Ingredient] [Low Vitality] [Supplementary] [Unrefinable] [Vital]
                </p>

                <p className="rule-subheading">Deducing a Killer Move</p>
                <p className="rule-text">
                    To deduce a killer move, you must have Fundamental Attainment in the paths of all Core Gu. You should prepare the killer move with the GM first, making sure both of you agree on the Gu used and the final effect. Once you have the killer move prepared, your character has to then spend time experimenting to create the killer move. This takes 8 hours for each unique Gu in the killer move, whether it is core or supplementary. After spending the requisite time practicing, in a single session or multiple, make a Deduction skill test with a +10 penalty for each unique Gu in the killer move beyond 2. If you have a Gu with the [Deductive] keyword, you may deduce the killer move using that Gu to improve your skill test. If you succeed, the killer move is created and you immediately invest experience into any paths the Core Gu belong to equal to the sum of the ranks of all Core Gu belonging to that path. If you had deduced Blood Vision for example, you would invest 8 experience into Blood Path, 4 for each rank 4 core Gu.
                </p>

                <p className="rule-subheading">Constructing the Killer Move</p>
                <p className="rule-text">
                    When you create a killer move, start with a single core Gu to determine the primary effect of the killer move. The type (attack, divination, manifestation, etc.) and keywords of the killer move are identical to the type and keywords of the first core Gu, as is the initial effect. 
                </p>
                <p className="rule-text">
                    When you add another core Gu, the effect is augmented, adding the damage or effect of the added Gu to the effect of the first. If the range of the added Gu is smaller than the range of the first Gu, any damage added is halved (rounded down to a minimum of 1) and any effects with a duration have that duration reduced by half (rounded down to a minimum of 1 turn). If you can justify it, you may also add keywords from added Gu to the killer move.
                </p>
                <p className="rule-text">
                    Many effects are more abstract than just "do X damage" and it is up to you and the GM to determine how certain effects work together while remaining relatively balanced. The GM has the final say on the effect of the killer move, but both of you should feel free to modify the killer move's statistics later if it turns out too strong or too weak.
                </p>

                <p className="rule-subheading">Activating a Killer Move</p>
                <p className="rule-text">
                    Killer moves can be activated with the Activate a Killer Move Combat Action, but can be quite taxing on the soul depending on their complexity. Pick a killer move for which you have all the Gu and enough primeval essence for all activations. For every activation in the killer move over your Activations attribute, take 1 damage to your soul. The killer move activates, applying its effect. If the killer move has the [Sustained] keyword, you take 1 damage to your soul any time you activate a Gu while sustaining the killer move.
                </p>
            </main>
        </div>
    );
};

export default KillerMoves;