import React, { useState, useEffect, useMemo } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import axios from 'axios';
import guData from '../assets/gu-index.json';
import './GuDashboard.css';
import KEYWORD_DESCRIPTIONS from '../assets/KEYWORD_DESCRIPTIONS';

const PATHS = [
  'Blood Path','Dark Path','Earth Path','Enslavement Path','Fire Path',
  'Food Path', 'Formation Path','Human Path','Ice Path','Information Path','Light Path',
  'Lightning Path','Luck Path','Metal Path','Poison Path','Refinement Path',
  'Rule Path','Soul Path','Sound Path','Space Path','Strength Path',
  'Sword Path','Theft Path','Time Path','Transformation Path','Water Path',
  'Wind Path','Wisdom Path','Wood Path',
];

const PATH_COMPATIBILITIES = {
  Blood: ['Enslavement', 'Water', 'Wood'],
  Dark: ['Poison', 'Space', 'Theft'],
  Earth: ['Metal', 'Wood'],
  Enslavement: ['Blood', 'Soul', 'Theft'],
  Fire: ['Food', 'Light', 'Lightning', 'Metal', 'Wind'],
  Food: ['Fire', 'Poison', 'Strength'],
  Formation: ['Information', 'Rule', 'Space'],
  Ice: ['Water', 'Wind'],
  Information: ['Formation', 'Rule', 'Wisdom'],
  Light: ['Fire', 'Lightning', 'Sound'],
  Lightning: ['Fire', 'Light', 'Wind'],
  Luck: ['Rule'],
  Metal: ['Earth', 'Fire', 'Strength', 'Sword'],
  Poison: ['Dark', 'Food', 'Wood'],
  Refinement: ['Soul', 'Wisdom'],
  Rule: ['Formation', 'Information', 'Luck'],
  Soul: ['Enslavement', 'Refinement', 'Strength', 'Wisdom'],
  Sound: ['Light', 'Sword'],
  Space: ['Dark', 'Formation', 'Time'],
  Strength: ['Food', 'Metal', 'Soul'],
  Sword: ['Metal', 'Sound'],
  Theft: ['Dark', 'Enslavement'],
  Time: ['Space', 'Wisdom'],
  Transformation: ['Blood', 'Dark', 'Earth', 'Enslavement', 'Fire', 'Food', 'Formation', 'Human', 'Ice', 'Information', 'Light', 'Lightning', 'Luck', 'Metal', 'Poison', 'Refinement', 'Rule', 'Soul', 'Sound', 'Space', 'Strength', 'Sword', 'Theft', 'Time', 'Water', 'Wind', 'Wisdom', 'Wood'],
  Water: ['Blood', 'Ice', 'Wood'],
  Wind: ['Fire', 'Ice', 'Lightning'],
  Wisdom: ['Information', 'Refinement', 'Soul', 'Time'],
  Wood: ['Earth', 'Poison', 'Water'],
}

const RANKS = [1, 2, 3, 4, 5];

const TYPES = [
  'Attack','Manifestation','Guard','Celerity','Divination',
  'Concealment','Tonic','Container','Catalyst','Carver', 'Trigger', 'Injector', 'Gate'
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

const getCombatActions = (input) => {
  if (!input) return [];

  return input
    .split(/\n\s*\n/)
    .map(action => {
      return action
        .replace(/\s+/g, ' ') 
        .trim();              
    })
    .filter(action => action.startsWith('**'));
}

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
            remarkPlugins={[remarkGfm]}
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
  const [filterPath, setFilterPath] = useState(new Set());  
  const [filterRank, setFilterRank] = useState(new Set());  
  const [filterType, setFilterType] = useState('');
  const [filterKeywords, setFilterKeywords] = useState(new Set());
  const [daoFilterPath, setDaoFilterPath] = useState('');

  const [rankExpanded, setRankExpanded] = useState(false);
  const [pathExpanded, setPathExpanded] = useState(false);
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

  const togglePath = (path) => {
    setFilterPath(prev => {
      const next = new Set(prev);
      next.has(path) ? next.delete(path) : next.add(path);
      return next;
    });
  };

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
    setFilterPath(new Set());
    setFilterRank(new Set());
    setFilterType('');
    setSearch('');
    setFilterKeywords(new Set());
    setDaoFilterPath('');
  };

  const handleDaoFilterChange = (path) => {
    clearAll();
    setDaoFilterPath(path);
  };

  const activeFilterCount =
    [filterType].filter(Boolean).length + 
    filterPath.size + 
    filterRank.size + 
    filterKeywords.size;

