import axios from "axios";

export const GET_ALLGAMES = "GET_ALLGAMES";
export const GET_GENRES = "GET_GENRES";
export const GET_GAMESBYNAME = "GET_GAMESBYNAME";
export const UPDATE_LANGUAGE = "UPDATE_LANGUAGE";

export const url = "http://localhost:3001";

export const getAllGames = () => {
  return async (dipatch) => {
    const resp = await axios(`${url}/videogames`);

    return dipatch({
      type: GET_ALLGAMES,
      payload: resp.data,
    });
  };
};

export const getGamesByName = (name) => {
  return async (dipatch) => {
    const resp = await axios(`${url}/videogames?name=${name}`);
    return dipatch({
      type: GET_GAMESBYNAME,
      payload: resp.data,
    });
  };
};

export const getGenres = () => {
  return async (dipatch) => {
    const resp = await axios(`${url}/genres`);

    return dipatch({
      type: GET_GENRES,
      payload: resp.data,
    });
  };
};

export const updateLanguage = (language) => ({
  type: "UPDATE_LANGUAGE",
  payload: {
    language,
  },
});
