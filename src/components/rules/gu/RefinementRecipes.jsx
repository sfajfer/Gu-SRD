import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const RefinementRecipes = () => {
    const costData = [
        { rank: "1",  cost: "150 Primeval Stones" },
        { rank: "2",  cost: "750 Primeval Stones" },
        { rank: "3",  cost: "7,500 Primeval Stones + 1 Rank 3 Refinement Material" },
        { rank: "4",  cost: "75,000 Primeval Stones + 2 Rank 4 Refinement Materials" },
        { rank: "5",  cost: "1,500,000 Primeval Stones + 2 Rank 5 Refinement Materials" },
    ];

    const recipeCreationData = [
        { rank: "1", mod: "-20", cost: "800" },
        { rank: "2", mod: "0", cost: "8,000" },
        { rank: "3", mod: "+20", cost: "80,000" },
        { rank: "4", mod: "+40", cost: "600,000" },
        { rank: "5", mod: "+60", cost: "4,000,000" },
    ];

    return (
        <div className="gu-shell">
            <header className="gu-topbar">
                <div>
                    <div className="gu-title">Refinement Recipes</div>
                    <div className="gu-subtitle">Master of Gu SRD</div>
                </div>
                <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                    ← Back to Directory
                </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>
                <h1 className="rule-heading">Refinement Recipes</h1>

                <p className="rule-text" style={{fontStyle: 'italic', color: 'gray'}}> Note: Curly braces in this section refer to the rank of the Gu recipe. {"{1, 2, 3, 4, 5}"} means 1 if the recipe is rank 1, 2 if the recipe is rank 2, and so on.</p>
                
                <p className="rule-subheading">Following a Recipe</p>
                <p className="rule-text">
                    Refinement recipes will have many required materials. Common materials are included in the recipe’s primeval stone cost, assuming you have access to a market to purchase the materials. Rarer materials will be specified, and you may have to seek out a seller or go find these materials yourself. When you successfully refine a Gu that you have never refined before, you immediately invest {"{0, 1, 2, 3, 4}"} experience into your Attainment in the path of the Gu.
                </p>
                <p className="rule-text">
                    To begin refinement, you must have all the necessary materials on hand. If you know any refinement techniques (see ch.2 - Talents) you may select one. Make a Refinement skill test with a penalty or bonus according to the recipe’s difficulty. If you’ve already successfully refined the Gu before, you gain a -20 bonus on the test. On a success, roll the failure die. If the number rolled is anything except a 1, you have succeeded in creating the Gu. If you do roll a 1, the refinement fails, representing the flat chance of failure all refinement recipes have.
                </p>
                <p className="rule-text">
                    On a failure, you lose all non-Gu refinement materials used in the refinement; you and all Gu being used in the refinement process take a backlash. If the failure was caused by a 1 on the failure die, the backlash is negated. Otherwise, you take damage to your soul equal to the degrees of failure. Every Gu being used in the refinement takes the same amount of damage to their health. If your Vital Gu would be killed in this manner, instead it drops to 1 hit point.
                </p>
                <p className="rule-text">
                    Refinement is an extremely precise and involved effort. For every 4 hours you spend refining Gu without a rest, you take 1 damage to your soul as you become fatigued.
                </p>

                <p className="rule-subheading">Creating a Recipe</p>
                <p className="rule-text">
                    Creating a recipe is a collaborative effort between the player and GM. You should first approach the GM with the Gu you want to create a recipe for. This can be a Gu from the Gu Index or a unique Gu that the GM has approved, but you must have at least Intermediate Attainment in the path of the Gu. When you successfully create the recipe of a Gu, you immediately invest {"{1, 2, 4, 8, 20}"} experience into your Attainment in the path of the Gu.
                </p>
                <p className="rule-text">
                    You must spend a number of primeval stones on refinement materials and {"{8, 16, 24, 32, 40}"} hours practicing and experimenting; this time does not need to be sequential however. After spending the requisite time, make a Refinement skill test with a bonus or penalty according to the following table:
                </p>

                <div className="gu-table-wrap" style={{ marginTop: '20px', marginBottom: '30px' }}>
                    <table className="gu-table">
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: '#e67e22', color: 'black', textAlign: 'center' }}>Rank</th>
                                <th style={{ backgroundColor: '#2980b9', color: 'black', textAlign: 'center' }}>Bonus/Penalty</th>
                                <th style={{ backgroundColor: '#3095d8', color: 'black', textAlign: 'center' }}>PS Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recipeCreationData.map((row, idx) => (
                                <tr key={idx} className="gu-row">
                                    <td style={{ textAlign: 'center' }}>{row.rank}</td>
                                    <td style={{ textAlign: 'center' }}>{row.mod}</td>
                                    <td style={{ textAlign: 'center' }}>{row.cost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="rule-text">
                    Alternatively, if you have a Gu with the [Deductive] keyword you may use the Deduction action to deduce the recipe. You still must meet the Attainment requirements, and also must have a Refinement skill of {"{20, 30, 40, 60, 80}"} to attempt to create a recipe with the Deduction action.
                </p>
                <p className="rule-text">
                    If you succeed the skill test, a recipe for the Gu is created. All that is left to do is actually design the recipe. The recipe begins with the following statistics and you can improve it by spending Recipe Points.
                </p>

                {/* Sample Recipe block formatted as separate paragraphs with spacing */}
                <p className="rule-text" style={{ fontWeight: 'bold', fontSize: '1.2rem', marginTop: '25px', color: '#c19b41' }}>
                    Sample Recipe
                </p>
                <p className="rule-text">
                    Sample Gu
                </p>
                <p className="rule-text">
                    Rank: {"{1, 2, 3, 4, 5}"}
                </p>
                <p className="rule-text">
                    Cost:
                </p>
                <div className="gu-table-wrap" style={{ margin: '20px 0' }}>
                    <table className="gu-table">
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: '#e67e22', color: 'black', textAlign: 'center' }}>Rank</th>
                                <th style={{ backgroundColor: '#3095d8', color: 'black', textAlign: 'center' }}>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {costData.map((row, idx) => (
                                <tr key={idx} className="gu-row">
                                    <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{row.rank}</td>
                                    <td style={{ paddingLeft: '15px' }}>
                                        <span style={{ opacity: 0.8, fontStyle: 'italic', marginLeft: '8px' }}>
                                            {row.cost}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="rule-text">
                    Additional Gu: If this recipe upgrades a Gu to the next rank, that Gu goes here. You may also forcefully add a Gu to the refinement recipe so long as it is of the same path as the Gu being refined. If you do so, you gain 1 Recipe Point if the Gu is of rank {"{N/A, 1, 2, 3, 4}"} or 3 Recipe Points if the Gu is of rank {"{1, 2, 3, 4, 5}"}. You cannot add a Gu of higher rank into the refinement recipe.
                </p>
                <p className="rule-text">
                    Duration: 16 hours
                </p>
                <p className="rule-text">
                    Difficulty: {"{+10, +20, +40, +60, +100}"}
                </p>
                <p className="rule-text" style={{ marginBottom: '20px' }}>
                    Failure Die: {"{d4, d4, d4, d2, d2}"}
                </p>

                <p className="rule-text">
                    When you succeed in deducing a recipe you have a number of Recipe Points equal to your degrees of success on the test, with a critical success counting as an additional degree of success. Spending a Recipe Point on the recipe does one of the following:
                </p>
                <p className="rule-text">
                    •    The failure die is increased by one step; d2 -&gt; d4 -&gt; d6 -&gt; d8 -&gt; d10 -&gt; d12 -&gt; d20 -&gt; d100<br />
                    •    The difficulty is reduced by 10<br />
                    •    The primeval stone cost is reduced by 25% (rounded down)<br />
                    •    The duration is reduced by 4 hours (to a minimum of 1 hour)
                </p>
                <p className="rule-text">
                    Once you have spent all Recipe Points, the recipe is complete!
                </p>

                <p className="rule-subheading">Improving a Recipe</p>
                <p className="rule-text">
                    You can leverage your Refinement skill to reduce the cost, duration, difficulty, or failure rate of any Gu recipe. To do so, you must have Fundamental Attainment (see ch.2 - Talents) in the path of the Gu in question. When you successfully improve the recipe of a Gu, you immediately invest {"{1, 1, 2, 4, 8}"} experience into your Attainment in the path of the Gu.
                </p>
                <p className="rule-text">
                    Start by paying 4 times the total cost of the recipe, to represent the materials needed to practice and attempt to improve the recipe. You must also spend an amount of time equal to 4 times the duration of the recipe in refinement. This time does not need to be sequential, and you can take breaks as long as you need and however often you need. Then, make a Refinement skill test with a {"{-40, -20, 0, +20, +40}"} modifier. On a fumble, you do not succeed in improving the recipe and take damage to your soul equal to the degrees of failure multiplied by the rank of the recipe. On a failure, you do not succeed in improving the recipe, but don’t face a backlash. On a success, you make a breakthrough and gain a new recipe for the Gu, with one of the following improvements:
                </p>
                <p className="rule-text" style={{ paddingLeft: '20px' }}>
                    •    The failure die is increased by one step; d2 -&gt; d4 -&gt; d6 -&gt; d8 -&gt; d10 -&gt; d12 -&gt; d20 -&gt; d100<br />
                    •    The difficulty is reduced by 10<br />
                    •    The primeval stone cost is reduced by 25% (rounded down)<br />
                    •    The duration is reduced by 4 hours
                </p>
                <p className="rule-text">
                    If you roll a critical on your test, you may make two improvements instead of one. The recipe you’ve created is different from the previous one, and both can still be used and sold. You can improve a recipe a number of times equal to 5% of your Refinement skill, rounded down.
                </p>
                <p className="rule-text">
                    Alternatively, if you have a Gu with the [Deductive] keyword you may use the Deduction action to improve the recipe. You still must meet the Attainment requirements, and also must have a Refinement skill of {"{20, 20, 30, 40, 50}"} to attempt to improve a recipe with the Deduction action. This process takes {"{2, 4, 8, 12, 16}"} hours to perform.
                </p>
            </main>
        </div>
    );
};

export default RefinementRecipes;