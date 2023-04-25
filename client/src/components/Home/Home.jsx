import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Cards from "../Cards/Cards.jsx";

const Home = () => {
  let allGames = useSelector((state) => state.allGames);
  let gamesByName = useSelector((state) => state.gamesByName);

  const [games, setGames] = useState([]);

  useEffect(() => {
    if (gamesByName.length) {
      setGames(gamesByName);
    } else if (allGames.length) {
      setGames(allGames);
    }
  }, [allGames, gamesByName]);

  return (
    <div>
      <Cards games={games} />
    </div>
  );
};

export default Home;
