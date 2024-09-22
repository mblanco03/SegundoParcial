import React, { useState } from 'react';
import './app.css';

const App: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [creditos, setCreditos] = useState<number | ''>('');
  const [descripcion, setDescripcion] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const curso = { nombre, creditos: Number(creditos), descripcion };
    
    try {
      const response = await fetch('https://test-deploy-12.onrender.com/cursos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(curso),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Curso creado:', result);
        setMessage('Curso creado con éxito!');
        handleClear();
      } else {
        setMessage('Error al crear el curso.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error al conectar con el servidor.');
    }
  };

  const handleClear = () => {
    setNombre('');
    setCreditos('');
    setDescripcion(''); 
  };

  return (
    <div className="app-container">
      <h1>Creación de Cursos</h1>
      <form onSubmit={handleSubmit}>
        <label>Nombre del Curso:</label>
        <input 
          type="text" 
          placeholder="Nombre del Curso" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
        />

        <label>Créditos:</label>
        <input 
          type="number" 
          placeholder="Créditos" 
          value={creditos} 
          onChange={(e) => setCreditos(Number(e.target.value))} 
        />

        <label>Descripción:</label>
        <textarea 
          placeholder="Descripción" 
          value={descripcion} 
          onChange={(e) => setDescripcion(e.target.value)} 
        />

        <button type="submit">Crear Curso</button>
        <button type="button" onClick={handleClear}>Limpiar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
