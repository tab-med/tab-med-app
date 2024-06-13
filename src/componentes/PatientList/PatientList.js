import React, { useState, useEffect } from 'react';
import './PatientList.css';
import patientService from '../services/patient';
import PatientForm from '../PatientForm/PatientForm';

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await patientService.getAllPatients();
        setPatients(data);
      } catch (err) {
        setError(err.message || 'Erro ao buscar pacientes');
      }
    };
    fetchPatients();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPatients = patients.filter(patient => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      patient.name.toLowerCase().includes(searchTermLower) ||
      patient.cpf.includes(searchTerm)
    );
  });

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setShowForm(true);
  };

  const handleDelete = async (patientId) => {
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      try {
        await patientService.deletePatient(patientId);
        setPatients(patients.filter(p => p.id !== patientId));
      } catch (err) {
        setError(err.message || 'Erro ao excluir paciente');
      }
    }
  };

  const handlePatientSaved = () => {
    setShowForm(false);
    setSelectedPatient(null);
    // Atualiza a lista de pacientes após salvar
    patientService.getAllPatients().then(data => setPatients(data));
  };

  return (
    <div className="patient-list-container">
      <h2>Lista de Pacientes</h2>
      <input
        type="text"
        placeholder="Pesquisar por nome ou CPF"
        value={searchTerm}
        onChange={handleSearch}
      />
      {error && <p className="error-message">{error}</p>}
      <ul>
        {filteredPatients.map(patient => (
          <li key={patient.id}>
            <span onClick={() => handleEdit(patient)}>{patient.name} ({patient.cpf})</span>
            <button onClick={() => handleDelete(patient.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      {showForm && (
        <PatientForm patientId={selectedPatient?.id} onPatientSaved={handlePatientSaved} />
      )}
    </div>
  );
}

export default PatientList;
