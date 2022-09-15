const createConnection = require("../../../../src/dbConnection");
const Review = require("../../../../models/review");

async function createReviewForMovie(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(500).json({
        message: "method is not supported",
        error: true,
      });
    }
    await createConnection();
    const result = await Review.create({
      movieId: req.query.movieId,
      username: req.body.username,
      review: req.body.review,
      rating: req.body.rating,
    });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, error: true });
  }
}

module.exports = createReviewForMovie;
