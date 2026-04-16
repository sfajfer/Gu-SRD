import React, { useState, useEffect, useMemo } from 'react';
import Markdown from 'react-markdown';
import axios from 'axios';
import guData from '../assets/gu-index.json';
import './GuDashboard.css';

const PATHS = [
  'Blood Path','Dark Path','Earth Path','Enslavement Path','Fire Path',
  'Food Path','Human Path','Ice Path','Information Path','Light Path',
  'Lightning Path','Luck Path','Metal Path','Poison Path','Refinement Path',
  'Rule Path','Soul Path','Sound Path','Space Path','Strength Path',
  'Sword Path','Theft Path','Time Path','Transformation Path','Water Path',
  'Wind Path','Wisdom Path','Wood Path',
];

const RANKS = [1, 2, 3, 4, 5];

const TYPES = [
  'Attack','Manifestation','Guard','Celerity','Divination',
  'Concealment','Tonic','Container','Catalyst','Carver',
];

const FOOD_COSTS_GENERIC = [
  "3",
  "25",
  "300",
  "8,000",
  "350,000",
]

const KEYWORD_FILTERS = [
  { key: 'Deductive',      label: 'Deductive',       match: kws => kws.some(k => k.toLowerCase() === 'deductive') },
  { key: 'Dao',            label: 'Dao',             match: kws => kws.some(k => k.toLowerCase() === 'dao') },
  { key: 'Defensive',      label: 'Defensive',       match: kws => kws.some(k => k.toLowerCase() === 'defensive') },
  { key: 'Expendable',     label: 'Expendable',      match: kws => kws.some(k => k.toLowerCase().startsWith('expendable')) },
  { key: 'Extinct',        label: 'Extinct',         match: kws => kws.some(k => k.toLowerCase() === 'extinct') },
  { key: 'Fast',           label: 'Fast',            match: kws => kws.some(k => k.toLowerCase() === 'fast') },
  { key: 'Ingredient',     label: 'Ingredient',      match: kws => kws.some(k => k.toLowerCase() === 'ingredient') },
  { key: 'Investigative',  label: 'Investigative',   match: kws => kws.some(k => k.toLowerCase().startsWith('investigative')) },
  { key: 'Low Vitality',   label: 'Low Vitality',    match: kws => kws.some(k => k.toLowerCase() === 'low vitality') },
  { key: 'Piercing',       label: 'Piercing',        match: kws => kws.some(k => k.toLowerCase() === 'piercing') },
  { key: 'Shield',         label: 'Shield',          match: kws => kws.some(k => k.toLowerCase() === 'shield') },
  { key: 'Size',           label: 'Size',            match: kws => kws.some(k => ['small','medium','large','huge'].includes(k.toLowerCase())) },
  { key: 'Steed',          label: 'Steed',           match: kws => kws.some(k => k.toLowerCase() === 'steed') },
  { key: 'Supplementary',  label: 'Supplementary',   match: kws => kws.some(k => k.toLowerCase().startsWith('supplement')) },
  { key: 'Sustained',      label: 'Sustained',       match: kws => kws.some(k => k.toLowerCase() === 'sustained') },
  { key: 'Transformation', label: 'Transformation',  match: kws => kws.some(k => k.toLowerCase() === 'transformation') },
  { key: 'Undodgeable',    label: 'Undodgeable',     match: kws => kws.some(k => k.toLowerCase() === 'undodgeable') },
  { key: 'Unreactable',    label: 'Unreactable',     match: kws => kws.some(k => k.toLowerCase() === 'unreactable') },
  { key: 'Unrefinable',    label: 'Unrefinable',     match: kws => kws.some(k => k.toLowerCase() === 'unrefinable') },
  { key: 'Vital',          label: 'Vital',           match: kws => kws.some(k => k.toLowerCase() === 'vital') },
];

