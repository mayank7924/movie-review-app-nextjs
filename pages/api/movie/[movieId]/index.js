const createConnection = require("../../../../src/dbConnection");
const Movie = require("../../../../models/movie");

const manageMovieByMovieId = async (req, res) => {
  try {
    const movieId = req.query.movieId;
    await createConnection();
    const result = await methodHandler[req.method](movieId, req.body);
    res.json(result);
  } catch (err) {
    let statusCode = 500;
    if (err.message == "movie not found") {
      statusCode = 404;
    } else if (err.message.includes("Invalid scheme")) {
      statusCode = 400;
    } else if (err.code === 11000) {
      statusCode = 409;
    }
    res.status(statusCode).json({ message: err.message, error: true });
  }
};

const methodHandler = {
  GET: async function (movieId) {
    const movie = await Movie.findOne({ _id: movieId });
    if (!movie) {
      throw new Error("movie not found");
    }
    return movie;
  },
  DELETE: async function (movieId) {
    await Movie.deleteOne({ _id: movieId });
    return {
      message: `movie with id ${movieId} was deleted`,
    };
  },
  PUT: async function (movieId, body) {
    await Movie.updateOne(
      { _id: movieId },
      {
        title: body.title,
        summary: body.summary,
        poster: body.poster,
        released: body.released,
        cast: body.cast,
      }
    );
    return {
      message: "movie was successfully updated",
    };
  },
  POST: async function (movieId, body) {
    const movie = await Movie.create({
      _id: movieId,
      title: body.title,
      summary: body.summary,
      poster: body.poster,
      released: body.released,
      cast: body.cast,
    });
    return movie;
  },
};

module.exports = manageMovieByMovieId;
