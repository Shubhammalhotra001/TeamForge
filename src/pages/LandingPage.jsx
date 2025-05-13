import React from 'react';
import './LandingPage.css'; // We'll use your CSS file
import { Link } from 'react-router-dom';

<nav>
  <Link to="/auth?mode=signup">Sign Up</Link>
  <Link to="/auth?mode=login">Login</Link>
</nav>

const LandingPage = () => {
  return (
    <div>
      {/* Header */}
      <header>
        <div className="logo">TeamForge</div>
        <nav>
          <a href="/auth?mode=signup">Sign Up</a>
          <a href="/auth?mode=login">Login</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="text">
          <h1>TeamForge</h1>
          <p>Find the perfect teammates and hackathons to bring your ideas to life. Collaborate, build, and win—together.</p>
          <a href="/auth?mode=signup">
            <button className="btn">Get Started</button>
          </a>
        </div>
        <div className="image">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
            alt="Team collaborating"
          />
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="feature-card">
          <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=200&q=80" alt="Hackathon Finder" />
          <h3>Hackathon Finder</h3>
          <p>Explore and filter upcoming hackathons by tech stack, region, and interests.</p>
        </div>

        <div className="feature-card">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80" alt="AI Team Matcher" />
          <h3>AI Team Matcher</h3>
          <p>Get matched with teammates based on skills, experience, and project goals.</p>
        </div>

        <div className="feature-card">
          <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=200&q=80" alt="Live Tracker" />
          <h3>Live Tracker</h3>
          <p>Track deadlines, events, and submission timelines in real time.</p>
        </div>
      </section>

      {/* Winning Together */}
      <section className="winning">
        <h2>Win Together</h2>
        <p>Collaborate seamlessly, share ideas, and achieve victory as a team.</p>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2025 TeamForge. All rights reserved.</p>
        <p>
          <a href="#">About Us</a> | <a href="#">Contact</a> | <a href="#">Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
