import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Styles.css';

// The extracted relationships from the diagram
const pathData = {
  "Blood": ["Enslavement", "Water", "Wood"],
  "Dark": ["Space", "Poison", "Theft"],
  "Earth": ["Metal", "Wood"],
  "Enslavement": ["Blood", "Soul", "Theft"],
  "Fire": ["Food", "Light", "Lightning", "Metal", "Wind"],
  "Food": ["Fire", "Poison", "Strength"],
  "Formation": ["Information", "Rule", "Space"],
  "Ice": ["Water", "Wind"],
  "Information": ["Formation", "Rule", "Wisdom"],
  "Light": ["Fire", "Lightning", "Sound"],
  "Lightning": ["Fire", "Light", "Wind"],
  "Luck": ["Rule"],
  "Metal": ["Earth", "Fire", "Strength", "Sword"],
  "Poison": ["Dark", "Food", "Wood"],
  "Refinement": ["Soul", "Wisdom"],
  "Rule": ["Information", "Luck", "Wisdom"],
  "Soul": ["Enslavement", "Refinement", "Strength", "Wisdom"], // Followed the long top/right border line to Strength
  "Sound": ["Light", "Sword"],
  "Space": ["Dark", "Formation", "Time"], // Interpreted the >>>>> arrows as a connection to Wisdom
  "Strength": ["Food", "Metal", "Soul"],
  "Sword": ["Metal", "Sound"],
  "Theft": ["Dark", "Enslavement"],
  "Time": ["Space", "Wisdom"],
  "Water": ["Blood", "Ice"],
  "Wind": ["Fire", "Ice", "Lightning"],
  "Wisdom": ["Information", "Refinement", "Soul", "Time"],
  "Wood": ["Blood", "Earth", "Poison", "Water"]
};

export default function PathCompatibilities() {
  const [selectedPath, setSelectedPath] = useState(null);
  const allPaths = Object.keys(pathData).sort();

  return (
    <div className="gu-shell">
        <header className="gu-topbar">
            <div>
                <div className="gu-title">Creating Unique Gu</div>
                <div className="gu-subtitle">Master of Gu SRD</div>
            </div>
            <Link to="/rules" className="rule-directory-button" style={{ textDecoration: 'none' }}>
                ← Back to Directory
            </Link>
        </header>
      
      <div style={{ display: 'flex', gap: '30px', fontFamily: 'sans-serif', color: '#e0e0e0' }}>
        {/* Sidebar List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '200px', maxHeight: '600px', overflowY: 'auto', paddingRight: '10px' }}>
            <h3 style={{ borderBottom: '1px solid #444', paddingBottom: '10px', marginBottom: '10px' }}>All Paths</h3>
            {allPaths.map((path) => (
            <button
                key={path}
                onClick={() => setSelectedPath(path)}
                style={{
                padding: '10px 15px',
                textAlign: 'left',
                background: selectedPath === path ? '#4a90e2' : '#2a2a2a',
                color: selectedPath === path ? '#ffffff' : '#e0e0e0',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'background 0.2s',
                fontWeight: selectedPath === path ? 'bold' : 'normal'
                }}
                onMouseEnter={(e) => { if (selectedPath !== path) e.target.style.background = '#333' }}
                onMouseLeave={(e) => { if (selectedPath !== path) e.target.style.background = '#2a2a2a' }}
            >
                {path}
            </button>
            ))}
        </div>

        {/* Main View */}
        <div style={{ flex: 1, padding: '20px', background: '#1e1e1e', borderRadius: '8px', border: '1px solid #333' }}>
            {selectedPath ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h2 style={{ fontSize: '2rem', margin: 0, color: '#fff' }}>
                {selectedPath}
                </h2>
                <p style={{ color: '#aaa', margin: 0 }}>Compatible Paths:</p>
                
                <div className="compatibility-buttons" style={{ justifyContent: 'center' }}>
                {pathData[selectedPath].map((compat) => (
                    <button
                    key={compat}
                    onClick={() => setSelectedPath(compat)}
                    style={{
                        padding: '12px 24px',
                        background: '#333',
                        color: '#4a90e2',
                        border: '1px solid #4a90e2',
                        borderRadius: '24px',
                        cursor: 'pointer',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = '#4a90e2';
                        e.target.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = '#333';
                        e.target.style.color = '#4a90e2';
                    }}
                    >
                    {compat}
                    </button>
                ))}
                </div>
                <button
                    onClick={() => {}}
                    style={{
                        padding: '12px 24px',
                        background: '#464646',
                        color: '#4a90e2',
                        border: '1px solid #4a90e2',
                        borderRadius: '24px',
                        cursor: 'pointer',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        transition: 'all 0.2s',
                    }}
                >
                    Transformation
                </button>
            </div>
        ) : (
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
            <p>Select a path from the list to view its compatibilities.</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}