import parser from "html-react-parser";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Detail = () => {
  const { id } = useParams();
  const [gameDetail, setGameDetail] = useState({});
  const idioma = useSelector((state) => state.idioma);

  const translations = {
    en: {
      Name: "Name",
      Release: "Release",
      Genre: "Genre",
      Rating: "Rating",
      Platforms: "Platforms",
    },
    es: {
      Name: "Nombre",
      Release: "Lanzamiento",
      Genre: "Genero",
      Rating: "Puntuacion",
      Platforms: "Plataformas",
    },
  };

  useEffect(() => {
    const getAxios = async () => {
      const detail = await axios(`http://localhost:3001/videogames/${id}`);
      setGameDetail(detail.data);
    };
    getAxios();
  }, [id]);
  if (gameDetail.description) {
    return (
      <StyledDetail>
        <div className="content">
          <h1>{gameDetail.name}</h1>
          <img
            src={
              gameDetail.background_image
                ? gameDetail.background_image
                : gameDetail.image
            }
            width="600px"
            height="auto"
            alt="Loading..."
          />
          <h2>
            {translations[idioma].Genre}:{" "}
            {gameDetail.genres.map((genre) => genre.name).join(", ")}
          </h2>
          <h2>
            {translations[idioma].Rating}: {gameDetail.rating}
          </h2>
          <h2>
            {translations[idioma].Platforms}:{" "}
            {gameDetail.created === true
              ? gameDetail.platforms
              : gameDetail.platforms
                  .map((platform) => platform.platform.name)
                  .join(", ")}
          </h2>

          <h2>
            {translations[idioma].Release}: {gameDetail.released}
          </h2>
          <article>{parser(gameDetail.description)}</article>
        </div>
      </StyledDetail>
    );
  } else {
    return <p>Loading...</p>;
  }
};

const StyledDetail = styled.div`
  background-image: url("https://pbs.twimg.com/media/ElX-dLqWkAcCstK?format=jpg&name=large");
  background-size: cover;
  background-attachment: fixed;
  display: flex;
  font-family: 'Arvo', serif;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: black;
    border-radius: 5px;
    box-shadow:10px 23px 20px;
    min-width: 350px;
    width: 650px;
    border: 5px solid #740496;

    h1 {
      color: #fff;
      font-size: 28px;
      margin: 20px 0;
      text-align: center;
    }

    img {
      border-radius: 15px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
      margin-bottom: 20px;
      max-width: 80%
      object-fit: auto;
    }

    h2 {
      color: #fff;
      font-size: 14px;
      margin-bottom: 10px;
      text-align: center;
      text-transform: uppercase;
      font-weight: 500;
    }

    article {
      color: #fff;
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 20px;
      max-width: 100%;
      text-align: justify;
      text-justify: inter-word;
      width:650px;
    }
  }
`;

export default Detail;
