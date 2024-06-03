// services/auth.js

const API_URL = 'http://localhost:8080'; // Substitua pelo endereço da sua API

const authService = {
  login: async (username, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao fazer login');
    }

    const userData = await response.json();
    // Armazene o token no localStorage ou sessionStorage
    localStorage.setItem('token', userData.token);
    return userData;
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    const response = await fetch(`${API_URL}/users/current`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar dados do usuário');
    }

    return response.json();
  }
};

export default authService;
