// services/auth.js

const API_URL = 'http://localhost:8080';

const authService = {
  login: async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, { // Endpoint de login
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Credenciais inválidas');
      }

      const userData = await response.json();
      localStorage.setItem('token', userData.token); // Armazenar token no localStorage
      localStorage.setItem('user', JSON.stringify(userData.user)); // Armazenar dados do usuário
      return userData.user; 
    } catch (error) {
      throw error; // Propagar o erro para o componente que chamou a função
    }
  },

  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return null; // Usuário não autenticado
      }

      const user = JSON.parse(localStorage.getItem('user'));
      return user; 
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
      return null;
    }
  }
};

export default authService;
