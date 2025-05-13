// src/pages/TeamMatching.jsx
import React, { useState } from 'react';

const TeamMatching = () => {
  const [techStack, setTechStack] = useState('');
  const [preferences, setPreferences] = useState('');

  const handleMatch = () => {
    // Handle AI matching logic or API calls here.
    console.log('Tech Stack:', techStack);
    console.log('Preferences:', preferences);
  };

  return (
    <div>
      <h1>AI Team Matching</h1>
      <input 
        type="text" 
        value={techStack}
        onChange={(e) => setTechStack(e.target.value)} 
        placeholder="Enter your tech stack" 
      />
      <input 
        type="text" 
        value={preferences}
        onChange={(e) => setPreferences(e.target.value)} 
        placeholder="Enter your preferences (e.g., Frontend, Backend)" 
      />
      <button onClick={handleMatch}>Find Teammates</button>
    </div>
  );
};

export default TeamMatching;
