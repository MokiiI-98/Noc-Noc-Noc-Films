

import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const imageUrl = import.meta.env.VITE_IMG;

const MoviesCard = ({ movie, showLink = true }) => {
  // Verifica se existe uma lista de gêneros e mapeia os nomes
  const genres = movie.genres?.map((genre) => genre.name).join(", ");

  return (
    <div className="movie-card">
      <img src={imageUrl + movie.poster_path} alt={movie.title} />
      <h2>{movie.title}</h2>
      {/* Exibe os gêneros do filme */}
      {genres && <p className="movie-genres">{genres}</p>}
      <p>
        <FaStar /> {movie.vote_average.toFixed(1)}
      </p>
      {showLink && <Link to={`/movie/${movie.id}`}>Detalhes do filme</Link>}
    </div>
  );
};

export default MoviesCard;
// is erros que estão aki é coisa que não usei não afetada nada no código