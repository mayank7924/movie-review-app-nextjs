const mongoose = require("mongoose")
const Movie = require("../models/movie")
const movies = require("./movies.json")

const seedMovies = async () => {
    try {
        await mongoose.connect(`mongodb://app_user:16tCWXrQroEXc86K@ac-bdb83b7-shard-00-00.7b8y9ko.mongodb.net:27017,ac-bdb83b7-shard-00-01.7b8y9ko.mongodb.net:27017,ac-bdb83b7-shard-00-02.7b8y9ko.mongodb.net:27017/movie_review?ssl=true&replicaSet=atlas-akvwyn-shard-0&authSource=admin&retryWrites=true&w=majority`)
        const result = await Movie.insertMany(movies)
        console.log(`documents inserted: ${result.length}`)
    } catch(err) {
        console.log(err)
    }
}

seedMovies()