const KEYWORD_DESCRIPTIONS = {
  'Deductive': 'When activated, [Deductive] Gu unlock a special Deduction action. To take it, you must spend 4 hours to deduce a specific subject or a killer move and make a Deduction skill test. Penalties and bonuses are determined by the amount of supporting information available to you. You can stack the effects of a number [Deductive] Gu to the same Deduction action according to your Wisdom Path Attainment {None: 1, Fundamental: 2, Intermediate: 3, Master: 5}. \n \n A specific subject can be something that occured in the past, such as who might have committed a murder, or something happening in the present or future, like why a rival clan may have purchased a huge amount of an unusual refinement material. At the GM\'s discretion, you can also deduce plans of action, such as moneymaking schemes or attack plans. Deductions cannot create information out of thin air, and a success does not necessarily mean your deduction is correct if you lack a key piece of evidence. For every degree of success beyond 1 on the check, however, you gain one additional conclusion about the subject. \n \n You may also use the Deduction action to create or improve refinement recipes. When you do so, you make the Refinement skill test like normal and add whatever effects are provided by the [Deductive] Gu you are using.',
  'Dao': 'Gu with the [Dao] keyword contain much higher traces of dao than most mortal Gu. Dao of different paths naturally conflict, and a Gu Master cannot gain the effect from a [Dao] Gu if they are already under the effect of a [Dao] Gu of a non-compatible path. Path compatibilites are located on page 35. If a Gu belonging to Transformation Path has the [Dao] keyword, it belongs wholly to transformation path and is compatible with all other paths. Transformation Path Gu may instead have the [Dao: [Path]] keyword, indicating that the Dao belongs to a different path and inherits that path\'s compatibilities. For example, Earth Chief Zombie Gu, which has the [Dao: Earth] keyword, can only be combined with [Dao] Gu of Metal, Transformation, or Wood Path. Using the same [Dao] Gu multiple times does not stack the effect. You may also not apply multiple [Dao] Gu to the same body part. Most [Dao] Gu will specify what body part they carve dao into, with a complete list of body parts on page 32. If the Gu does not list a body part then it has no body part restrictions.',
  'Defensive': '[Defensive] Gu can be activated as a Reaction to any event.',
  'Expendable X': '[Expendable X] Gu are destroyed after X uses. If there is no number, the Gu can only be used a single time before it is destroyed.',
  'Extinct': '[Extinct] Gu no longer appear naturally in the world and require extinct refinement materials for their most common recipes. Refinement and Deduction skill tests made to create a recipe for an [Extinct] Gu are made with an additional +60 penalty.',
  'Fast': '[Fast] Gu have a movement of 12 meters instead of 8.',
  'Ingredient': 'Unique to Food Path, [Ingredient] Gu can be used to apply effects to meals you prepare. To prepare a meal, you must spend an hour cooking; expend 1 primeval stone worth of materials and the total primeval essence cost of involved [Ingredient] Gu. The number of [Ingredient] Gu you can apply to the same meal is dependent on your Food Path Attainment {Fundamental: 2, Intermediate: 3, Master: 5}. You cannot prepare a meal unless you have at least Fundamental Food Path Attainment. Each meal can feed 5 creatures. The effects of a meal last for 8 hours, and a creature can only be under the effect of one meal at a time.',
  
  // INVESTIGATIVE
  'Investigative: Sight': 'You cannot see through [Investigative: Sight] Gu if you have the blinded condition. Stealthing effects like invisibility and illusions will say they make the target invisible, which means they cannot be seen normally or by [Investigative: Sight] Gu. Invisible is also a condition that can be applied to creatures and objects. \n \n If the [Investigative: Sight] Gu is of high enough rank, it ignores the stealthing effect entirely. Unless otherwise specified, [Investigative: Sight] Gu ignore stealthing effects of a lower rank.',
  'Investigative: Hearing': 'You cannot hear through [Investigative: Hearing] Gu if you have the deafened condition. If you use an [Investigative: Hearing] Gu while blinded to detect the location of a creature, the +40 penalty to Close Combat and Ranged Attack skill tests from the blinded condition is reduced to a +10 penalty. Stealthing effects will say they make the target inaudible, which means they cannot be heard normally or by [Investigative: Hearing] Gu. \n \n If the [Investigative: Hearing] Gu is of high enough rank, it ignores the stealthing effect entirely. Unless otherwise specified, [Investigative: Hearing] Gu ignore stealthing effects of a lower rank.',
  'Investigative: Smell': 'If you use an [Investigative: Smell] Gu besides sight while blinded to detect the location of a creature, the +40 penalty to Close Combat and Ranged Attack skill tests from the blinded condition is reduced to a +10 penalty. Stealthing effects like against smell will say they make the target odorless, which means they cannot be smelled normally or by [Investigative: Smell] Gu. \n \n If the [Investigative: Smell] Gu is of high enough rank, it ignores the stealthing effect entirely. Unless otherwise specified, [Investigative: Smell] Gu ignore stealthing effects of a lower rank.',
  'Investigative: Detect': '[Investigative: Detect] Gu transmit the locations of whatever Gu, objects, or creatures the Gu is meant to detect directly into your mind, and do not require the use of any of your senses. If you use an [Investigative] Gu besides sight while blinded to detect the location of a creature, the +40 penalty to Close Combat and Ranged Attack skill tests from the blinded condition is reduced to a +10 penalty. Stealthing effects against detect will say they make the target undetectable, which means they cannot be detected by [Investigative: Detect] Gu. \n \n If the [Investigative: Detect] Gu is of high enough rank, it ignores the stealthing effect entirely. Unless otherwise specified, [Investigative: Detect] Gu ignore stealthing effects of a lower rank.',

  'Low Vitality':'[Low Vitality] Gu do not regenerate hit points when they are fed. They will clarify the necessary Gu or process used to recover their health instead.',
  'Piercing': '[Piercing] Gu can pierce through any material that lacks dao. The only barriers with dao would be either immortal refinement materials or barriers created by Gu. Mundane armor worn by a creature struck by a [Piercing] attack does not reduce the damage of the attack, and the armor takes damage equal to the damage of the attack to its hit points. \n \n [Piercing] Gu can also make attacks against targets fully obscured by cover with a +20 penalty. If the target is only partially obscured by cover, attacks made with a [Piercing] Gu against them do not have the usual penalty.',
  'Shield': 'When you take damage, that damage is first assigned to any active Gu with the [Shield] keyword so long as the Gu can block that damage type. If you have multiple [Shield] Gu active and it isn\’t immediately clear which one would block the attack first, you may decide in what order damage is assigned. If you use a [Shield] Gu to reduce damage, the Gu takes that damage to its hitpoints. \n \n If a [Shield] Gu would die from sustaining an attack while active, you may use a Reaction to deactivate the Gu at 1 hit point, taking the remaining damage to your hit points or another [Shield] Gu.',
  
  // SIZES
  'Small': 'The size of a child. Attack rolls against [Small] targets have a +20 penalty.',
  'Medium': 'The size of a man.',
  'Large': '[Large] things take up 4 squares when outside of your aperture. Attack rolls against [Large] targets have a -20 bonus.',
  'Huge:': '[Huge] things take up 9 or more squares when outside of your aperture. Attack rolls against [Huge] targets have a -40 bonus.',


  'Steed': '[Steed] Gu are typically larger than regular Gu and can be ridden while outside your aperture. They also come with a statblock, unlike most other Gu, as they are capable of fighting beyond just activating themselves. That being said, they do not have regular anatomy and are completely unaffected by injuries. It is impossible to sever a [Steed] Gu\’s limbs until it is dead, and it has immunity to the bleeding, blinded and deafened conditions. Unless a poison specifically states it works on Gu, Gu are immune to the poisoned condition. \n \n While mounted, you cannot move but instead move with the [Steed]. The [Steed] Gu shares your initiative and both of your turns are taken simultaneously. You decide what Reactions are taken by a refined [Steed] Gu, but each Reaction it takes expends one of your Reactions. If you take the Dodge Reaction while mounted, you must dismount and move at least one meter like normal, beginning by moving to a square adjacent to the mount. \n \n Wild [Steed] Gu are often difficult to refine as they act more similar to beasts than other Gu, but once refined they cease to move or attack and only act as your will directs them to. Controlling a refined [Steed] Gu is as easy moving your fingers and does not harm your soul.',
  'Supplementary': 'Supplementary Gu can change the properties of your subsequent activations. When used outside of killer moves, [Supplementary] Gu have no effect on Gu of a higher rank than itself. When used as supplementary Gu in a killer move, you will require a number of the same [Supplementary] Gu to properly apply the effect equal to 2^(killer move rank - [Supplementary] Gu rank). \n \n Supplementary Gu inherit the [Sustained] keyword when used to augment [Sustained] Gu.',
  'Sustained': 'You must pay the cost of [Sustained] Gu at the start of each of your turns as long as you keep the effect active. Paying the cost does not use one of your activations. While a Gu is being sustained, it cannot be activated (because it is already active). Take 1 damage to your soul for each Gu beyond your Activations attribute that you sustain at the start of each of your turns. \n \n You may stop sustaining a Gu at any time, whether or not it is your turn. If you fall unconscious or are stunned, you automatically stop sustaining all Gu. When you stop sustaining a Gu, you cannot activate that Gu again until the start of your next turn.',
  'Transformation': 'Gu and, more commonly, killer moves with the [Transformation] keyword completely change the body of the user, granting it different attributes. The most common attribute changed is hit points, though some change other attributes like movement and strength. If your hit point or soul maximums are changed by a [Transformation] Gu, keep track of how much health or soul you had before the transformation. When the transformation ends, either by being reduced to 0 hit points/soul or by deactivating the Gu, Your attributes return to their state before the transformation, including current hit points/soul. You may only ever be under the effect of one [Transformation] Gu or killer move at a time. \n \n If your transformation is reduced to 0 hit points, all Gu involved deactivate and any remaining damage from the attack is dealt to your hit points. If the transformation was permanent and is reduced to 0 hit points, you remain in the transformation and roll to see if you enter Final Stand (see Ch. 4, Combat).',
  'Undodgeable': '[Undodgeable] attacks cannot be avoided by moving, such as with the Dodge Reaction. A creature can still take the Dodge Reaction against an [Undodgeable] attack, but it will only move them and not avoid the attack.',
  'Unreactable': 'Attacks made with [Unreactable] Gu are too fast for the defender to react in time. When a creature uses a Reaction in response to the activation or effect of an [Unreactable] Gu, their Reaction is delayed until after the Gu’s successful activation and application of its effect.',
  'Unrefinable': '[Unrefinable] Gu exclusively appear naturally in the world. It is impossible to create a recipe for Gu with this keyword.',
  'Vital': 'A Gu Master can only have 1 [Vital] Gu at a time. If a Gu with the [Vital] keyword dies, the owner of the Gu dies as well. When taking damage from refinement backlash, a [Vital] Gu cannot be brought below 1 hit point. The [Vital] keyword is applied automatically to the first Gu a Gu Master refines, but you can spend a day in closed cultivation with a new Gu to transfer the [Vital] keyword to the new Gu, removing it from your old Vital Gu. When you change your Vital Gu, your current hit points are reduced to 1 as you suffer backlash.',
}

