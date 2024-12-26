// src/components/Pages/Subscribe.js
import React, { useState } from 'react';

export default function Subscribe() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interests: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para processar a inscrição
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className="subscribe-container">
      <section className="subscribe-header">
        <h1>Inscreva-se no Imprensa Malakoff</h1>
        <p>Receba as últimas notícias e artigos diretamente na sua caixa de entrada.</p>
      </section>
      
      <section className="subscribe-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          
          
          <button type="submit" className="subscribe-button">
            Inscrever-se
          </button>
        </form>
      </section>
    </main>
  );
}
