import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

const Gu = () => {
        const priceData = [
        { rank: "1", price: "100" },
        { rank: "2", price: "500" },
        { rank: "3",  price: "5,000" },
        { rank: "4",  price: "50,000" },
        { rank: "5",  price: "1,000,000+" },
    ];

    const foodData = [
        { rank: "1", int: "1 session" },
        { rank: "2", int: "2 sessions" },
        { rank: "3",  int: "3 sessions" },
        { rank: "4",  int: "5 sessions" },
        { rank: "5",  int: "10 sessions" },
    ];

    return (
        <div className="gu-shell">
            <header className="gu-topbar">
                <div>
                    <div className="gu-title">Gu</div>
                    <div className="gu-subtitle">Master of Gu SRD</div>
                </div>
                <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                    ← Back to Directory
                </Link>
            </header>

            <main className="gu-main" style={{ padding: '20px' }}>
                <h1 className="rule-heading">Gu</h1>
                <p className="rule-text">
                    Humans are the spirit of all living beings and Gu are the essence of Heaven and Earth. Mortal Gu represent fragments of the great Dao, or laws of Heaven, and are ranked from 1 to 5, just like mortal Gu Masters. Gu come in many different forms, with bugs being a common motif, but there are just as many that take the forms of beasts and objects. Gu can be either wild or refined; wild Gu usually refers to those birthed from natural primeval essence. These can come into being in any manner of places as long as the conditions are right. Sometimes they are carried by beasts, or roaming the earth alone, or staying sedentary in the place they were born. Refined Gu are those under the direct control of a Gu Master. They obey the user’s commands without fail, even destroying themselves with a single thought. The Gu Master can acquire refined Gu by refining wild Gu, creating them themselves using their Refinement skill, or acquiring them from others. Refined Gu may become wild Gu if their master is killed, but this process takes some time.
                </p>
                <p className="rule-text">
                    Gu are separated into different categories based on the effect created when they are activated. These categories have minimal mechanical importance but give a good idea of the Gu’s purpose.
                </p>

                <p className="rule-text" style={{ paddingLeft: '20px' }}>
                    • <strong>Attack</strong> - Shooting a blade, controlling someone’s mind, or softening a person’s bones are all attacks. If the primary use of the Gu is to kill or apply negative effects to a person against their will, it is an attack.<br />
                    • <strong>Manifestation</strong> - Creates an object under the user’s control. Can be permanent or temporary.<br />
                    • <strong>Guard</strong> - Forms a defensive barrier with the primary focus being blocking attacks.<br />
                    • <strong>Celerity</strong> - Enhances speed or maneuverability.<br />
                    • <strong>Divination</strong> - Gathers information, whether from a short distance or across the continent. Investigative Gu that increase a user’s perception are included, as well as those that surveil areas, probe into people’s minds, or improve your deduction skills.<br />
                    • <strong>Concealment</strong> - Hides the user’s presence in any number of ways.<br />
                    • <strong>Tonic</strong> - Gu with a restorative effect. There exist tonic Gu for humans, beasts, and even other Gu.<br />
                    • <strong>Container</strong> - If objects can be placed inside, the Gu is typically a container. They can store objects, gu, and sometimes even people. Convenient for storing items and resources safely within your aperture.<br />
                    • <strong>Catalyst</strong> - A catch-all category for Gu that can be used to supplement other Gu and actions. Gu that increase the likelihood of refinement success, improve cultivation speed, or amplify the effects of other Gu are all catalysts.<br />
                    • <strong>Carver</strong> - Carves dao semi-permanently into the recipient. The most common carvers belong to strength and information path, used to increase a user’s strength and create binding agreements, respectively.
                </p>

                <p className="rule-text" style={{ marginTop: '25px' }}>
                    Below is a sample statblock for the rank 1 Moonlight Gu. This is the signature Gu of the Gu Yue clan, and cannot be found anywhere else in Southern Border.
                </p>

                <p className="rule-text" style={{ fontWeight: 'bold', fontSize: '1.2rem', marginTop: '20px', color: '#c19b41' }}>
                    Moonlight Gu
                </p>
                <p className="rule-text">
                    Rank 1 Attack <span style={{ color: 'gray', fontStyle: 'italic' }}>(This signifies that the Gu is of Rank 1, and is an Attack-type Gu)</span>
                </p>
                <p className="rule-text">
                    Cost: 5 portions <span style={{ color: 'gray', fontStyle: 'italic' }}>(This Gu costs 5 portions to activate for a rank 1 Gu Master. Rank 2 and above Gu Masters instead only spend 1 portion)</span>
                </p>
                <p className="rule-text">
                    Range: 10 meters
                </p>
                <p className="rule-text">
                    Health: 2 <span style={{ color: 'gray', fontStyle: 'italic' }}>(This Gu has 2 health. If it hits 0, it dies)</span>
                </p>
                <p className="rule-text">
                    Food: Moon orchid petals (3 primeval stones) <span style={{ color: 'gray', fontStyle: 'italic' }}>(This gu eats moon orchid petals. Since it is a rank 1 Gu, it eats at the end of every session. When you have access to a market, you can substitute the materials with 3 primeval stones.)</span>
                </p>
                <p className="rule-text">
                    Effect: You hurl a flat, crescent-shaped beam of light. Make an attack roll with a -10 bonus. On a hit, deal 6 rending damage.
                </p>

                <p className="rule-subheading">Vital Gu</p>
                <p className="rule-text">
                    The first Gu you refine gains the [Vital] keyword and becomes your Vital Gu. Yours and your Vital Gu’s lifeforces are connected, and if your Vital Gu should die, you would as well. The Vital Gu has a major advantage, however; It cannot die due to backlash during refinement, instead dropping to 1 hp and being unusable in refinement until its hit points are restored to their maximum. This makes your Vital Gu a very important choice for progression, as you can attempt to refine it to a higher rank many times without worrying about its death.
                </p>
                <p className="rule-text">
                    To change your Vital Gu, you must spend a day in closed cultivation with the new Gu. When you change your Vital Gu, your current hit points are reduced to 1 as you suffer backlash. Your Vital Gu can be of any rank.
                </p>

                <p className="rule-subheading">Rank</p>
                <p className="rule-text">
                    Mortal Gu have a rank of 1-5. Some Gu exist only at a single rank, others are found at several ranks, and others can only be raised in rank through refinement. For example, the rank 1 Dog Enslavement Gu can enslave a single dog. Rank 2 dog enslavement Gu can enslave a Hundred Beast King dog, rank 3 can enslave a Thousand Beast King dog, and so on, with each being found on increasingly strong dogs. The higher the rank of the Gu, the rarer it is, and their strength increases exponentially.
                </p>
                <p className="rule-text">
                    Gu above rank 5 are called Immortal Gu. Most can only be activated with Immortal Essence, though a few have other costs that can be paid by mortals. Forgetting mortal Gu Masters, even Rank 6 Gu Masters may live their entire life without owning an Immortal Gu. Each one is unique, and for however long it exists in the world, nobody else can refine a copy. When one appears, many Gu Immortals will fight to the death to get their hands on it, and when they fight, many tens of thousands of mortals can and do die in the crossfire.
                </p>

                <p className="rule-subheading">Series</p>
                <p className="rule-text">
                    Some Gu belong to a series that spans multiple ranks. Some have additional effects based on their rank and will be listed separately. Others just scale up in numbers and will be under the same listing. If several values are inside curly braces, they represent the value at different ranks. If a Gu exists at ranks 3-5 and creates {"{1, 10, 100}"} fireballs, then it creates 1 fireball at rank 3, 10 at rank 4, and 100 at rank 5.
                </p>

                <p className="rule-subheading">Price</p>
                <p className="rule-text">
                    Price is largely dependent on the rank of the Gu in question, but the market also needs to be considered. Relic Gu, for example, are quite rare and of an enormous help to a Gu Master’s cultivation, which makes them significantly more expensive than other Gu of the same rank. Smelly Fart Gu, on the other hand, is practically worthless except as a refinement material, and thus would be cheaper than other Gu of the same rank. Use the prices below as a starting point.
                </p>
                
                <div className="gu-table-wrap" style={{ margin: '20px 0' }}>
                    <table className="gu-table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Price (Primeval Stones)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {priceData.map((row, idx) => (
                                <tr key={idx} className="gu-row">
                                    <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{row.rank}</td>
                                    <td style={{ paddingLeft: '15px' }}>
                                        <span style={{ opacity: 0.8, fontStyle: 'italic', marginLeft: '8px' }}>
                                            {row.price}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="rule-text">
                    Rank 4 and rank 5 Gu are significantly rarer than Gu of rank 1 to 3. It may be difficult to find a seller, and you may even encounter schemes and resistances from your opposition when trying to buy them.
                </p>

                <p className="rule-subheading">Primeval Essence Costs</p>
                <p className="rule-text">
                    Gu statblocks will have a number of portions it costs to activate. This assumes you are of the same rank as the Gu. If your rank is lower than the Gu, your primeval essence is too weak, and the Gu costs 4 times as many portions to activate for every rank above you the Gu is. If you are Rank 2 and try to activate a Rank 4 Gu that costs 10 portions, instead it will cost you 160 portions. If the Gu is below your rank, it only costs a single portion of your primeval essence to activate.
                </p>

                <p className="rule-subheading">Wild Gu</p>
                <p className="rule-text">
                    Wild Gu are found in the wilderness, typically in an environment rich with Dao of the Gu’s path. Wild Gu have a speed of 8 meters (except [Steed] Gu with their own movement statistic) and will attempt to evade capture, including by activating themselves using natural primeval essence. Wild Gu can see through concealments of a lower rank than itself, and have an <Link className="rule-link" to="/rules/skills#atwareness">Awareness</Link> skill of 20 * rank.
                </p>

                <p className="rule-subheading">Refining Gu</p>
                <p className="rule-text">
                    Refining Gu can refer to two processes; the first is turning a wild Gu or a Gu refined by someone else into your own. The second is the act of following a recipe to create a new Gu. You cannot activate a Gu that is wild or belongs to someone else, unless the owner is willing. When a Gu you have refined is killed or refined by someone else, you immediately feel the connection between you get severed (but don’t gain information on whether it was killed or refined).
                </p>

                <p className="rule-subheading">Refining Existing Gu</p>
                <p className="rule-text">
                    When refining a wild Gu, the Gu must be subdued first. For smaller Gu this usually just involves catching it, but larger or more aggressive Gu may require you to weaken it in battle or through other means.
                </p>
                <p className="rule-text">
                    If the Gu is owned by someone else, they can weaken their will to allow you to refine the Gu for free. Otherwise, your will is pit against theirs. Make an opposed Wisdom attribute test against the owner of the Gu, with the higher ranked Gu Master gaining a -30 bonus for each rank they are above their opponent. If you win the test, the owner’s will is driven out and you gain ownership of the Gu. If you lose, they retain control of the Gu, you take 1d4 damage to your soul, and you gain a stacking -10 bonus on subsequent rolls made to refine the Gu.
                </p>
                <p className="rule-text">
                    Once a wild Gu is subdued, you must be touching it to refine it into your own. To do so, you must spend 50 portions of primeval essence. If the Gu is of a higher rank than you, it costs 4 times as many portions to refine for each rank above you.
                </p>
                <p className="rule-text">
                    If the Gu is below your rank, it costs a single portion of primeval essence to refine.
                </p>
                <p className="rule-text">
                    If you do not have enough primeval essence to do so in one sitting, you may have to refine the Gu for a longer period, using your natural recovery and/or primeval stones to supply the rest of the required portions. Taking a break from the refinement causes it to fail, and the primeval essence used in the process is lost.
                </p>

                <p className="rule-subheading">Feeding Gu</p>
                <p className="rule-text">
                    Gu are living beings and need to be fed. What they eat is determined by the Gu, while how often they eat is determined by the rank. Some Gu will have a number of primeval stones in parenthesis next to their food. If you have access to a market, you can spend that number of primeval stones for a feeding. Gu also cannot be fed during combat.
                </p>
                
                <div className="gu-table-wrap" style={{ margin: '20px 0' }}>
                    <table className="gu-table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Feeding Interval</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foodData.map((row, idx) => (
                                <tr key={idx} className="gu-row">
                                    <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{row.rank}</td>
                                    <td style={{ paddingLeft: '15px' }}>
                                        <span style={{ opacity: 0.8, fontStyle: 'italic', marginLeft: '8px' }}>
                                            {row.int}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="rule-text">
                    If the food does not have a primeval stone cost next to it, that does not mean it is impossible to purchase, just that it is a rarer material. You can find your own out in the Southern Border, or seek out a seller of rare items.
                </p>
                <p className="rule-text">
                    To track food, mark the Gu’s feeding interval in sessions inside the “Feeding Interval” column on your Gu sheet. At the end of every session, expend the cost of feeding each Gu or else subtract 1 from its feeding interval. When the Gu eats, set it back to the original feeding interval. If the feeding interval hits -1, the Gu starves to death. You can also feed a Gu outside of combat to restore its health whenever you wish, as long as you have the materials.
                </p>

                <p className="rule-subheading">Detonating Gu</p>
                <p className="rule-text">
                    As a Reaction or for free at any time during their turn, a Gu Master can self-detonate any Gu owned and refined by them with a single thought. The Gu Master must be conscious to do so, and can detonate as many or as few Gu as they want, from any distance. If the Gu is being suppressed, such as by the land spirit of a blessed land, the Gu Master cannot self-detonate it. Otherwise, the chosen Gu instantly die, with no other effects. If the Gu has a self-detonation ability, it does not trigger, since the Gu was not activated.
                </p>

                <p className="rule-subheading">Healing Gu</p>
                <p className="rule-text">
                    Gu have a pool of hit points, and need to be healed when damaged. Most Gu heal back to full health when they are fed. Some Gu can only be healed by other Gu or an obscure process.
                </p>

                <p className="rule-subheading">Stacking Effects</p>
                <p className="rule-text">
                    In most cases, the effects of different Gu will stack, whereas the effects of the same Gu will not. Even if a Gu Master owns multiple Golden Breeze Gu, they cannot sustain both at the same time to double the healing effect. If multiple Gu would transform the same body part, the most recently applied effect takes precedence.
                </p>

                <p className="rule-subheading">Gu against Gu</p>
                <p className="rule-text">
                    Sometimes the effects of Gu will be pit against one another. In most circumstances, the higher rank Gu’s effect takes precedence. If both are the same rank, the defending Gu should block the effect. For example, if a Gu Master is attacked by Rank 2 Vein Burst Gu, but has strengthened his Circulatory System with Rank 2 Iron Artery Gu, then he would be unaffected, despite neither Gu explicitly mentioning the interaction. Invisibility and concealments are considered the defender when pit against divinations.
                </p>
                <p className="rule-text">
                    The Gu system has a lot of moving parts, and it would be unfun and tedious if every effect listed every possible counter and use case. When there’s uncertainty about whether a Gu would affect a target, use common sense, and if that fails the GM will have to make a ruling.
                </p>
            </main>
        </div>
    );
};

export default Gu;