const validations = (gameData) => {
  let errors = {};

  if (!gameData.name.length) {
    errors.name = `Este campo no puede estar vacío`;
  }
  if (!gameData.name.length && gameData.name.length > 30) {
    errors.name = `El nombre es demasiado largo`;
  }
  if (!gameData.description.length) {
    errors.description = `Este campo no puede estar vacío`;
  }
  if (
    gameData.background_image &&
    !/^(?:https?|ftp):\/\/(?:www\.)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(?:\/[\w#!:.?+=&%@!\-\/]*)?$/.test(
      gameData.background_image
    )
  ) {
    errors.background_image = `Este campo debe ser una URL`;
  }
  if (!gameData.released.length) {
    errors.released = `Este campo no puede estar vacío`;
  }
  if (!gameData.rating.length) {
    errors.rating = `Este campo no puede estar vacío`;
  }
  if (isNaN(parseInt(gameData.rating))) {
    errors.rating = `Debe ser un numero`;
  }
  if (gameData.rating > 5) {
    errors.rating = `Debe ser un numero entre 0 y 5`;
  }
  if (!gameData.platforms.length) {
    errors.platforms = `Este campo no puede estar vacío`;
  }
  if (!gameData.genres.length) {
    errors.genres = `Debes elegir al menos un genero`;
  }

  return errors;
};

export default validations;
