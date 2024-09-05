import { Link, useNavigate } from "react-router-dom";
import { BiSearchAlt2, BiMenu } from "react-icons/bi";
import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false); // Estado para controlar a sidebar
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    navigate(`/search?q=${search}`);
    setSearch("");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Alterna o estado da sidebar
  };

  const closeSidebar = () => {
    setSidebarOpen(false); // Fecha a sidebar
  };

  return (
    <div>
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={closeSidebar}>
          &times;
        </button>
        <Link to="/" onClick={closeSidebar}>Home</Link>
        <Link to="/maisvotados" onClick={closeSidebar}>Filmes Mais Votados</Link>
        <Link to="/popular" onClick={closeSidebar}>Filmes Populares</Link>
        <Link to="/contato" onClick={closeSidebar}>Contato</Link>
      </div>
      
      {/* Fundo escuro quando a sidebar está aberta */}
      {sidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}

      <nav id="navbar">
        <button className="menu-btn" onClick={toggleSidebar}>
          <BiMenu />
        </button>
        <h2>
          <Link to="/">
            {/* Substitua o caminho da imagem para o correto, caso queira usar logo */}
            {/* <img src="/src/assets/Mega_HD_Filmes.png" alt="Logo" /> */}
           
          </Link>
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Busque um filme"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button type="submit">
            <BiSearchAlt2 />
          </button>
        </form>
      </nav>
    </div>
  );
};

export default Navbar;
