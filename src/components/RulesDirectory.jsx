import React from 'react';
import { Link } from 'react-router-dom';
import './Styles.css';

const RulesDirectory = () => {
  const slugify = (text) => 
    text.toLowerCase()
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
      "Gu", "Refinement Recipes", "Creating Unique Gu", "Path Compatibilities", 
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
          {groups.map((group, groupIdx) => (
            <React.Fragment key={groupIdx}>
              <div className="rules-group" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {group.map((rule) => (
                  rule === "Combat" ? (
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#c19b41' }}>Combat</div>
                  ) : (
                    <Link 
                      key={rule} 
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
          ))}
        </div>
      </main>
    </div>
  );
};

export default RulesDirectory;