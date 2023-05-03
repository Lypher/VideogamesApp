import {
  GET_ALLGAMES,
  GET_GAMESBYNAME,
  GET_GENRES,
  UPDATE_LANGUAGE,
} from "./actions";

const initialState = {
  allGames: [],
  gamesByName: [],
  genres: [],
  idioma: "en",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALLGAMES:
      return {
        ...state,
        allGames: action.payload,
      };
    case GET_GAMESBYNAME:
      return {
        ...state,
        gamesByName: action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case UPDATE_LANGUAGE:
      return {
        ...state,
        idioma: action.payload.language,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
