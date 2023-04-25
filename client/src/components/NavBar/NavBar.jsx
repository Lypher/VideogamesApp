import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { getAllGames, getGamesByName, getGenres } from "../../redux/actions.js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SearchBar from "../SearchBar/SearchBar.jsx";
import styled from "styled-components";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [lang, setLang] = useState("en"); // Por defecto en inglés

  const toggleLang = (event) => {
    setLang(event.target.value); // Establece el idioma seleccionado en el estado
  };

  useEffect(() => {
    dispatch(getAllGames());
    dispatch(getGenres());
  }, []);

  const translations = {
    en: {
      home: "Home",
      create: "Create Game",
      searchBarPlaceholder: "Search Games",
      appTitle: "🎮 Video Games App",
    },
    es: {
      home: "Inicio",
      create: "Crear Juego",
      searchBarPlaceholder: "Buscar Juegos",
      appTitle: "🎮 App de Videojuegos",
    },
  };

  const onSearch = (name) => {
    dispatch(getGamesByName(name));
    navigate("/home");
  };

  return (
    <StyledNav style={{ display: location.pathname === "/" ? "none" : "flex" }}>
      <div>
        <h1>{translations[lang].appTitle}</h1>
      </div>
      <div>
        <NavLink className="navLink" to="/home">
          {translations[lang].home}
        </NavLink>
      </div>
      <div>
        <NavLink className="navLink" to="/createForm">
          {translations[lang].create}
        </NavLink>
      </div>
      <div>
        <SearchBar
          onSearch={onSearch}
          placeholder={translations[lang].searchBarPlaceholder}
        />{" "}
      </div>
      <div>
        🌐
        <select value={lang} onChange={toggleLang}>
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </div>
    </StyledNav>
  );
};

const StyledNav = styled.div`
  align-items: center;
  font-family: "Arvo", serif;
  justify-content: space-between;
  color: white;
  background-color: #630380;
  padding: 20px;
  .navLink {
    font-size: 24px;
    font-weight: bold;
    text-decoration: none;
    color: white;
    padding: 10px;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
    &:hover {
      background-color: gray;
    }
  }
  select {
    background-color: #f5f5f5;
    border-radius: 5px;
    font-size: 16px;
    padding: 5px;
    &:focus {
      outline: none;
    }
  }
  option {
    background-color: white;
    color: #630380;
  }
}
`;

export default NavBar;
