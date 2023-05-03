import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Card = ({ game }) => {
  const idioma = useSelector((state) => state.idioma);
  return (
    <Link style={{ textDecoration: "none" }} to={`/detail/${game.id}`}>
      <StyledCard
        backgroundImage={
          game.background_image ? game.background_image : game.image
        }
      >
        <h2>
          {idioma === "es" ? "Generos:" : "Genres:"} {game.genres}
        </h2>
        <h1>{game.name}</h1>
      </StyledCard>
    </Link>
  );
};

const StyledCard = styled.div`
  color: #fff;
  border: 5px solid #740496;
  border-radius: 20px;
  margin: 20px;
  width: 350px;
  height: 250px;
  display: flex;
  font-family: "Arvo", serif;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  padding: 20px;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  h1 {
    font-size: 26px;
    text-shadow: 2px 2px #000;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  h2 {
    font-size: 14px;
    text-shadow: 2px 2px #000;
    margin: 0;
    display: none;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #740496;
    padding: 5px 0;
    z-index: 2;
  }

  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    border-radius: 20px;
  }

  &:hover {
    box-shadow: 0px 0px 10px 5px #740496;
    transform: scale(1.12);
    transition: all 0.3s ease-in-out;

    h2 {
      display: flex;
    }
  }
`;

export default Card;
