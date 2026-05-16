import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GuDashboard from './components/GuDashboard';
import RulesDirectory from './components/RulesDirectory';

// Introduction / Rule Lookup Components
import Attainment from './components/rules/introduction/Attainment';
import Attributes from './components/rules/introduction/Attributes';
import CharacterCreation from './components/rules/introduction/CharacterCreation';
import Cultivation from './components/rules/introduction/Cultivation';
import Downtime from './components/rules/introduction/Downtime';
import PrimevalEssence from './components/rules/introduction/PrimevalEssence';
import PrimevalStones from './components/rules/introduction/PrimevalStones';
import RefinementTechniques from './components/rules/introduction/RefinementTechniques';
import RunningTheGame from './components/rules/introduction/RunningTheGame';
import Skills from './components/rules/introduction/Skills';
import Talents from './components/rules/introduction/Talents';
import TheAperture from './components/rules/introduction/TheAperture';
import TheDiceMechanic from './components/rules/introduction/TheDiceMechanic';
import TheWorld from './components/rules/introduction/TheWorld';

// Gu Components
import CreatingGu from './components/rules/gu/CreatingGu';
import Gu from './components/rules/gu/Gu';
import KillerMoves from './components/rules/gu/KillerMoves';
import PathCompatibilities from './components/rules/gu/PathCompatibilities';
import RefinementRecipes from './components/rules/gu/RefinementRecipes';
import GuHouses from './components/rules/gu/GuHouses';
import Formations from './components/rules/gu/Formations';
import EnslavementPath from './components/rules/gu/EnslavementPath';

// Combat Components
import ActionsAndTheTurn from './components/rules/combat/ActionsAndTheTurn';
import CombatActions from './components/rules/combat/CombatActions';
import Cover from './components/rules/combat/Cover';
import Damage from './components/rules/combat/Damage';
import Flying from './components/rules/combat/Flying';
import HighGround from './components/rules/combat/HighGround';
import Light from './components/rules/combat/Light';
import Movement from './components/rules/combat/Movement';
import Ranges from './components/rules/combat/Ranges';
import Reactions from './components/rules/combat/Reactions';

// General Rules Components
import StatusEffects from './components/rules/StatusEffects';
import Gear from './components/rules/Gear';
import RockGambling from './components/rules/RockGambling';
import Beasts from './components/rules/Beasts';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Main Dashboard & Directory */}
          <Route path="/" element={<GuDashboard />} />
          <Route path="/rules" element={<RulesDirectory />} />
          
          {/* Group 1: Introduction / Rule Lookup */}
          <Route path="/rules/rule-lookup" element={<RunningTheGame />} /> {/* Fallback/Mapping if needed */}
          <Route path="/rules/the-aperture" element={<TheAperture />} />
          <Route path="/rules/primeval-essence" element={<PrimevalEssence />} />
          <Route path="/rules/primeval-stones" element={<PrimevalStones />} />
          <Route path="/rules/the-world" element={<TheWorld />} />
          <Route path="/rules/the-dice-mechanic" element={<TheDiceMechanic />} />
          <Route path="/rules/running-the-game" element={<RunningTheGame />} />
          <Route path="/rules/character-creation" element={<CharacterCreation />} />
          <Route path="/rules/attributes" element={<Attributes />} />
          <Route path="/rules/skills" element={<Skills />} />
          <Route path="/rules/cultivation" element={<Cultivation />} />
          <Route path="/rules/downtime" element={<Downtime />} />
          <Route path="/rules/talents" element={<Talents />} />
          <Route path="/rules/refinement-techniques" element={<RefinementTechniques />} />
          <Route path="/rules/attainment" element={<Attainment />} />

          {/* Group 2: Gu Mechanics */}
          <Route path="/rules/gu" element={<Gu />} />
          <Route path="/rules/refinement-recipes" element={<RefinementRecipes />} />
          <Route path="/rules/creating-unique-gu" element={<CreatingGu />} />
          <Route path="/rules/path-compatibilities" element={<PathCompatibilities />} />
          <Route path="/rules/enslavement-path-unfinished" element={<EnslavementPath />} />
          <Route path="/rules/killer-moves" element={<KillerMoves />} />
          <Route path="/rules/formations-unfinished" element={<Formations />} />
          <Route path="/rules/gu-houses-very-unfinished" element={<GuHouses />} />

          {/* Group 3: Combat */}
          <Route path="/rules/combat" element={<ActionsAndTheTurn />} /> {/* Fallback/Mapping if needed */}
          <Route path="/rules/actions-and-the-initiative-the-turn" element={<ActionsAndTheTurn />} />
          <Route path="/rules/movement" element={<Movement />} />
          <Route path="/rules/flying" element={<Flying />} />
          <Route path="/rules/combat-actions" element={<CombatActions />} />
          <Route path="/rules/reactions" element={<Reactions />} />
          <Route path="/rules/damage" element={<Damage />} />
          <Route path="/rules/ranges" element={<Ranges />} />
          <Route path="/rules/high-ground" element={<HighGround />} />
          <Route path="/rules/cover" element={<Cover />} />
          <Route path="/rules/light" element={<Light />} />

          {/* Group 4-7: General System Systems */}
          <Route path="/rules/status-effects" element={<StatusEffects />} />
          <Route path="/rules/gear" element={<Gear />} />
          <Route path="/rules/rock-gambling" element={<RockGambling />} />
          <Route path="/rules/beasts" element={<Beasts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;