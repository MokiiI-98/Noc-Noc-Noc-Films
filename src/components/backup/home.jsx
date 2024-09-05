import { useState, useEffect } from "react";
import MoviesCard from "../components/MovieCard";
import './MoviesGrid.css'

const movieUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);

  const getTopRatedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setTopMovies(data.results);


  };
  {/*
  const getPopularFilmes = async(url)=>{
    const [popular,setPopular]= useState()

    const res = await fetch(url);
    const data = await res.json();

    setTopMovies(data.results);
  }
*/} 
  useEffect(() => {
    const topRatedUrl = `${movieUrl}now_playing?${apiKey}&language=pt-BR`;

    getTopRatedMovies(topRatedUrl);
  }, []);

  return (
    <div className="container">
     
     {/* <button>Lançamentos</button> */}
      <div className="movies-container">
        {topMovies.length === 0 && <p>Carregando...</p>}
        {topMovies.length > 0 && topMovies.map((movie) => <MoviesCard key={movie.id}movie={movie} />)}
      </div>
    </div>
  );
};

export default Home;
