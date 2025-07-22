import React from 'react';

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#0EA5E9',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 'bold', margin: '0 0 20px 0' }}>
        El-Manassa
      </h1>
      <h2 style={{ fontSize: '2rem', margin: '0 0 40px 0', textAlign: 'center' }}>
        Online Learning Platform for Egypt
      </h2>
      <button 
        style={{
          backgroundColor: 'white',
          color: '#0EA5E9',
          padding: '15px 40px',
          fontSize: '1.2rem',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
        onClick={() => alert('Welcome to El-Manassa! 🎓')}
      >
        Get Started
      </button>
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <p>✨ Multi-tenant Learning Platform</p>
        <p>🌍 Built for Egyptian Education</p>
        <p>📱 Flutter Mobile + React Web</p>
      </div>
    </div>
  );
}

export default App;