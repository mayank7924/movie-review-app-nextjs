const createConnection = require("../../src/dbConnection");
const Movie = require("../../models/movie");

async function getMovies(req, res) {
  try {
    if (req.method !== "GET") {
      res.status(500).json({
        message: "method is not supported",
        error: true,
      });
    }
    await createConnection();
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, error: true });
  }
}

module.exports = getMovies;
