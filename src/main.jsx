import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';

import './index.css';

import Movie from './pages/Movie.jsx';
import Search from './pages/Search.jsx';
import Home from './pages/Home.jsx';
import Popular from './pages/Popular.jsx';
import Maisvotados from './pages/Maisvotados.jsx';
import Contato from './pages/Contato.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="movie/:id" element={<Movie />} />
          <Route path="search" element={<Search />} />
          <Route path="popular" element={<Popular />} />
          <Route path="maisvotados" element={<Maisvotados />} />
          <Route path="contato" element={<Contato />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
