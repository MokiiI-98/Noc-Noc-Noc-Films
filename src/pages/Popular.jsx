import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { MdLightMode } from "react-icons/md";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import './MoviesGrid.css';

const movieUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Popular = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [theme, setTheme] = useState('dark');

  // Função para buscar os filmes populares da API
  const getPopularMovies = async (page) => {
    const url = `${movieUrl}popular?${apiKey}&language=pt-BR&page=${page}`;
    const res = await fetch(url);
    const data = await res.json();

    setPopularMovies(data.results);
    setTotalPages(data.total_pages);
  };

  // Efeito para buscar os filmes populares ao carregar a página ou mudar a página atual
  useEffect(() => {
    getPopularMovies(currentPage);
  }, [currentPage]);

  // Função para alterar a página
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
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

      <h2 className="title">Filmes Populares</h2>

      <div className="movies-container">
        {popularMovies.length === 0 && <p>Carregando...</p>}
        {popularMovies.length > 0 && popularMovies.map((movie) => (
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

export default Popular;
