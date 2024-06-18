// services/patient.js

//const API_URL = 'http://localhost:8080';

const patientService = {
  createPatient: async (patientData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/patients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Incluir o token de autenticação
      },
      body: JSON.stringify(patientData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao criar paciente');
    }

    return response.json(); // Retorna os dados do paciente criado
  },

  getPatientById: async (patientId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/patients/${patientId}`, {
      headers: {
        'Authorization': `Bearer ${token}` // Incluir o token de autenticação
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar paciente');
    }

    return response.json(); // Retorna os dados do paciente
  },

  updatePatient: async (patientId, patientData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/patients/${patientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Incluir o token de autenticação
      },
      body: JSON.stringify(patientData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao atualizar paciente');
    }

    return response.json(); // Retorna os dados do paciente atualizado
  },

  deletePatient: async (patientId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/patients/${patientId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}` // Incluir o token de autenticação
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir paciente');
    }

    return response.json(); // Retorna uma mensagem de sucesso (opcional)
  },

  // Função para buscar todos os pacientes (se necessário)
  getAllPatients: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/patients`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar pacientes');
    }

    return response.json();
  }
};

export default patientService;
