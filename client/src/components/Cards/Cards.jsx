import Card from "../Card/Card.jsx";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Cards = ({ games }) => {
  const buttons = [];
  let allGames = games.map((game) => {
    return {
      ...game,
      genres: game.genres.map((genre) => genre.name).join(", "),
    };
  });
  let message = "Loading...";
  const [page, setPage] = useState(0);
  const [genre, setGenre] = useState("");
  const [orderAlf, setOrderAlf] = useState("");
  const [orderRtg, setOrderRtg] = useState("");
  const [origin, setOrigin] = useState("");
  const [currentPage, setCurrentPage] = useState(page);
  const genres = useSelector((state) => state.genres);
  const idioma = useSelector((state) => state.idioma); // Obtener el idioma global

  const handlePage = (event) => {
    setPage(event.target.value * 15);
    setCurrentPage(event.target.value * 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePagePrev = () => {
    setPage(page - 15);
    setCurrentPage(currentPage - 1);
    console.log(page);
    console.log(currentPage);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handlePageNext = () => {
    setPage(page + 15);
    setCurrentPage(currentPage + 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleFilterByGenre = (event) => {
    setGenre(event.target.value);
    page > 0 && setPage(0);
    setCurrentPage(page);
  };
  const handleFilterByOrg = (event) => {
    setOrigin(event.target.value);
    page > 0 && setPage(0);
    setCurrentPage(page);
  };
  const handleOrderAlf = (event) => {
    setOrderAlf(event.target.value);
    setOrderRtg("");
    setPage(0);
    setCurrentPage(page);
  };
  const handleOrderRtg = (event) => {
    setOrderRtg(event.target.value);
    setOrderAlf("");
    setPage(0);
    setCurrentPage(page);
  };

  const translations = {
    en: {
      SiteGames: "Site Games",
      UsersGames: "Users Games",
      AllGames: "All Games",
      Raiting: "Raiting",
    },
    es: {
      SiteGames: "Juegos Del Sitio",
      UsersGames: "Juegos Del Usuario",
      AllGames: "Todos los Juegos",
      Raiting: "Puntuación",
    },
  };

  if (genre !== "") {
    allGames = allGames.filter((game) => game.genres.includes(genre));
    if (!allGames.length)
      idioma === "en"
        ? (message = "There are no games with that genre")
        : (message = "No hay juegos con ese genero");
  }

  if (origin === "api") {
    allGames = allGames.filter((game) => !isNaN(game.id));
  }

  if (origin === "db") {
    allGames = allGames.filter((game) => isNaN(game.id));
    if (!allGames.length)
      idioma === "en"
        ? (message = "There are no games in database with that specification")
        : (message =
            "No hay juegos en la base de datos con esa especificacion");
  }

  if (origin === "all") {
    allGames = games;
    setOrigin("");
    setGenre("");
  }

  for (let i = 1; i <= Math.ceil(allGames.length / 15); i++) {
    buttons.push(i);
  }

  if (orderAlf === "A-Z") {
    allGames.sort((x, y) => {
      if (x.name < y.name) return -1;
      if (x.name > y.name) return 1;
      return 0;
    });
  }
  if (orderAlf === "Z-A") {
    allGames.sort((x, y) => {
      if (x.name < y.name) return 1;
      if (x.name > y.name) return -1;
      return 0;
    });
  }
  if (orderRtg === "Ascending") {
    allGames.sort((x, y) => x.rating - y.rating);
  }
  if (orderRtg === "Descending") {
    allGames.sort((x, y) => y.rating - x.rating);
  }

  return (
    <StyledContainer>
      <div className="filter">
        <select>
          {genres.map((genre) => (
            <option
              value={genre.name}
              onClick={handleFilterByGenre}
              key={genre.id}
            >
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <div className="filter">
        <button onClick={handleFilterByOrg} value="api">
          {translations[idioma].SiteGames}
        </button>
        <button onClick={handleFilterByOrg} value="db">
          {translations[idioma].UsersGames}
        </button>
        <button onClick={handleFilterByOrg} value="all">
          {translations[idioma].AllGames}
        </button>
        <button onClick={handleOrderAlf} value="A-Z">
          &uArr;&dArr; A-Z{" "}
        </button>
        <button onClick={handleOrderAlf} value="Z-A">
          &uArr;&dArr; Z-A{" "}
        </button>
        <button onClick={handleOrderRtg} value="Ascending">
          &uArr; {translations[idioma].Raiting}
        </button>
        <button onClick={handleOrderRtg} value="Descending">
          &dArr; {translations[idioma].Raiting}
        </button>
      </div>

      <div className="cards">
        {allGames.length ? (
          allGames
            .slice(page, page + 15)
            .map((game, i) => <Card game={game} key={i} />)
        ) : (
          <p>{message}</p>
        )}
      </div>
      <div className="pagination">
        {page > 0 && <button onClick={handlePagePrev}>&lArr;</button>}
        {buttons.map((button, i) => (
          <button
            value={i}
            onClick={handlePage}
            className={currentPage === i ? "active" : ""}
            key={i}
          >
            {button}
          </button>
        ))}
        {page < allGames.length - 15 && (
          <button onClick={handlePageNext}>&rArr;</button>
        )}
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  background-image: url("https://pbs.twimg.com/media/ElX-dLqWMAE1GIo?format=jpg&name=large");
  background-size: cover;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
  justify-content: space-around;
  min-height: 100vh;

  .active {
    text-decoration: underline;
    font-weight: bold;
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .filter button,
  .filter select,
  .pagination button {
    font-size: 18px;
    padding: 8px 16px;
    background-color: #740496;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    margin: 5px 3px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  .filter select:hover,
  .filter button:hover,
  .pagination button:hover {
    background-color: #5d0279;
  }

  .filter select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 8px 10px;
    padding-right: 1.5rem;
  }

  .filter select::-ms-expand {
    display: none;
  }
`;

export default Cards;
