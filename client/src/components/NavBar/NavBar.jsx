import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  getAllGames,
  getGamesByName,
  getGenres,
  updateLanguage,
} from "../../redux/actions.js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SearchBar from "../SearchBar/SearchBar.jsx";
import styled from "styled-components";
import { useSelector } from "react-redux";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const idioma = useSelector((state) => state.idioma); // Obtener el idioma global

  const toggleLang = (event) => {
    dispatch(updateLanguage(event.target.value)); // Enviar la acción "updateLanguage"
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
        <h1>{translations[idioma].appTitle}</h1>
      </div>
      <div>
        <NavLink className="navLink" to="/home">
          {translations[idioma].home}
        </NavLink>
      </div>
      <div>
        <NavLink className="navLink" to="/createForm">
          {translations[idioma].create}
        </NavLink>
      </div>
      <div>
        <SearchBar
          onSearch={onSearch}
          placeholder={translations[idioma].searchBarPlaceholder}
        />{" "}
      </div>
      <div>
        🌐
        <select value={idioma} onChange={toggleLang}>
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
