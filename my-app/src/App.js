import React, { useState }  from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useMatch, useLocation, Navigate } from 'react-router-dom';
import ItemDetail from './components/ItemDetail/ItemDetail';
import Navbar from './components/Navbar/Navbar';
import LoginNavbar from './components/Navbar/LoginNavbar';
import Catalog from './components/Catalog/Catalog';
import BackButton from './components/Navbar/BackButton';

function App() {
  const [gender, setGender] = useState(null);
  const match = useMatch("/:id");
  
  function MainContent() {
    
    
    return (
      <Routes>
        <Route path="/" element={<Catalog gender={gender}/>} />
        <Route path="/:id" element={<ItemDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }
  
  return (
      <div className="App">
        <LoginNavbar />
        <ShowNavbar setGender={setGender} />
        {match && (<BackButton />)}
        <MainContent />
      </div>
  );
}

function ShowNavbar({ setGender }) {
  const location = useLocation();

  return location.pathname === '/' ? <Navbar setGender={setGender}/> : null;
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
