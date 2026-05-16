import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const Downtime = () => {
    return (
        <div className="gu-shell">
            <header className="gu-topbar">
                <div>
                    <div className="gu-title">Downtime</div>
                    <div className="gu-subtitle">Master of Gu SRD</div>
                </div>
                <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                    ← Back to Directory
                </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>
                <h1 className="rule-heading">Downtime</h1>
                <p className="rule-text">
                    Gu Masters have many different activities available to them during downtime. Cultivation is described in this chapter, but you can also spend time creating refinement recipes for Gu, improving refinement recipes, actually refining Gu, deducing killer moves, or studying and practicing. Details on refinement recipes and killer moves are given in Chapter 3: Gu.
                </p>

                <p className="rule-subheading">Studying</p>
                <p className="rule-text">
                    To study, you must first acquire a teacher or their recorded instructional material such as a book or Information Path Gu. Your progress is quickened or slowed depending on the quality of your teacher or reading material.
                </p>
                <p className="rule-text">
                    For every 8 hours spent learning with a tutor, you invest 2, 5, or 12 experience, depending on if the teacher has Fundamental, Intermediate, or Master Attainment (respectively) in the path you are trying to learn. You cannot increase your Attainment in this way beyond the threshold of your teacher’s Attainment level.
                </p>
                <p className="rule-text">
                    Skilled tutors are available for hire in most mid to large-sized clans; Those with Fundamental Attainment charge around 50 primeval stones, while those with Intermediate Attainment charge around 200 primeval stones per 8 hour session. Masters of a path are difficult to find, often being highly ranked or very old lone cultivators. Many are in charge of entire forces, and unwilling to teach for mere primeval stones if anything at all. If you do find a master willing to teach you, they will often ask for a favor in return.
                </p>
                <p className="rule-text">
                    When learning a path from recorded material, the experience gained is halved (to a minimum of 1), and is dependent on the Attainment of the author when it was created.
                </p>

                <p className="rule-subheading">Learning Talents</p>
                <p className="rule-text">
                    You can also learn Talents from others as long as they have purchased the Talent and you fulfill any requirements for it. For every 4 hours you spend being instructed, you gain 5 experience that can only be used to purchase the Talent being learned. You must be personally instructed to learn Talents and cannot learn them from books and other recorded material. You can learn Talents and Refinement Techniques in this way, but not Path Attainments.
                </p>

                <p className="rule-subheading">Instructing Others</p>
                <p className="rule-text">
                    Personally instructing others can be fulfilling and a good learning experience. You gain 1 experience every 8 hour session spent teaching an Attainment. When you successfully teach someone else a Talent, you gain 2 experience.
                </p>
            </main>
        </div>
    );
};

export default Downtime;