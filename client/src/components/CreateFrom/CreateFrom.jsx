import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { url } from "../../redux/actions";
import { getAllGames } from "../../redux/actions";
import validations from "./Validations";
import styled from "styled-components";

const CreateForm = () => {
  const [gameData, setGameData] = useState({
    name: "",
    description: "",
    released: "",
    image: "",
    rating: "",
    platforms: "",
    genres: [],
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const idioma = useSelector((state) => state.idioma);

  const translations = {
    en: {
      Name: "Name",
      Description: "Game description",
      Release: "Release",
      Image: "Image",
      Rating: "Rating",
      Platforms: "Platforms",
    },
    es: {
      Name: "Nombre",
      Description: "Descripcion del juego",
      Release: "Lanzamiento",
      Image: "Imagen",
      Rating: "Puntuacion",
      Platforms: "Plataformas",
    },
  };

  let allGenres = useSelector((state) => state.genres);

  const handleInputChange = (event) => {
    setGameData({
      ...gameData,
      [event.target.name]: event.target.value,
    });

    setErrors(
      validations({
        ...gameData,
        [event.target.name]: event.target.value,
      })
    );
    console.log(gameData);
  };

  const handleAddGenre = (event) => {
    event.preventDefault();
    if (!gameData.genres.includes(event.target.name)) {
      setGameData({
        ...gameData,
        genres: [...gameData.genres, event.target.name],
      });
      setErrors(
        validations({
          ...gameData,
          genres: [...gameData.genres, event.target.name],
        })
      );
    } else {
      setGameData({
        ...gameData,
        genres: gameData.genres.filter((genre) => genre !== event.target.name),
      });
      setErrors(
        validations({
          ...gameData,
          genres: gameData.genres.filter(
            (genre) => genre !== event.target.name
          ),
        })
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const game = {
      ...gameData,
      rating: parseInt(gameData.rating),
      genres: gameData.genres.map((genre) => parseInt(genre)),
    };
    !game.image.length && delete game.image;
    dispatch(getAllGames());
    if (!gameData.name.length) alert("necesitas llenar el formulario");
    else {
      const newGame = await axios.post(`${url}/videogames`, game);
      alert("Tu juego ha sido creado con exito!");
      window.scrollTo(0, 0);
      setGameData({
        name: "",
        description: "",
        released: "",
        image: "",
        rating: "",
        platforms: "",
        genres: [],
      });
      return newGame;
    }
  };
  return (
    <StyledForm>
      <div>
        <label htmlFor="name">{translations[idioma].Name} </label>
        <input
          type="text"
          name="name"
          value={gameData.name}
          onChange={handleInputChange}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="background_image">{translations[idioma].Image}: </label>
        <input
          type="text"
          name="image"
          value={gameData.image}
          onChange={handleInputChange}
        />
        {errors.image && <p style={{ color: "red" }}>{errors.image}</p>}
      </div>

      <div>
        <label htmlFor="rating">{translations[idioma].Rating}: </label>
        <input
          type="text"
          name="rating"
          value={gameData.rating}
          onChange={handleInputChange}
        />
        {errors.rating && <p style={{ color: "red" }}>{errors.rating}</p>}
      </div>

      <div>
        <label htmlFor="platforms">{translations[idioma].Platforms}: </label>
        <input
          type="text"
          name="platforms"
          value={gameData.platforms}
          onChange={handleInputChange}
        />
        {errors.platforms && <p style={{ color: "red" }}>{errors.platforms}</p>}
      </div>

      <div>
        <label htmlFor="released">{translations[idioma].Release}: </label>
        <input
          type="date"
          name="released"
          value={gameData.released}
          onChange={handleInputChange}
        />
        {errors.released && <p style={{ color: "red" }}>{errors.released}</p>}
      </div>
      <div>
        <textarea
          name="description"
          rows="5"
          cols="50"
          value={gameData.description}
          onChange={handleInputChange}
          placeholder={translations[idioma].Description}
        />
        {errors.description && (
          <p style={{ color: "red" }}>{errors.description}</p>
        )}
      </div>

      <div className="genres">
        <div>
          {allGenres.map((genre) => (
            <button name={genre.id} onClick={handleAddGenre} key={genre.id}>
              {genre.name}
            </button>
          ))}
        </div>

        {errors.genres && <p style={{ color: "red" }}>{errors.genres}</p>}
      </div>

      <button className="submit" type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </StyledForm>
  );
};

const StyledForm = styled.div`
  padding: 10px;
  display: flex;
  font-family: "Arvo", serif;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  justify-content: space-around;
  color: #740496;
  div {
    margin: 10px;
    border: 5px solid #740496;
    padding: 20px;
    border-radius: 15px;
    background-color: #ffffffb5;
  }
  .genres {
    width: 30%;
    text-align: center;
  }
  .genres div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .genres button {
    font-size: 17px;
    color: #5d0279;
    border-radius: 7px;
    border: 3px solid #740496;
  }

  .submit {
    font-size: 25px;
    color: white;
    background-color: #c71919;
    border-radius: 7px;
    border: 3px solid red;
    cursor: pointer;
  }
  .submit:hover {
    background-color: #8c0000;
  }
`;

export default CreateForm;
