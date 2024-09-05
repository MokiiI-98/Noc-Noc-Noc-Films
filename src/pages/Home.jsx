import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { MdLightMode } from "react-icons/md";
import { FaArrowAltCircleLeft,FaArrowAltCircleRight } from "react-icons/fa";
import './MoviesGrid.css';

const movieUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [theme, setTheme] = useState('dark');

  const getTopRatedMovies = async (page) => {
    const url = `${movieUrl}now_playing?${apiKey}&language=pt-BR&page=${page}`;
    const res = await fetch(url);
    const data = await res.json();

    setTopMovies(data.results);
    setTotalPages(data.total_pages);
  };

  useEffect(() => {
    getTopRatedMovies(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`container ${theme}`}>
      <div className="theme-toggle">
        <button onClick={toggleTheme}>
        <MdLightMode /> {theme === 'dark' ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
        </button>
      </div>

      <div className="movies-container">
        {topMovies.length === 0 && <p>Carregando...</p>}
        {topMovies.length > 0 && topMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      
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

export default Home;
