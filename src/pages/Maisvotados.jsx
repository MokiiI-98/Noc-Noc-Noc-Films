import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { MdLightMode } from "react-icons/md";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import './MoviesGrid.css';

const movieUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const MaisVotados = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [theme, setTheme] = useState('dark'); // Estado para o tema (escuro ou claro)

  // Função para buscar os filmes mais votados da API
  const getTopRatedMovies = async (page) => {
    const url = `${movieUrl}top_rated?${apiKey}&language=pt-BR&page=${page}`;
    const res = await fetch(url);
    const data = await res.json();

    setTopMovies(data.results);
    setTotalPages(data.total_pages); // Armazena o número total de páginas retornadas pela API
  };

  // Efeito para buscar os filmes sempre que a página atual for alterada
  useEffect(() => {
    getTopRatedMovies(currentPage);
  }, [currentPage]);

  // Função para alterar a página
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page); // Atualiza a página atual
    }
  };

  // Função para alternar entre os temas (claro e escuro)
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`container ${theme}`}> {/* Aplica o tema dinâmico */}
      <div className="theme-toggle">
        <button onClick={toggleTheme}>
          <MdLightMode /> {theme === 'dark' ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
        </button>
      </div>

      <h2 className="title">Filmes Mais Votados</h2>

      <div className="movies-container">
        {topMovies.length === 0 && <p>Carregando...</p>}
        {topMovies.length > 0 && topMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      
      {/* Controles de paginação */}
      <div className="page-info-container">
        <div className="page-info">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            <FaArrowAltCircleLeft />
          </button>
          <span>
            Página <span className="current-page">{currentPage}</span> de <span>{totalPages}</span>
          </span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            <FaArrowAltCircleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaisVotados;
