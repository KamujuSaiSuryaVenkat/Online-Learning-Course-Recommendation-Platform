import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/courses', label: 'Explore' },
    { to: '/recommendations', label: 'For You' },
    { to: '/my-learning', label: 'My Learning' },
  ];

  const handleLogout = () => { logout(); navigate('/login'); };
  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/dashboard" className="nav-logo">Learn<span>Flow</span></Link>
        <div className="nav-links">
          {links.map(l => (
            <Link key={l.to} to={l.to} className={`nav-link ${location.pathname === l.to ? 'active' : ''}`}>{l.label}</Link>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, color: 'var(--warning)', fontWeight: 600 }}>🔥 {user?.streak || 0}</span>
          <span style={{ fontSize: 13, color: 'var(--accent-light)', fontWeight: 600 }}>⚡ {user?.totalPoints || 0} pts</span>
          <Link to="/profile" className="nav-user">
            <div className="nav-avatar">{initials}</div>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{user?.name?.split(' ')[0]}</span>
          </Link>
          <button onClick={handleLogout} className="btn btn-outline btn-sm">Logout</button>
        </div>
      </div>
    </nav>
  );
}
