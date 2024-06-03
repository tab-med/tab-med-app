import React, { useState, useEffect } from 'react';
import './MainPage.css';
import PatientForm from '../PatientForm/PatientForm';
import PatientList from '../PatientList/PatientList';
import MedicalForm from '../MedicalForm/MedicalForm';
import authService from '../services/auth'; // Importa o serviço de autenticação

function MainPage() {
  const [activeComponent, setActiveComponent] = useState('PatientList');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Erro ao buscar dados do usuário:', err);
        // Lógica para lidar com erro (ex: redirecionar para o login)
      }
    };
    fetchUser();
  }, []);

  const handleNavigation = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="main-page-container">
      <header>
        <h1>Bem-vindo, {user ? user.name : 'Usuário'}</h1>
        <nav>
          <button onClick={() => handleNavigation('PatientList')}>Pacientes</button>
          {user && user.role === 'Medico' && (
            <button onClick={() => handleNavigation('MedicalForm')}>Formulário Médico</button>
          )}
          <button onClick={() => handleNavigation('PatientForm')}>Novo Paciente</button>
        </nav>
      </header>
      <main>
        {activeComponent === 'PatientList' && <PatientList />}
        {activeComponent === 'PatientForm' && <PatientForm />}
        {activeComponent === 'MedicalForm' && <MedicalForm />}
      </main>
    </div>
  );
}

export default MainPage;
