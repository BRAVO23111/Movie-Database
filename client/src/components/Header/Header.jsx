import React from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaFilm, FaInfoCircle, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

const Header = () => {
  const token = window.localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Movie Database</Link>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">
              <FaHome style={{ marginRight: '5px' }} /> Home
            </Link>
          </li>
          <li>
            <Link to="/saved">
              <FaFilm style={{ marginRight: '5px' }} /> Movies
            </Link>
          </li>
          <li>
            <Link to="/about">
              <FaInfoCircle style={{ marginRight: '5px' }} /> About
            </Link>
          </li>
          {token ? (
            <li>
              <Link to="/login" onClick={handleLogout}>
                <FaSignOutAlt style={{ marginRight: '5px' }} /> Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login">
                <FaSignInAlt style={{ marginRight: '5px' }} /> Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