const rangeToMeters = (rangeStr) => {
  if (!rangeStr) return -1;
  const s = String(rangeStr).toLowerCase().trim();
  const num = parseFloat(s);
  if (isNaN(num)) return -1;
  if (s.includes('kilometer') || s.includes(' km')) return num * 1000;
  if (s.includes('mile'))      return num * 1609.34;
  if (s.includes('foot') || s.includes('feet') || s.includes('ft')) return num * 0.3048;
  if (s.includes('meter'))     return num;
  return num;
};

// Extracts the first number found in a string, else returns the original string
const extractNumber = (val) => {
  if (val === null || val === undefined) return '';
  const s = String(val);
  const match = s.match(/-?\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : s;
};

const FilterDropdown = ({ label, value, onChange, options, placeholder }) => (
  <div className="gu-filter-group">
    <span className="gu-filter-label">{label}</span>
    <div className="gu-select-wrap">
      <select
        className={`gu-select${value ? ' has-value' : ''}`}
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map(opt => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const KeywordCheckboxes = ({ selected, onToggle, keywordsExpanded, setKeywordsExpanded }) => (
  <div className="gu-filter-group">
    <span className="gu-filter-dropdown-label gu-filter-label" onClick={() => setKeywordsExpanded(!keywordsExpanded)}>
      Keywords {keywordsExpanded ? "▼" : "►"}
    </span>
    {keywordsExpanded && (
      <div className="keyword-checkbox-grid">
        {KEYWORD_FILTERS.map(({ key, label }) => {
          const checked = selected.has(key);
          return (
            <label
              key={key}
              className={`keyword-checkbox-label${checked ? ' checked' : ''}`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(key)}
              />
              {" " + label}
            </label>
          );
        })}
      </div>
    )}
  </div>
);

const EffectRenderer = ({ effect, guList, setExpandedId, clearAll }) => {
  if (!effect) return null;
  
  const parts = Array.isArray(effect) ? effect : [effect];

  const handleGuLinkClick = (guName) => {
    const targetGu = guList.find(g => g.name.toLowerCase() === guName.toLowerCase());
    
    if (targetGu) {
      clearAll();
      
      const targetId = targetGu.id || targetGu.name;
      setExpandedId(targetId);

      setTimeout(() => {
        const element = document.getElementById(`gu-row-${targetId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  return (
    <div className="effect-container">
      {parts.map((part, index) => {
        const spanMatch = part.match(/<span>(.*?)<\/span>/);

        if (spanMatch) {
          const buttonText = spanMatch[1];
          return (
            <button 
              key={index} 
              className="effect-inline-button"
              onClick={() => handleGuLinkClick(buttonText)}
            >
              {buttonText}
            </button>
          );
        }

        return (
          <Markdown 
            key={index} 
            components={{ p: 'span' }} 
          >
            {part}
          </Markdown>
        );
      })}
    </div>
  );
};

const SortTh = ({ label, sortKey, sortConfig, onSort, className }) => {
  const active = sortConfig.key === sortKey;
  return (
    <th
      className={`${active ? 'sort-active' : ''} ${className ?? ''}`}
      onClick={() => onSort(sortKey)}
    >
      {label}
      <span className="sort-arrow">
        {active ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
      </span>
    </th>
  );
};

const KeywordTag = ({ keyword }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  let keywordParsed = keyword;

  // Close tooltip if tapped anywhere else on mobile
  useEffect(() => {
    const handleOutsideClick = () => setShowTooltip(false);
    if (showTooltip) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [showTooltip]);

  const handleToggle = (e) => {
    e.stopPropagation();
    setShowTooltip(prev => !prev);
  };

  if (keyword.toLowerCase().startsWith('expendable')) {
    keywordParsed = 'Expendable X';
  }

  return (
    <div 
      className="keyword-tag-container"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={handleToggle}
    >
      <span className="keyword-tag">{keyword}</span>
      {showTooltip && (
        <div 
          className="keyword-tooltip" 
          onClick={(e) => e.stopPropagation()} // Keep open if scrolling inside tooltip
        >
          <strong className='keyword-tooltip-title'>[{keyword}] - </strong> {KEYWORD_DESCRIPTIONS[keywordParsed]}
        </div>
      )}
    </div>
  );
};


const GuDashboard = () => {
  const [guList, setGuList] = useState(guData || []);
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [expandedId, setExpandedId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [filterPath, setFilterPath] = useState('');
  const [filterRank, setFilterRank] = useState(new Set());  
  const [filterType, setFilterType] = useState('');
  const [filterKeywords, setFilterKeywords] = useState(new Set());

  const [rankExpanded, setRankExpanded] = useState(false);
  const [keywordsExpanded, setKeywordsExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    axios.get('https://gu-index-b9jp.onrender.com/api/gu/search')
      .then(res => {
        console.log('Fetched:', res.data);
        // Only update if we get more entries than the local file; this will only happen when new gu are added and the json isnt updated yet
        if (res.data.length > guList.length) setGuList(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const toggleKeyword = (key) => {
    setFilterKeywords(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const toggleRank = (val) => {
    setFilterRank(prev => {
      const next = new Set(prev);
      const numVal = Number(val); 
      next.has(numVal) ? next.delete(numVal) : next.add(numVal);
      return next;
    });
  };

  const requestSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'ascending' ? 'descending' : 'ascending',
    }));
  };

  const clearAll = () => {
    setFilterPath('');
    setFilterRank(new Set());
    setFilterType('');
    setSearch('');
    setFilterKeywords(new Set());
  };

  const activeFilterCount =
    [filterPath, filterRank, filterType].filter(Boolean).length + filterKeywords.size;

  const processedGu = useMemo(() => {
    if (!guList.length) return [];

    let out = guList.filter(gu => {
      const q = search.toLowerCase();
      const matchSearch = !q || (
        gu.name?.toLowerCase().includes(q) ||
        gu.path?.toLowerCase().includes(q) ||
        gu.type?.toLowerCase().includes(q) ||
        gu.keywords?.some(k => k.toLowerCase().includes(q))
      );
      const matchPath = !filterPath || gu.path === filterPath;
      const matchRank = filterRank.size === 0 || (gu.rank && gu.rank.some(r => filterRank.has(Number(r))));
      const matchType = !filterType || gu.type === filterType;

      // ALL selected keywords must be present on the gu
      const matchKeywords = filterKeywords.size === 0 || (
        gu.keywords && [...filterKeywords].every(key => {
          const filter = KEYWORD_FILTERS.find(f => f.key === key);
          return filter?.match(gu.keywords);
        })
      );

      return matchSearch && matchPath && matchRank && matchType && matchKeywords;
    });

    if (sortConfig.key) {
      out = [...out].sort((a, b) => {
        const dir = sortConfig.direction === 'ascending' ? 1 : -1;
        const key = sortConfig.key;

        // --- RANK SORTING ---
        if (key === 'rank') {
          const aMin = Number(a.rank?.[0] ?? 0);
          const bMin = Number(b.rank?.[0] ?? 0);
          if (aMin !== bMin) return (aMin - bMin) * dir;
          
          // If starting rank is the same, sort by the end of the range
          const aMax = Number(a.rank?.[a.rank.length - 1] ?? 0);
          const bMax = Number(b.rank?.[b.rank.length - 1] ?? 0);
          return (aMax - bMax) * dir;
        }

        // --- RANGE SORTING ---
        if (key === 'range') {
          const rA = rangeToMeters(a.range);
          const rB = rangeToMeters(b.range);
          
          if (rA !== -1 && rB !== -1) return (rA - rB) * dir;
          
          if (rA !== -1) return -1 * dir;
          if (rB !== -1) return 1 * dir;
          
          const strA = String(a.range || '').toLowerCase();
          const strB = String(b.range || '').toLowerCase();
          if (strA < strB) return -1 * dir;
          if (strA > strB) return 1 * dir;
          return 0;
        }

        // --- COST & HEALTH SORTING ---
        if (key === 'cost' || key === 'health') {
          const valA = extractNumber(a[key]);
          const valB = extractNumber(b[key]);

          const isNumA = typeof valA === 'number';
          const isNumB = typeof valB === 'number';

          if (isNumA && isNumB) return (valA - valB) * dir;
          if (isNumA) return -1 * dir;
          if (isNumB) return 1 * dir;

          const strA = String(valA).toLowerCase();
          const strB = String(valB).toLowerCase();
          if (strA < strB) return -1 * dir;
          if (strA > strB) return 1 * dir;
          return 0;
        }

        // --- DEFAULT SORTING ---
        let va = a[key] ?? '';
        let vb = b[key] ?? '';
        if (Array.isArray(va)) va = va[0] ?? 0;
        if (Array.isArray(vb)) vb = vb[0] ?? 0;
        
        if (typeof va === 'string') va = va.toLowerCase();
        if (typeof vb === 'string') vb = vb.toLowerCase();

        if (va < vb) return -1 * dir;
        if (va > vb) return 1 * dir;
        return 0;
      });
    }
    return out;
  }, [guList, search, sortConfig, filterPath, filterRank, filterType, filterKeywords]);

  const getFood = (rank) => {
    if (rank.length > 1) {
      return "{" + rank.map(r => FOOD_COSTS_GENERIC[r - 1]).join(", ") + "} Primeval Stones";
    }
    return FOOD_COSTS_GENERIC[rank[0] - 1] + ' Primeval Stones';
  }

  const rankOptions = RANKS.map(r => ({ value: String(r), label: `Rank ${r}` }));
  const pathOptions = PATHS.map(p => ({ value: p, label: p.replace(' Path', '') }));

  return (
    <div className="gu-shell">
      <header className="gu-topbar">
        <div>
          <div className="gu-title">GU INDEX</div>
          <div className="gu-subtitle">click rows to expand</div>
        </div>

        <input
          type="text"
          className="gu-search"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <button
          className="gu-filter-toggle"
          onClick={() => setSidebarOpen(o => !o)}
        >
          ⚙ Filters
          {activeFilterCount > 0 && <span className="badge">{activeFilterCount}</span>}
        </button>

        <div className="gu-count">
          <strong>{processedGu.length}</strong> / {guList.length}
        </div>
      </header>

      <div className="gu-body">
        <aside className={`gu-sidebar${sidebarOpen ? ' open' : ''}`}>
          <div className="gu-sidebar-header">
            <span className="gu-sidebar-title">Filters</span>
            {activeFilterCount > 0 && (
              <button className="gu-clear-btn" onClick={clearAll}>Clear all</button>
            )}
          </div>

          <FilterDropdown
            label="Path"
            value={filterPath}
            onChange={setFilterPath}
            options={pathOptions}
            placeholder="All paths"
          />

          <div className="gu-filter-group">
            <span className="gu-filter-label gu-filter-dropdown-label" onClick={() => setRankExpanded(!rankExpanded)}>Ranks {rankExpanded ? "▼" : "►"}</span>
            {rankExpanded && (
              <div className="keyword-checkbox-grid">
                {RANKS.map(r => {
                  const checked = filterRank.has(r);
                  return (
                    <label key={r} className={`keyword-checkbox-label${checked ? ' checked' : ''}`}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleRank(r)}
                      />
                      {` Rank ${r}`}
                    </label>
                  );
                })}
              </div>
          )}
          </div>

          <FilterDropdown
            label="Type"
            value={filterType}
            onChange={setFilterType}
            options={TYPES}
            placeholder="All types"
          />

          <KeywordCheckboxes
            selected={filterKeywords}
            onToggle={toggleKeyword}
            keywordsExpanded={keywordsExpanded}
            setKeywordsExpanded={setKeywordsExpanded}
          />
        </aside>

        <main className="gu-main">
          <div className="gu-table-wrap">
            <table className="gu-table">
              <thead>
                <tr>
                  <SortTh label="Name"   sortKey="name"   sortConfig={sortConfig} onSort={requestSort} />
                  <SortTh label="Path"   sortKey="path"   sortConfig={sortConfig} onSort={requestSort} />
                  <SortTh label="Rank"   sortKey="rank"   sortConfig={sortConfig} onSort={requestSort} />
                  {screenWidth >= 718 && (
                    <SortTh label="Type" sortKey="type" sortConfig={sortConfig} onSort={requestSort} className="col-type" />
                  )}
                  {screenWidth >= 768 && (
                    <>
                      <SortTh label="Cost"   sortKey="cost"   sortConfig={sortConfig} onSort={requestSort} className="col-cost" />
                      <SortTh label="Range"  sortKey="range"  sortConfig={sortConfig} onSort={requestSort} className="col-range" />
                      <SortTh label="Health" sortKey="health" sortConfig={sortConfig} onSort={requestSort} className="col-health" />
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {processedGu.length === 0 ? (
                  <tr>
                    <td colSpan="7">
                      <div className="gu-empty">
                        {guList.length === 0 ? 'Loading…' : 'No results match your filters.'}
                      </div>
                    </td>
                  </tr>
                ) : processedGu.map(gu => (
                  <React.Fragment key={gu.id || gu.name}>
                    <tr
                      id={`gu-row-${gu.id || gu.name}`}
                      className="gu-row"
                      onClick={() => setExpandedId(expandedId === (gu.id || gu.name) ? null : (gu.id || gu.name))}
                    >
                      <td className="cell-name">{gu.name}</td>
                      <td className="cell-path">{gu.path}</td>
                      <td className="cell-rank">
                        {(() => {
                          if (!gu.rank || gu.rank.length === 0) return "-";
                          if (gu.rank.length === 1) return gu.rank[0];

                          // Check if the ranks are consecutive (e.g., [1, 2, 3])
                          const isConsecutive = gu.rank.every((val, i) => 
                            i === 0 || val === gu.rank[i - 1] + 1
                          );

                          return isConsecutive
                            ? `${gu.rank[0]}–${gu.rank[gu.rank.length - 1]}`
                            : gu.rank.join(", ");
                        })()}
                      </td>
                      {screenWidth >= 710 && (
                        <td><span className="type-badge">{gu.type}</span></td>
                      )}
                      {screenWidth >= 768 && (
                        <>
                          <td className="cell-cost col-cost">{gu.cost}</td>
                          <td className="cell-range col-range">{gu.range}</td>
                          <td className="cell-health col-health">{gu.health}</td>
                        </>
                      )}
                    </tr>
                    {expandedId === (gu.id || gu.name) && (
                      <tr className="gu-expanded-row">
                        <td colSpan="7">
                          <div className="gu-expanded-inner">
                            <div className={`gu-expanded-grid ${!gu.steed ? 'no-steed' : ''}`}>
                              <div>
                                <div className="mobile-stats-row">
                                  {gu.cost && (
                                    <div className="mobile-stat-chip">
                                      <span className="mobile-stat-label">Cost</span>
                                      <span className="mobile-stat-value">{gu.cost}</span>
                              </div>
                                  )}
                                  {gu.health && (
                                    <div className="mobile-stat-chip">
                                      <span className="mobile-stat-label">Health</span>
                                      <span className="mobile-stat-value">{gu.health}</span>
                                    </div>
                                  )}
                                  {gu.range && (
                                    <div className="mobile-stat-chip range">
                                      <span className="mobile-stat-label">Range</span>
                                      <span className="mobile-stat-value">{gu.range}</span>
                                    </div>
                                  )}
                                </div>

                                <span className="type-badge">{gu.type}</span>

                                <div className="expand-section-title">Effect</div>
                                <div className="effect-box">
                                  <EffectRenderer 
                                    effect={gu.effect} 
                                    guList={guList} 
                                    setExpandedId={setExpandedId} 
                                    clearAll={clearAll} 
                                  />
                                </div>
                                <div className="meta-row">
                                  <div className="meta-chip food">
                                    <span className="meta-chip-label">Food</span>
                                    <span className="meta-chip-value">{gu.food !== "<!-- TODO ->" ? gu.food : getFood(gu.rank)}</span>
                                  </div>
                                  <div className="meta-chip" style={{ flex: 1 }}>
                                    <span className="meta-chip-label">Keywords</span>
                                    <div className="keyword-list">
                                  {gu.keywords?.map(k => (
                                    <KeywordTag key={k} keyword={k} />
                                  ))}
                                </div>
                              </div>
                            </div>
                              </div>

                              {gu.steed && (
                                <div className="steed-block">
                              <div className="steed-header">
                                    <span className="steed-header-label">Steed Statblock</span>
                                    <span className="steed-cr">CR {gu.steed.cr}</span>
                                  </div>
                                  <div className="steed-stats-grid">
                                    <ul className="steed-stat-list">
                                      {gu.steed.attributes && Object.entries(gu.steed.attributes).map(([k, v]) => (
                                        <li key={k}><span>{k}</span><span>{v}</span></li>
                                      ))}
                                    </ul>
                                    <ul className="steed-stat-list">
                                      {gu.steed.skills && Object.entries(gu.steed.skills).map(([k, v]) => (
                                        <li key={k}>
                                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{k}</span>
                                          <span>{v}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  {gu.steed.combatActions && (
                                    <div className="steed-actions">
                                      <div className="steed-actions-label">Combat Actions</div>
                                      <p className="steed-actions-text">{gu.steed.combatActions}</p>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GuDashboard;