import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchIndex } from '../searchIndex'; // Adjust this path if necessary
import './Styles.css';

const RulesDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const slugify = (text) => 
    (text || '')
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');

  const groups = [
    [
      "The Aperture", "Primeval Essence", "Primeval Stones", 
      "The World", "The Dice Mechanic", "Running the Game", 
      "Character Creation", "Attributes", "Skills", "Cultivation", 
      "Downtime", "Talents", "Refinement Techniques", "Attainment"
    ],
    [
      "Gu", "Refinement Recipes", "Creating Unique Gu", "Gu Keywords", "Path Compatibilities", 
      "Enslavement Path (Unfinished)", "Killer Moves", 
      "Formations (Unfinished)", "Gu Houses (Unfinished)"
    ],
    [
      "Combat", "Actions and the Initiative, The Turn", "Movement", "Flying", 
      "Combat Actions", "Reactions", "Damage", "Ranges", "High Ground", 
      "Cover", "Light"
    ],
    ["Status Effects"],
    ["Gear"],
    ["Rock Gambling"],
    ["Beasts"]
  ];

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
        <Link to="/" className="rule-directory-button" style={{ textDecoration: 'none' }}>
          Gu Index
        </Link>
      </header>

      <main className="gu-main" style={{ padding: '20px' }}>
        <div className="rules-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '30px' }}>
            <input
              type="text"
              placeholder="Search all rules content (e.g., 'luck', 'stealth')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '1.1rem',
                borderRadius: '8px',
                border: '1px solid #444',
                background: '#222',
                color: '#e0e0e0',
                boxSizing: 'border-box',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#c19b41'}
              onBlur={(e) => e.target.style.borderColor = '#444'}
            />
          </div>

          {isSearching ? (
            <div className="search-results">
              <h3 style={{ color: '#c19b41', marginBottom: '15px', fontSize: '1.3rem' }}>
                Search Results ({searchResults.length})
              </h3>
              
              {searchResults.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {searchResults.map((result, index) => (
                    <Link 
                      key={`${result.title || 'untitled'}-${index}`} 
                      to={`/rules/${slugify(result.title)}`}
                      className="rule-link"
                      style={{ 
                        display: 'block',
                        color: '#e0e0e0', 
                        textDecoration: 'none', 
                        fontSize: '1.15rem',
                        padding: '14px 16px',
                        background: '#1a1a1a',
                        borderRadius: '6px',
                        borderLeft: '4px solid #c19b41',
                        transition: 'background 0.2s, transform 0.1s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#252525';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#1a1a1a';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <div style={{ fontWeight: 'bold', color: '#fff', marginBottom: '6px' }}>
                        {result.title}
                      </div>
                      <div style={{ fontSize: '0.95rem', color: '#b0b0b0', lineHeight: '1.4' }}>
                        {getSnippetAndHighlight(result.content, searchTerm)}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div style={{ color: '#888', fontSize: '1.1rem', textAlign: 'center', marginTop: '40px' }}>
                  No rules matches found for "{searchTerm}".
                </div>
              )}
            </div>
          ) : (
            groups.map((group, groupIdx) => (
              <React.Fragment key={`group-${groupIdx}`}>
                <div className="rules-group" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {group.map((rule) => (
                    rule === "Combat" ? (
                      <div key={`header-${rule}`} style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#c19b41', marginTop: '5px' }}>
                        Combat
                      </div>
                    ) : (
                      <Link 
                        key={`link-${rule}`} 
                        to={`/rules/${slugify(rule)}`}
                        className="rule-link"
                        style={{ 
                          color: '#e0e0e0', 
                          textDecoration: 'none', 
                          fontSize: '1.1rem',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.background = '#333'}
                        onMouseLeave={(e) => e.target.style.background = 'transparent'}
                      >
                        {rule}
                      </Link>
                    )
                  ))}
                </div>
                {groupIdx < groups.length - 1 && (
                  <hr style={{ border: '0', borderTop: '1px solid #444', margin: '25px 0' }} />
                )}
              </React.Fragment>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default RulesDirectory;