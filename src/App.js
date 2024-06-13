import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login/Login';
import MainPage from './components/MainPage/MainPage';
import authService from './services/auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const user = await authService.getCurrentUser();
      setIsAuthenticated(!!user); // Define como autenticado se houver um usuário
    };
    checkAuthentication();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    authService.logout(); // Implemente a função logout em authService
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <MainPage onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
