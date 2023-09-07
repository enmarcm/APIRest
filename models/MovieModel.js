import importJSON from "../utils/importJSON.js";
import { randomUUID } from "node:crypto";

const movies = importJSON("../movies.json");

class MovieModel {
  static getAll = async ({ genre, page, limit }) => {
    if (genre) return await MovieModel.#getGenre({ genre });

    if (limit) return await MovieModel.#getPagionation({ page, limit });

    return movies;
  };

  static #getGenre = async ({ genre }) => {
    const peliculas = movies.filter((movie) =>
      movie.genre.some((gen) => gen.toLowerCase() === genre.toLowerCase())
    );
    return peliculas;
  };

  static #getPagionation = async ({ page = 1, limit }) => {
    const limitNumber = limit * page;

    const peliculasMostrar = movies.slice(limitNumber - limit, limitNumber);
    return peliculasMostrar;
  };

  static getById = async ({ id }) => movies.find((movie) => movie.id === id);

  static create = async ({ objMovie }) => {
    const newMovie = {
      id: randomUUID(),
      ...objMovie, //Obtenemos todo el data aceptado
    };

    movies.push(newMovie);

    return newMovie;
  };

  static delete = async ({ id }) => {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) return false;

    movies.splice(movieIndex, 1);

    return movieIndex;
  };

  static update = async ({ id, objMovie }) => {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1)
      throw res
        .status(404)
        .json({ message: "No se ha encontrado la pelicula" });

    const movie = {
      ...movies[movieIndex],
      ...objMovie,
    };

    movies[movieIndex] = movie;

    return movie;
  };
}

export default MovieModel;