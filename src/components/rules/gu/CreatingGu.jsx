import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const CreatingGu = () => {
    return (
        <div className="gu-shell">
            <header className="gu-topbar">
                <div>
                    <div className="gu-title">Creating Unique Gu</div>
                    <div className="gu-subtitle">Master of Gu SRD</div>
                </div>
                <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                    ← Back to Directory
                </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>
                <h1 className="rule-heading">Creating Unique Gu</h1>
                
                <p className="rule-text">
                    While I’ve made an expansive list of many of the Gu paths, in reality there is a basically unlimited number of Gu. Once you’re more familiar with the system and balance, you’re encouraged to make your own Gu. Here are some guidelines;
                </p>

                <p className="rule-text" style={{ paddingLeft: '20px' }}>
                    • Gu type (attack, guard, celerity, etc.) has no mechanical effect and only exists for easier categorization.<br /><br />
                    • Rank 5 Gu are at the peak of the mortal realm, and have the power to clear sections of a battlefield single handedly, while rank 1 Gu are sometimes strong enough to kill a person. Keep in mind that a Gu of higher rank should have an advantage over lower ranked Gu.<br /><br />
                    • The rules already account for the differing primeval essence quality between ranks. Costs are proportional to the power of the Gu within its rank. A rank 1 Gu with a high cost can be similar in strength to a rank 2 Gu with low cost.<br /><br />
                    • Health is usually only relevant to Gu with the [Shield] or [Steed] keywords or for refinement. Gu with higher health are more likely to survive backlash from refinement and are thus more viable for improvement. Most Gu should have between 1-6 health, but [Shield] Gu start from 40-80 health at rank 1 and scale to 1000-1500 at rank 5, fluctuating based on the defensive strength of the path and any weaknesses or strengths the Gu has.<br /><br />
                    • Range can be Self, Touch, or a distance in meters.<br /><br />
                    • Duration can be permanent or have a specified duration. Duration can be in the form of time (minutes/hours/days/years) or with respect to the turn. If the Gu applies an effect for 1 turn, its typically better to say “until the end of your/their next turn.” This is because the number of turns remaining on an effect ticks down at the end of the creature’s turn; if you buff yourself on your turn, and the duration of the effect is 1 turn, it would disappear at the end of your turn.<br /><br />
                    • Overall, the strength of the Gu should be relative to all these factors. If it is more expensive in primeval essence, has a short range, eats expensive food, and/or has major drawbacks to its use, the power of the Gu should be increased relatively. This can mean more damage, more health (for [Shield] Gu), making the Gu harder to counter, and so on. A Gu that costs 2 portions, eats dirt, and affects 1km better have a much weaker effect than other Gu in its rank. Adding the [Expendable] or [Low Vitality] keywords can also be used to balance a Gu that’s on the stronger side.
                </p>

                <p className="rule-text" style={{ marginTop: '20px' }}>
                    Most importantly, be creative! There is a Gu for any purpose you can think of. There are Gu suited to cure any affliction, make any attack, cause any event that you can think of. Some Gu might seem practically useless, but they can always be used to improve some killer move or refine a new Gu.
                </p>
            </main>
        </div>
    );
};

export default CreatingGu;