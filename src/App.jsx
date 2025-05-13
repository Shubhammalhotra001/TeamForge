import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'; // Update the paths accordingly
import HackathonExplorer from './pages/HackathonExplorer';
import HackathonDetails from './pages/HackathonDetails';
import ProfileDashboard from './pages/ProfileDashboard'; // Remove the duplicate import
import AuthPage from './AuthPage'; // Assuming you have a LoginPage
import CreateProfile from './pages/CreateProfile';
import ProfileEdit from './pages/ProfileEdit';
import SkillMatching from './pages/SkillMatching';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />
        <Route path="/hackathon-explorer" element={<HackathonExplorer />} />
        <Route path="/hackathon-details" element={<HackathonDetails />} />
        <Route path="/profile" element={<ProfileDashboard />} />
        {/* <Route path="/" element={<AuthPage />} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} /> 
        <Route path="/skill-matching" element={<SkillMatching />} />
      </Routes>
    </Router>
  );
}

export default App;
