import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();
  const {setAuthUser} = useAuth();
  const [query, setQuery] = useState('');
  const [techOpen, setTechOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem('authUser');
    setAuthUser(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/logout`, {
        method: 'POST',
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('Failed to log out');
      }
  
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  
  const handleAccount = () => {
    navigate(`/account`)
  }

  const userpage = () => {
    navigate('/users');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className={`sidebar ${theme}`}>
      <div className="sidebar-header">
        <h4>Staff Portal</h4>

      </div>

      <div className="sidebar-search">
        <input
          type="text"
          placeholder="Search globally..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <svg className="search-icon" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <h6>General</h6>
          <ul>
            <li>
              <Link to="/dashboard">
                <svg viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/players">
                <svg viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                Players
              </Link>
            </li>
            <li>
              <Link to="/recent">
                <svg viewBox="0 0 24 24">
                  <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                </svg>
                Recently Edited
              </Link>
            </li>
            <li>
              <Link to="/requests">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
                Requests
              </Link>
            </li>
            <li>
              <Link to="/bugs">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M256 0c53 0 96 43 96 96l0 3.6c0 15.7-12.7 28.4-28.4 28.4l-135.1 0c-15.7 0-28.4-12.7-28.4-28.4l0-3.6c0-53 43-96 96-96zM41.4 105.4c12.5-12.5 32.8-12.5 45.3 0l64 64c.7 .7 1.3 1.4 1.9 2.1c14.2-7.3 30.4-11.4 47.5-11.4l112 0c17.1 0 33.2 4.1 47.5 11.4c.6-.7 1.2-1.4 1.9-2.1l64-64c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-64 64c-.7 .7-1.4 1.3-2.1 1.9c6.2 12 10.1 25.3 11.1 39.5l64.3 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c0 24.6-5.5 47.8-15.4 68.6c2.2 1.3 4.2 2.9 6 4.8l64 64c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-63.1-63.1c-24.5 21.8-55.8 36.2-90.3 39.6L272 240c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 239.2c-34.5-3.4-65.8-17.8-90.3-39.6L86.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l64-64c1.9-1.9 3.9-3.4 6-4.8C101.5 367.8 96 344.6 96 320l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64.3 0c1.1-14.1 5-27.5 11.1-39.5c-.7-.6-1.4-1.2-2.1-1.9l-64-64c-12.5-12.5-12.5-32.8 0-45.3z"/>
                </svg>
                Bug Reports
              </Link>
            </li>
          </ul>
        </div>

        <div className="nav-section">
          <div className="gd-title">
            <h6 
              onClick={() => setTechOpen(!techOpen)}
            >Game Design</h6>
            <button 
              className="nav-toggle" 
              onClick={() => setTechOpen(!techOpen)}
              aria-expanded={techOpen}
            > {techOpen ? '−' : '+'}
              {/* No text needed - using CSS pseudo-element */}
            </button>
          </div>
          {techOpen && (
            <ul className="submenu">
              <Link to="/channels"></Link>
              <Link to="/citems"></Link>
              <Link to="/fishing"></Link>
              <Link to="/recipes"></Link>
              <Link to="/cooldowns"></Link>
              <Link to="/cosmetics"></Link>
              <Link to="/currencies"></Link>
              <Link to="/guis"></Link>
              <Link to="/interactions"></Link>
              <Link to="/loottables"></Link>
              <Link to="/professions"></Link>
              <Link to="/stats"></Link>
              <Link to="/unlockables"></Link>
            </ul>
          )}
        </div>
      </nav>

      <div className="sidebar-footer">        
        <div className="footer-buttons-row">
          <button 
            onClick={handleAccount}
            className="account-btn"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
            </svg>
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            <svg viewBox="0 0 24 24">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
            </svg>
            Logout
          </button>
          <button 
            onClick={toggleTheme}
            className="theme-toggle-icon"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;