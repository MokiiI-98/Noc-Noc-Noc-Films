import './Contato.css';

const Contato = () => {
  return (
    <div className="contato-container">
      {/* Foto centralizada */}
      <div className="image-container">
        <img src="/src/assets/anedota.jpg" alt="Imagem Centralizada" className="center-image" />
      </div>

      {/* Rodapé responsivo */}
      <footer className="footer">
        <p>&copy; 2024 L lima. Todos os direitos reservados.</p>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/luan-lima98/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/MokiiI-98" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </footer>
    </div>
  );
};

export default Contato;
