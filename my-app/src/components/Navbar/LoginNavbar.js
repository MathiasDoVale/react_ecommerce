import React from 'react';

import './Navbar.css';
import './LoginNavbar.css';

function LoginNavbar() {
  
  return (
    <nav className="loginNavbar">
      <ul>
        <li><a href="/">LOGIN</a></li>
        <li><a href="/about">REGISTER</a></li>
      </ul>
    </nav>
  );
}

export default LoginNavbar;