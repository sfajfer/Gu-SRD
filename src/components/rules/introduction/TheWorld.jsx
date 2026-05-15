import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const TheWorld = () => {
    return (
        <div className="gu-shell">
            <header className="gu-topbar">
            <div>
                <div className="gu-title">The World</div>
                <div className="gu-subtitle">Master of Gu SRD</div>
            </div>
            <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                ← Back to Directory
            </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>

                <h1 className="rule-heading">The World</h1>
                <p className="rule-text">
                    The Gu world is a massive, flat disc, consisting of 5 regions. The source material is pretty inconsistent with size, but it is safe to say each region is at least 6 or 7 times the surface area of the Earth. 
                        •	Northern Plains: Flat grassland dotted with nomadic tribes of various sizes. Conflict is commonplace and the Gu Masters here are the most adept at fighting.
                        •	Western Desert: A dry wasteland with cities gathered around its oases. Lone cultivators are very uncommon.
                        •	Southern Border: An uneven, mountainous region with familial clans settling on mountainsides. The setting of this system.
                        •	Eastern Sea: Vast ocean dotted with archipelagos. Conflict is less common due to difficulty in reaching other settlements, allowing its inhabitants to focus on cultivation and gaining wealth. Many lone cultivators.
                        •	Central Continent: The most powerful of the five regions and home to the Heavenly Court. Has a mix of the other four regions’ geography (i.e. a normal continent).
                </p>
                <p className="rule-text">
                    Since the world is a disc, Southern Border does not border Northern Plains, but it does border the other regions. The same goes for the other outer regions, with only Central Continent connecting to all of them.
                </p>
                <p className="rule-subheading">Mortals</p>
                    <p className="rule-text">
                    People without an awakened aperture cannot use Gu. Their status is very low, and in most places a Gu Master can outright kill any mortals that disrespect them. Despite that, mortals do a great deal of work to provide food and resources to the clan, and cannot be wantonly murdered without reproach from righteous path forces.
                </p>
                <p className="rule-subheading">Righteous and Demonic</p>
                    
                <p className="rule-text">
                    Gu Masters identify as part of either the demonic path or righteous path. Demonic does not necessarily mean evil, just that the Gu Master does not follow the rigid systems of community. Of course, many demonic path Gu Masters ARE evil and more than willing to hurt the innocent to further their own goals. Similarly, righteous path Gu Masters are not necessarily good, they just follow the rules of society. While many have ideals of justice and virtue, the more powerful righteous path Gu Masters exploit this societal responsibility for their own gain, and are often willing to commit evil deeds to further their goals, just in more subtle ways than the demonic path.
                </p>
                <p className="rule-subheading">Inheritances</p>
                <p className="rule-text">
                    Inheritances are a common aspect of the Gu World’s culture; a Gu Master’s ideals can live on long after their death by leaving an inheritance of Gu, refinement recipes, and information to be found in the future. Some inheritances are fraught with difficulty, fully capable of killing those that seek to claim them. Others are safe but with measures to ensure the inheritor is someone worthy of the prize. Sometimes a Gu Master just leaves some Gu in a cave with food and hopes for the best.
                </p>
            </main>
        </div>
    );
};

export default TheWorld;