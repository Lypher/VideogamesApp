import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <StyledLanding>
      <div className="contenedor">
        <h1>Bienvenido!</h1>
        <img src="" alt="" />

        <button onClick={() => navigate("/home")}>START</button>
      </div>
    </StyledLanding>
  );
};

const StyledLanding = styled.div`
  background-image: url("https://ceinaseg.com/wp-content/uploads/2021/09/videogames-controller-1920x1080-1.jpg");
  background-size: cover;
  background-attachment: fixed;
  font-family: "Arvo", serif;
  height: 100%;
  width: 100%;
  box-sizing: content-box;
  display: flex;
  justify-content: center;
  .contenedor {
    margin-top: 200px;
    justify-content: center;
  }
  button {
    font-size: 35px;
    background-color: red;
    width: 130px;
    height: 90px;
    border-radius: 45px;
    font-weight: bold;
  }
  button:hover {
    background-color: #54036d;
    cursor: pointer;
  }
  h1 {
    font-size: 26px;
    text-shadow: 2px 2px #000;
    color: white;
  }

  h2 {
    font-size: 14px;
    text-shadow: 2px 2px #000;
    display: flex;
    color: white;
    width: 100%;
  }
  @import url("https://fonts.googleapis.com/css2?family=Anton&family=Arvo:ital@0;1&display=swap");
`;

export default Landing;
