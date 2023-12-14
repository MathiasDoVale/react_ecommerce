import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="/">MEN</a></li>
        <li><a href="/about">WOMEN</a></li>
        <li><a href="/contact">BOYS</a></li>
        <li><a href="/contact">GIRLS</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;