import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const Attributes = () => {
    return (
        <div className="gu-shell">
            <header className="gu-topbar">
                <div>
                    <div className="gu-title">Attributes</div>
                    <div className="gu-subtitle">Master of Gu SRD</div>
                </div>
                <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                    ← Back to Directory
                </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>
                <h1 className="rule-heading">Attributes</h1>

                <p className="rule-subheading">Primary Attributes</p>
                <p className="rule-text">
                    Primary attributes are a generalized measure of your body and mind. The base values of each of your skills are derived from these attributes. All Attribute scores start at 20 before you spend any experience to improve them. Improving an attribute also increases the value of all derived <Link className="rule-link" to="/rules/skills">skills</Link> and secondary attributes.
                </p>
                <p className="rule-text">
                    <strong className="rule-bold">Agility</strong> - Agility is used to dodge attacks, fight in close quarters, and to maneuver in the air. Every 20 points of Agility increases your Movement and the number of Reactions you can take each turn by 1.
                </p>
                <p className="rule-text">
                    <strong className="rule-bold">Fortitude</strong> - Fortitude determines your Hit Points, Strength, and is a major factor in your Perseverance.
                </p>
                <p className="rule-text">
                    <strong className="rule-bold">Cognition</strong> - The speed at which you think and make decisions. Used to create killer moves, refinement recipes, and to fight in ranged combat. Every 20 points of Cognition increases the number of Gu you can activate each turn by 1.
                </p>
                <p className="rule-text">
                    <strong className="rule-bold">Wisdom</strong> - Wisdom increases your speed of cultivation, how often you succeed when refining Gu, and <Link className="rule-link" to="/rules/skills#atwareness">Awareness</Link> of your surroundings. It also represents your accumulated knowledge of the world. Every 20 points of Wisdom increases the number of Gu you can activate each turn by 1.
                </p>
                <p className="rule-text">
                    <strong className="rule-bold">Attitude</strong> - Attitude represents your understanding of human nature, relationships, and emotions. A higher attitude makes it easier to deceive and persuade others, and to know when others are deceiving you. It also is a minor factor in your Perseverance and determines how strong your Soul is.
                </p>

                <p className="rule-subheading">Secondary Attributes</p>
                <p className="rule-text">
                    Secondary attributes either have a flat base value or are derived from your primary attributes.
                </p>
                <p className="rule-text">
                    <strong className="rule-bold" style={{ color: '#be3030' }}>Health</strong> - You have a pool of Hit Points equal to your Fortitude. You can read about how damage, dying, and injury works in <Link className="rule-link" to="/rules/combat">Combat</Link>.
                </p>
                <p className="rule-text">
                    <strong className="rule-bold">Movement</strong> - Your Movement is the number of meters you can move in a turn. Your Movement is 4 meters + 5% of your Agility (rounded down).
                </p>
                <p className="rule-text">
                    <strong className="rule-bold">Strength</strong> - Your body’s physical power. Strength is often overlooked by Gu Masters, as even rank 1 Gu can overpower the strongest of mortals. But battles are unpredictable, and when primeval essence runs dry Gu Masters may resort to a fistfight. Though this statistic is more relevant at rank 1, some Gu Masters choose to use Gu to enhance their strength and rely on their own muscles to pound their enemies into meat paste. Your Strength score begins equal to your Fortitude and affects the amount of damage you deal with attacks where your physical strength is a factor.
                </p>
                <p className="rule-text">
                    If your Strength attribute is ever reduced to 0, you immediately fall unconscious. If it remains 0 for a minute straight, you die.
                </p>
                <p className="rule-text">
                    <strong className="rule-bold">Perseverance</strong> - Your Perseverance is your ability to endure great pain and stress, and is equal to the sum of your Fortitude and half of your Attitude, rounded down. Perseverance is rolled when you hit 0 Hit Points.
                </p>
                <p className="rule-text">
                    <strong className="rule-bold" style={{ color: '#603dd4' }}>Soul</strong> - Your Soul score is a literal representation of the strength of your soul. Your starting Soul value is 6 + 20% of your Attitude, and if your current soul is ever less than half of its maximum (rounded down), you have the fatigued condition until your soul is restored to at least half strength. Refining Gu, cultivating, and controlling beast groups all drain the strength of your soul, while sleeping restores it. Many Soul Path Gu also use the strength of your soul to determine their strength when activated. If your current soul ever hits 0 points, you die. When you sleep, your soul recovers 10% of its maximum (rounded down) for every hour spent sleeping. Sleeping for at least 10 hours fully rejuvenates your soul, regardless of rounding.
                </p>
                <p className="rule-text">
                    Your base soul value is 6 + 20% of your Attitude, and represents the single-man soul. Many Soul Path Gu can strengthen your soul and increase this value. Whenever your soul takes half or more of its maximum value in soul damage (rounded down) on a single turn, roll 1d6 and reduce the maximum value of your soul by that amount.
                </p>
                <p className="rule-text">
                    When your soul reaches strength 100, you have the ten-man soul. It has the proper strength to sustain damage; you no longer lose maximum soul when you take more than half of your soul's maximum in soul damage.
                </p>
                <p className="rule-text">
                    When your soul reaches strength 1,000, you have the hundred-man soul. If you have not refined your soul using Gu, this is the maximum strength achievable. If your soul increases in strength above 1009 without being refined, your soul explodes and you die, with resurrection being impossible.
                </p>
                <p className="rule-text">
                    When your soul reaches strength 10,000, you have the thousand-man soul. This is the limit for mortal Gu Masters and cannot be raised higher.
                </p>
                <p className="rule-text">
                    <strong className="rule-bold">Luck</strong> - Players begin with 1 maximum luck point. Luck can be spent to force you or another creature to reroll a skill test directly after the roll, or to add a -50 bonus to a skill test you’re making, before the roll. If you’ve expended a luck point on a skill test, you cannot spend another on the same skill test. You regain luck points up to your maximum at the start of each session.
                </p>
                <p className="rule-text">
                    Non-player characters do not usually have any luck points, but feel free to give tougher enemies one or even multiple if they're meant to be especially strong.
                </p>
                <p className="rule-text">
                    <strong className="rule-bold">Activations</strong> - When you take the Activate Gu Combat Action, you can activate a number of Gu equal to your Activations. You have a number of Activations equal to 5% of (Cognition + Wisdom), rounding down to a minimum of 1.
                </p>
                <p className="rule-text">
                    <strong className="rule-bold">Reactions</strong> - Reactions are a major factor in combat, and you can make up to 1 + 5% of your Agility (rounded down) Reactions each turn. Reactions can be used to dodge attacks, counterattack, and to activate certain Gu in response to an enemy’s actions.
                </p>
                <p className="rule-text">
                    <strong className="rule-bold">Aptitude</strong> - Your Gu Master’s aptitude is incredibly important to their cultivation and battle strength. A higher aptitude means greater primeval essence, meaning your Gu Master can fight for longer and cultivate quicker. Aptitude is mostly immutable, but some Gu exist to raise or even lower a Gu Master’s aptitude.
                </p>
                <p className="rule-text">
                    Choosing your Gu Master’s aptitude is a decision that will significantly shape their journey. Higher aptitudes offer undeniable advantages in cultivation speed, primeval essence, and clan support, but they come with the heavy burdens of increased clan expectations, heightened scrutiny, and potential danger. Lower aptitudes, while slower in cultivation, afford your Gu Master greater freedom, fewer obligations, and opportunities to forge their own path.
                </p>
                <p className="rule-text">
                    It is also worth considering the other players in your group. If one player is an A-grade aptitude and another is D-grade, your ranks will most likely diverge dramatically in the early to mid stages. This difference is not insurmountable, but it may not be enjoyable for the weaker Gu Master. It’s recommended for the group to decide on 2 adjacent grades and have each player pick one of the two.
                </p>
                <p className="rule-text">
                    Aptitude is just an arbitrary grading of the amount of primeval essence a Gu Master’s aperture can store. After choosing your aptitude, roll a d20, subtract 1 from the result, and add it to the minimum essence percentage of your grade to determine your personal maximum primeval essence.
                </p>
                <p className="rule-text">
                    For example, Shang Liu chooses A-grade aptitude and rolls a 4 on his d20. Subtract 1 to get 3 and add that to the minimum of 80%. Shang Liu therefore has 83% as his maximum.
                </p>
                <p className="rule-text" style={{ fontWeight: 'bold', textIndent: '0' }}>
                    Grade - A: 80%-99%<br/>
                    Grade - B: 60%-79%<br/>
                    Grade - C: 40%-59%<br/>
                    Grade - D: 20%-39%
                </p>
            </main>
        </div>
    );
};

export default Attributes;