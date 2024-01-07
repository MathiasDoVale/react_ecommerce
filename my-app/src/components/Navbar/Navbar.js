import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar({ setGender }) {
  const handleClick = (gender) => {
    setGender(gender);
  };

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/" onClick={() => handleClick('')}>All</Link></li>
        <li><Link to="/?gender=man" onClick={() => handleClick('man')}>Men</Link></li>
        <li><Link to="/?gender=woman" onClick={() => handleClick('woman')}>Women</Link></li>
        <li><Link to="/?gender=boy" onClick={() => handleClick('boy')}>Boys</Link></li>
        <li><Link to="/?gender=girl" onClick={() => handleClick('girl')}>Girls</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;