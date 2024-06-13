import React, { useState, useEffect } from 'react';
import './MedicalForm.css';
import medicalFormService from '../services/medicalForm'; // Importa o serviço de formulário médico

function MedicalForm({ patientId }) {
  const [formData, setFormData] = useState({
    patientId: patientId, // ID do paciente associado
    // Outros campos do formulário médico (ex: queixas, histórico, etc.)
    complaints: '',
    history: '',
    diagnosis: '',
    treatment: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Lógica para buscar dados do formulário médico existente (se houver)
  useEffect(() => {
    if (patientId) {
      const fetchMedicalForm = async () => {
        try {
          const data = await medicalFormService.getMedicalFormByPatientId(patientId);
          setFormData(data);
        } catch (err) {
          setError(err.message || 'Erro ao buscar formulário médico');
        }
      };
      fetchMedicalForm();
    }
  }, [patientId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (patientId) {
        await medicalFormService.updateMedicalForm(formData);
      } else {
        await medicalFormService.createMedicalForm(formData);
      }
      // Redirecionar ou atualizar a página após o sucesso
    } catch (err) {
      setError(err.message || 'Erro ao salvar formulário médico');
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
    <div className="medical-form-container">
      <h2>Formulário Médico</h2>
      <form onSubmit={handleSubmit}>
        {/* Campos do formulário */}
        <div>
          <label htmlFor="complaints">Queixas:</label>
          <textarea id="complaints" name="complaints" value={formData.complaints} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="history">Histórico:</label>
          <textarea id="history" name="history" value={formData.history} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="diagnosis">Diagnóstico:</label>
          <textarea id="diagnosis" name="diagnosis" value={formData.diagnosis} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="treatment">Tratamento:</label>
          <textarea id="treatment" name="treatment" value={formData.treatment} onChange={handleChange} />
        </div>
        {/* Outros campos */}
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Carregando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
}

export default MedicalForm;