const processedGu = useMemo(() => {
    if (!guList.length) return [];

    let out = guList.filter(gu => {
      // Dao compatibility logic
      if (daoFilterPath) {
        const hasDao = gu.keywords?.some(k => k.toLowerCase() === 'dao');
        if (!hasDao) return false;

        const cleanSelected = daoFilterPath.replace(' Path', '');
        const compatibles = PATH_COMPATIBILITIES[cleanSelected] || [];
        const cleanGuPath = (gu.path || '').replace(' Path', '');

        const isSamePath = gu.path === daoFilterPath;
        const isCompatible = compatibles.includes(cleanGuPath);
        const isTransformation = gu.path === 'Transformation Path';

        return isSamePath || isCompatible || isTransformation;
      }


      const q = search.toLowerCase();
      const matchSearch = !q || (
        gu.name?.toLowerCase().includes(q) ||
        gu.path?.toLowerCase().includes(q) ||
        gu.type?.toLowerCase().includes(q) ||
        gu.keywords?.some(k => k.toLowerCase().includes(q))
      );
      const matchPath = filterPath.size === 0 || filterPath.has(gu.path);
      const matchRank = filterRank.size === 0 || (gu.rank && gu.rank.some(r => filterRank.has(Number(r))));
      const matchType = !filterType || gu.type === filterType;

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
  }, [guList, search, sortConfig, filterPath, filterRank, filterType, filterKeywords, daoFilterPath]);

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
            {(activeFilterCount > 0 || daoFilterPath) && (
              <button className="gu-clear-btn" onClick={clearAll}>Clear all</button>
            )}
          </div>

          <FilterDropdown
            label={<>View all compatible [<strong>Dao</strong>] Gu</>}
            value={daoFilterPath}
            onChange={handleDaoFilterChange}
            options={pathOptions}
            placeholder="Select a Path..."
          />

          <div className="gu-filter-group">
            <span 
              className="gu-filter-label gu-filter-dropdown-label" 
              onClick={() => setPathExpanded(!pathExpanded)}
            >
              Paths {pathExpanded ? "▼" : "►"}
            </span>
            {pathExpanded && (
              <div className="keyword-checkbox-grid">
                {PATHS.map(p => {
                  const checked = filterPath.has(p);
                  return (
                    <label key={p} className={`keyword-checkbox-label${checked ? ' checked' : ''}`}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => togglePath(p)}
                      />
                      {" " + p.replace(' Path', '')}
                    </label>
                  );
                })}
              </div>
            )}
          </div>

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
                                  {gu.keywords && gu.keywords.length > 0 && (
                                    <div className="meta-chip" style={{ flex: 1 }}>
                                      <span className="meta-chip-label">Keywords</span>
                                      <div className="keyword-list">
                                    {gu.keywords?.map(k => (
                                      <KeywordTag key={k} keyword={k} />
                                    ))}
                                  </div>
                                </div>
                                )}
                            </div>
                              </div>

                              {gu.steed && (
                                <div className="steed-block">
                              <div className="steed-header">
                                    <span className="steed-header-label">Steed Statblock</span>
                                    <span className="steed-cr">CR {gu.steed.cR}</span>
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
                                      <p className="steed-actions-text">{getCombatActions(gu.steed.combatActions).map((action, index) => (
                                        <>
                                          <Markdown key={index}>{action}</Markdown>
                                          <br />
                                        </>
                                      ))}</p>
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