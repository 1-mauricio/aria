import React from 'react';

export default function Donate() {
  return (
    <main className="donate-container">
      <section className="donate-header">
        <h1>Apoie o Imprensa Malakoff</h1>
        <p>Ajude-nos a manter o conteúdo gratuito e de qualidade.</p>
      </section>
      
      <section className="donate-options">
        <div className="donate-card">
          <h2>PIX</h2>
          <p>Chave: exemplo@imprensamalakoff.com</p>
          <button className="donate-button">Copiar Chave</button>
        </div>

        {/*
        <div className="donate-card">
          <h2>Assinatura Mensal</h2>
          <p>A partir de R$9,90/mês</p>
          <button className="donate-button">Assinar</button>
        </div>
        */}

        {/*
        <div className="donate-card">
          <h2>Contribuição Única</h2>
          <p>Escolha o valor</p>
          <button className="donate-button">Contribuir</button>
        </div>
        */}
        </section>
      
    </main>
  );
}