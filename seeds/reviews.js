const mongoose = require("mongoose")
const Review = require("../models/review")
const Movie = require("../models/movie")
const { faker } = require("@faker-js/faker")

const seedReviews = async () => {
    try {
        await mongoose.connect(`mongodb://app_user:16tCWXrQroEXc86K@ac-bdb83b7-shard-00-00.7b8y9ko.mongodb.net:27017,ac-bdb83b7-shard-00-01.7b8y9ko.mongodb.net:27017,ac-bdb83b7-shard-00-02.7b8y9ko.mongodb.net:27017/movie_review?ssl=true&replicaSet=atlas-akvwyn-shard-0&authSource=admin&retryWrites=true&w=majority`)
        const movieList = await Movie.find()
        const reviews = movieList.map(movie => {
            return {
                movieId: movie._id,
                username: faker.internet.userName(),
                review: faker.word.adjective(),
                rating: (faker.random.numeric(1)%4)+1
            }
        })
        const result = await Review.insertMany(reviews)
        console.log(result)
    } catch(err) {
        console.log(err)
    }
}

seedReviews()