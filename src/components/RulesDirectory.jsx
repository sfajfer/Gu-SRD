import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchIndex } from '../searchIndex'; // Adjust this path if necessary
import './Styles.css';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

const SECTIONS = [
  {
    title: 'Introduction',
    desc: 'Basic rules of the world, character creation, and progression',
    chapters: [
      'The Aperture', 'Primeval Essence', 'Primeval Stones',
      'The World', 'The Dice Mechanic', 'Running the Game',
      'Character Creation', 'Attributes', 'Skills', 'Cultivation',
      'Downtime', 'Talents', 'Refinement Techniques', 'Attainment'
    ]
  },
  {
    title: 'Gu',
    desc: 'How Gu work, how to create them, and how to combine their effects into killer moves.',
    chapters: [
      'Gu', 'Refinement Recipes', 'Creating Unique Gu', 'Gu Keywords', 'Path Compatibilities',
      'Enslavement Path (Unfinished)', 'Killer Moves',
      'Formations (Unfinished)', 'Gu Houses (Unfinished)'
    ]
  },
  {
    title: 'Combat',
    desc: 'Actions, movement, damage, and the battlefield',
    chapters: [
      'Actions and the Initiative, The Turn', 'Movement', 'Flying',
      'Combat Actions', 'Reactions', 'Damage', 'Ranges', 'High Ground',
      'Cover', 'Light', 'Status Effects'
    ]
  },
  { title: 'Objects', desc: 'Equipment and outfitting', chapters: ['Objects', 'Rock Gambling'] },
  { title: 'Bestiary', desc: '', chapters: ['Beasts'] }
];

const ChevronIcon = ({ open }) => (
  <span className={`directory-chevron${open ? ' open' : ''}`}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </span>
);

const RulesDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openSections, setOpenSections] = useState(() => SECTIONS.map(() => true));

  const slugify = (text) =>
    (text || '')
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');

  const toggleSection = (idx) => {
    setOpenSections((prev) => prev.map((val, i) => (i === idx ? !val : val)));
  };

  const allOpen = openSections.every(Boolean);
  const toggleAll = () => setOpenSections(SECTIONS.map(() => !allOpen));

  const scrollToSection = (idx) => {
    setOpenSections((prev) => prev.map((val, i) => (i === idx ? true : val)));
    // Wait a tick so the section is expanded before scrolling to it
    requestAnimationFrame(() => {
      document.getElementById(`rules-section-${idx}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const getSearchTokens = (term) => term.toLowerCase().trim().split(/\s+/).filter(t => t.length > 0);

  // 1. Get all raw matches from the index
  const rawResults = searchIndex.filter(page => {
    const tokens = getSearchTokens(searchTerm);
    if (tokens.length === 0) return false;

    const title = (page.title || '').toLowerCase();
    const content = (page.content || '').toLowerCase();

    return tokens.every(token => title.includes(token) || content.includes(token));
  });

  // 2. Deduplicate the results by Title to prevent repetitive cards
  const searchResults = [];
  const seenTitles = new Set();
  for (const result of rawResults) {
    if (result.title && !seenTitles.has(result.title)) {
      seenTitles.add(result.title);
      searchResults.push(result);
    }
  }

  const getSnippetAndHighlight = (content, term) => {
    const safeContent = content || '';
    const tokens = getSearchTokens(term);

    if (tokens.length === 0) return safeContent.slice(0, 140) + '...';

    const lowerContent = safeContent.toLowerCase();
    let earliestIdx = -1;

    for (const token of tokens) {
      const idx = lowerContent.indexOf(token);
      if (idx !== -1 && (earliestIdx === -1 || idx < earliestIdx)) {
        earliestIdx = idx;
      }
    }

    if (earliestIdx === -1) return safeContent.slice(0, 140) + '...';

    const start = Math.max(0, earliestIdx - 60);
    const end = Math.min(safeContent.length, earliestIdx + 80);
    let snippet = safeContent.slice(start, end);

    if (start > 0) snippet = '...' + snippet;
    if (end < safeContent.length) snippet = snippet + '...';

    const escapedTokens = tokens.map(t => t.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    const regex = new RegExp(`(${escapedTokens.join('|')})`, 'gi');
    const parts = snippet.split(regex);

    return parts.map((part, i) =>
      tokens.includes(part.toLowerCase()) ? (
        <mark key={`highlight-${i}`} style={{ background: '#c19b41', color: '#000', borderRadius: '2px', padding: '0 2px', fontWeight: 'bold' }}>
          {part}
        </mark>
      ) : part
    );
  };

  const isSearching = searchTerm.trim().length > 1;

  return (
    <div className="gu-shell">
      <header className="gu-topbar">
        <div>
          <div className="gu-title">RULES DIRECTORY</div>
          <div className="gu-subtitle">Master of Gu SRD</div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <a
            href="/pdfs/Southern Border Master of Gu.pdf"
            download
            className="rule-directory-button"
            style={{ textDecoration: 'none' }}
          >
            Download PDF
          </a>
          <Link to="/" className="rule-directory-button" style={{ textDecoration: 'none' }}>
            Gu Index
          </Link>
        </div>

      </header>

      <main className="gu-main" style={{ padding: '20px' }}>
        <div className="rules-container" style={{ maxWidth: '800px', margin: '0 auto' }}>

          <div className="directory-search-wrap">
            <input
              type="text"
              placeholder="Search all rules content (e.g., 'luck', 'stealth')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="directory-search"
            />
          </div>

          {isSearching ? (
            <div className="search-results">
              <h3 className="directory-results-header">
                Search Results ({searchResults.length})
              </h3>

              {searchResults.length > 0 ? (
                <div className="directory-results-list">
                  {searchResults.map((result, index) => (
                    <Link
                      key={`${result.title || 'untitled'}-${index}`}
                      to={`/rules/${slugify(result.title)}`}
                      className="directory-result-card"
                    >
                      <div className="directory-result-title">
                        {result.title}
                      </div>
                      <div className="directory-result-snippet">
                        {getSnippetAndHighlight(result.content, searchTerm)}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="directory-empty">
                  No rules matches found for "{searchTerm}".
                </div>
              )}
            </div>
          ) : (
            <>
              <nav className="directory-jumpnav">
                {SECTIONS.map((section, idx) => (
                  <span
                    key={`jump-${idx}`}
                    className="directory-jump-pill"
                    onClick={() => scrollToSection(idx)}
                  >
                    <span className="num">{ROMAN[idx]}</span> {section.title}
                  </span>
                ))}
              </nav>

              <div className="directory-toolbar">
                <button type="button" className="directory-toggle-all" onClick={toggleAll}>
                  {allOpen ? 'Collapse All' : 'Expand All'}
                </button>
              </div>

              {SECTIONS.map((section, idx) => {
                const isOpen = openSections[idx];
                const isSingle = section.chapters.length === 1;
                return (
                  <div key={`section-${idx}`} id={`rules-section-${idx}`} className="directory-section">
                    <div
                      className="directory-section-header"
                      onClick={() => toggleSection(idx)}
                      role="button"
                      aria-expanded={isOpen}
                    >
                      <div className="directory-section-num">{ROMAN[idx]}</div>
                      <div className="directory-section-titles">
                        <div className="directory-section-title">{section.title}</div>
                        <div className="directory-section-desc">{section.desc}</div>
                      </div>
                      <div className="directory-section-count">
                        {section.chapters.length} {section.chapters.length === 1 ? 'page' : 'chapters'}
                      </div>
                      <ChevronIcon open={isOpen} />
                    </div>

                    {isOpen && (
                      <div className="directory-section-body">
                        {isSingle ? (
                          <Link
                            to={`/rules/${slugify(section.chapters[0])}`}
                            className="directory-single-link"
                          >
                            {section.chapters[0]}
                          </Link>
                        ) : (
                          <div className="directory-grid">
                            {section.chapters.map((rule, chapterIdx) => (
                              <Link
                                key={`link-${rule}`}
                                to={`/rules/${slugify(rule)}`}
                                className="directory-chapter-link"
                              >
                                <span className="directory-chapter-index">
                                  {String(chapterIdx + 1).padStart(2, '0')}
                                </span>
                                <span>{rule}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default RulesDirectory;
