import { useNavigate } from 'react-router-dom';
import './LoginNavbar.css';

const LoginNavbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="loginNavbar">
      <ul>
        {token ? (
          <>
            <li><button onClick={handleLogout} style={{background: 'none', border: 'none', padding: 0, color: 'grey', textDecoration: 'none', cursor: 'pointer'}}>Logout</button></li>
          </>
        ) : (
          <>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Register</a></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default LoginNavbar;