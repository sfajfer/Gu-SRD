import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../Styles.css';

const Skills = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [hash]);

    return (
        <div className="gu-shell">
            <header className="gu-topbar">
                <div>
                    <div className="gu-title">Skills</div>
                    <div className="gu-subtitle">Master of Gu SRD</div>
                </div>
                <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                    ← Back to Directory
                </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>
                <h1 className="rule-heading">Skills</h1>
                <p className="rule-text">
                    Your character’s Skills represent their learned abilities and proficiencies, whether that be in combat, dialogue, or cultivation. The base value of the skill is dependent on what attribute(s) it is derived from, shown in the parenthesis. Remember to increase your skill values whenever you purchase points in the corresponding Attribute.
                </p>

                <p id="close-combat" className="rule-subheading">Close Combat (1/2 Agi + 1/2 Cog)</p>
                <p className="rule-text">
                    Close Combat does not only include fighting hand-to-hand, it relates to any fighting that occurs within 2 meters of you. Your attack rolls made against targets within 2 meters of you are made with the Close Combat skill. Melee attacks are always made with your Close Combat skill.
                </p>

                <p id="ranged-attack" className="rule-subheading">Ranged Attack (Cog)</p>
                <p className="rule-text">
                    If an enemy is 3 or more meters from you, your non-melee attack rolls are made with the Ranged Attack skill.
                </p>

                <p id="athletics" className="rule-subheading">Athletics (1/2 Str + 1/2 Agi)</p>
                <p className="rule-text">
                    Athletics is used for strength related actions such as pushing a boulder, climbing a steep cliff, or swimming.
                </p>
                <p className="rule-text">
                    <strong>Pushing and Pulling</strong><br />
                    You can push or pull any weight under 100kg without making a test, halving your movement (rounded down) if the weight is over 50kg. Above 100kg you must make an Athletics skill test with a -40 bonus, increased by +10 for every 50kg over 100.
                </p>

                <p id="dodge" className="rule-subheading">Dodge (Agi)</p>
                <p className="rule-text">
                    Dodge is used as a Reaction to avoid attacks made against you, either melee or ranged.
                </p>
                <p className="rule-text">
                    When you succeed a Dodge skill test, you MUST move at least 1 meter and at most 1/2 your movement (rounded down) in any direction.
                </p>

                <p id="flying" className="rule-subheading">Flying (Agi)</p>
                <p className="rule-text">
                    A Gu Master may live his entire life without taking to the skies, but to those that do, this skill is a necessity. Without a decent Flying skill, a Gu Master can be easier to hit in the air than they would be on the ground.
                </p>

                <p id="refinement" className="rule-subheading">Refinement (Wis)</p>
                <p className="rule-text">
                    Even with a complete recipe, refining Gu is an arduous process, requiring precision and constant vigilance. When refinement fails it triggers a backlash which can hurt or even kill you and your Gu. Your Refinement skill determines how complex of recipes you can follow, and how often your refinement fails.
                </p>

                <p id="deduction" className="rule-subheading">Deduction (Cog)</p>
                <p className="rule-text">
                    Deduction is used to create and refine Gu recipes as well as to develop killer moves; the combination of multiple Gu used simultaneously to deliver a very potent effect. It can also be used to investigate your surroundings for clues.
                </p>
                <p className="rule-text">
                    Some Gu have the [Deductive] keyword. When activated, these Gu unlock a special Deduction action. To take it, you must spend an hour deducing a specific subject and make a Deduction skill test. Penalties and Bonuses are determined by the amount of supporting information available to you. The subject can be something that occured in the past, such as who might have committed a murder, or something happening in the present or future, like why a rival clan purchased a huge amount of an unusual refinement material. Deductions cannot create information out of thin air, and a success does not necessarily mean your deduction is correct if you lack a key piece of evidence. For every degree of success on the check, however, you gain one additional conclusion about the subject.
                </p>

                <p id="persuasion" className="rule-subheading">Persuasion (Att)</p>
                <p className="rule-text">
                    Persusasion can only be used on non-player characters. Persuasion skill tests are used to sway a character through your words.
                </p>

                <p id="deception" className="rule-subheading">Deception (Att)</p>
                <p className="rule-text">
                    Deception can only be used on non-player characters. Your ability to manipulate and deceive others.
                </p>

                <p id="intimidation" className="rule-subheading">Intimidation (Att)</p>
                <p className="rule-text">
                    Intimidation can only be used on non-player characters.
                </p>

                <p id="haggle" className="rule-subheading">Haggle (Att)</p>
                <p className="rule-text">
                    Haggle can only be used on non-player characters. Difficulty is based on the target’s feelings towards you with a baseline of (+20), and grants a discount on a purchase of 5% for every degree of success on the test. A critical counts as an additional degree of success.
                </p>

                <p id="insight" className="rule-subheading">Insight (Wis)</p>
                <p className="rule-text">
                    Used to judge a character’s body language and intonation. A successful Insight test involves learning a character’s intention and scrutinizing their body language, and in most cases will not straight up say whether a character is lying or not.
                </p>

                <p id="awareness" className="rule-subheading">Awareness (Wis)</p>
                <p className="rule-text">
                    Your ability to notice things in the environment. If you’re meticulously searching an area, use Deduction, but to notice an out of place detail while walking past a building you would use Awareness.
                </p>
                <p className="rule-text">
                    When you do something sneaky in front of someone, such as trying to steal something out of their pockets, they make an Awareness skill test, noticing you on a success. Creatures can only make Awareness skill tests to notice a creature if they are able to sense them; If an invisible creature tries to sneak up behind you, you could still make an Awareness skill test as long as the creature is making sound. If they're walking on a creaky floorboard, you could have a -40 bonus, but on soft soil it could be as bad as a +40 penalty. If an inaudible creature was sneaking up behind you though, you would not have an opportunity to make the Awareness skill test since you can't see or hear them. Awareness does include smell, but you can only make a smell-based Awareness skill test to detect a creature if the target is very smelly or if your sense of smell is augmented to be stronger.
                </p>
                <p className="rule-text">
                    Succeeding an Awareness skill test to detect an invisible creature only informs you of their presence; you are aware another creature is present and know their general direction, but not their exact square.
                </p>

                <p id="cultivation" className="rule-subheading">Cultivation (Wis)</p>
                <p className="rule-text">
                    The higher your Cultivation skill, the less damage you will take to your soul during cultivation, and the quicker your cultivation will increase.
                </p>

                <p id="knowledge" className="rule-subheading">Knowledge (Cog)</p>
                <p className="rule-text">
                    Knowledge is separated into a few categories:<br />
                    •    Gu - There are an uncountable number of different Gu in the world, and this skill helps to identify them. In a fight, it can mean life or death.<br />
                    •    Southern Border - Your understanding of the geography, flora, and fauna of Southern Border. It can be assumed that all characters will have knowledge of the areas surrounding their clan, but when journeying beyond familiarity this skill can be used to identify beasts, plants, and natural formations.<br />
                    •    Clans - Small, medium, large, and super-sized clans dot the mountains and valleys of Southern Border. This skill represents your knowledge of their names, power structures, specialties, and commerce.
                </p>
            </main>
        </div>
    );
};

export default Skills;