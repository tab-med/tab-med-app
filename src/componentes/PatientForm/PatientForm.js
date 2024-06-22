import React, { useState, useEffect } from 'react';
import './PatientForm.css';
import patientService from '../services/patient'; // Importa o serviço de paciente

function PatientForm({ patientId, onPatientSaved }) {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    birthDate: '',
    // Outros campos relevantes para o paciente (telefone, endereço, etc.)
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Busca os dados do paciente se o ID for fornecido (edição)
    if (patientId) {
      const fetchPatient = async () => {
        try {
          const data = await patientService.getPatientById(patientId);
          setFormData(data);
        } catch (err) {
          setError(err.message || 'Erro ao buscar dados do paciente');
        }
      };
      fetchPatient();
    }
  }, [patientId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (patientId) {
        await patientService.updatePatient(patientId, formData);
      } else {
        await patientService.createPatient(formData);
      }
      setError('');
      onPatientSaved(); // Notifica o componente pai que o paciente foi salvo
    } catch (err) {
      setError(err.message || 'Erro ao salvar paciente');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div className="patient-form-container">
      <h2>{patientId ? 'Editar Paciente' : 'Novo Paciente'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="cpf">CPF:</label>
          <input type="text" id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="birthDate">Data de Nascimento:</label>
          <input type="date" id="birthDate" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
        </div>
        {/* Outros campos do paciente */}
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Carregando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
}

export default PatientForm;