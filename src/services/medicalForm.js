// services/medicalForm.js

//const API_URL = 'http://localhost:8080';

const medicalFormService = {
  createMedicalForm: async (formData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/medical-forms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao criar formulário médico');
    }
    return response.json();
  },

  getMedicalFormByPatientId: async (patientId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/medical-forms/patient/${patientId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Erro ao buscar formulário médico');
    }
    return response.json();
  },

  updateMedicalForm: async (formData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/medical-forms/${formData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao atualizar formulário médico');
    }
    return response.json();
  },

  // Função para excluir formulário médico (se necessário)
  // ...
};

export default medicalFormService;
