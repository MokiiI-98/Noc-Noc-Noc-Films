import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { MdLightMode } from "react-icons/md";
import { FaArrowAltCircleLeft,FaArrowAltCircleRight } from "react-icons/fa";
import "./MoviesGrid.css";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("dark"); // Estado para o tema
  const query = searchParams.get("q");

  const getSearchedMovies = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setError("");
      } else {
        setMovies([]);
        setError("Nenhum filme encontrado. Digite o nome corretamente.");
      }
    } catch (erro) {
      setError("Ocorreu um erro ao buscar os filmes. Por favor, tente novamente.");
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}&language=pt-BR&page=${currentPage}`;
    getSearchedMovies(searchWithQueryURL);
  }, [query, currentPage]);

  return (
    <div className={`container ${theme}`}>
      <div className="theme-toggle">
        <button onClick={toggleTheme}>
          <MdLightMode /> {theme === "dark" ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
        </button>
      </div>

      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      
      <div className="movies-container">
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        {movies.length === 0 && !error && <p>Carregando...</p>}
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
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

export default Search;
