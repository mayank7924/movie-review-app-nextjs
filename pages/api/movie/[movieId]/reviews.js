const createConnection = require("../../../../src/dbConnection");
const Review = require("../../../../models/review");

async function getReviewsForMovie(req, res) {
  try {
    if (req.method !== "GET") {
      res.status(500).json({
        message: "method is not supported",
        error: true,
      });
    }
    await createConnection();
    const reviews = await Review.find({movieId: req.query.movieId});
    res.json(reviews);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, error: true });
  }
}

module.exports = getReviewsForMovie;
