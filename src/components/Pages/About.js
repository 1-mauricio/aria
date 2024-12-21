import React from 'react';
import '../styles/pages.css'; // Se você estiver usando um arquivo de estilo externo, caso contrário, adicione o estilo aqui.

export default function About() {
  return (
    <main className="about-container">
      <div className="about-header">
        <h1>Sobre o Blog</h1>
        <p>Bem-vindo ao <strong>ImprensaMalakoff</strong>, o seu lugar para reflexões profundas, análises detalhadas e histórias inspiradoras sobre design, tecnologia, ética e muito mais!</p>
      </div>
      <section className="about-content">
        <h2>O Que Fazemos?</h2>
        <p>No <strong>ImprensaMalakoff</strong>, acreditamos no poder das palavras para inspirar mudanças e provocar discussões. Nosso objetivo é explorar as interseções entre tecnologia, ética, design e as questões sociais contemporâneas. Através de artigos, análises e estudos de caso, buscamos não apenas informar, mas também incentivar nossos leitores a pensar criticamente sobre o mundo ao seu redor.</p>

        <h2>Nossa Missão</h2>
        <p>Nossa missão é fornecer conteúdo que não apenas eduque, mas também desafie as percepções. Queremos ser um ponto de encontro para aqueles que buscam um olhar mais profundo sobre os tópicos que moldam o presente e o futuro da sociedade digital. Seja você um entusiasta de tecnologia, um designer ou alguém com interesse por questões éticas, temos algo para você.</p>

        <h2>Nossos Valores</h2>
        <ul>
          <li><strong>Transparência:</strong> Priorizamos a clareza e a abertura em todas as nossas discussões.</li>
          <li><strong>Inovação:</strong> Buscamos sempre trazer uma perspectiva inovadora e criativa em nossos artigos.</li>
          <li><strong>Responsabilidade:</strong> Acreditamos na importância de sermos responsáveis ao abordar temas complexos, especialmente no que diz respeito a ética e impacto social.</li>
        </ul>

        <h2>Entre em Contato</h2>
        <p>Tem alguma dúvida, sugestão ou quer apenas bater um papo sobre um dos nossos artigos? Adoraríamos ouvir de você!</p>
        <div className="contact-section">
          <h3>Informações de Contato</h3>
          <p>Email: <a href="mailto:contato@imprensamalakoff.com">contato@imprensamalakoff.com</a></p>
          <p>Redes sociais: <a href="https://twitter.com/imprensamalakoff" target="_blank" rel="noopener noreferrer">Twitter</a> | <a href="https://www.instagram.com/imprensamalakoff" target="_blank" rel="noopener noreferrer">Instagram</a></p>
        </div>
      </section>
    </main>
  );
}
