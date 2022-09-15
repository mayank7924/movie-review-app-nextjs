const mongoose = require("mongoose")

const Actor = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    }
}, { timestamps: true, bufferCommands: false, autoCreate: false})

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    released: {
        type: Date,
        required: true
    },
    cast: {
        type: [Actor],
        required: true
    }
}, { timestamps: true, bufferCommands: false, autoCreate: false} )

const movieModel = mongoose.models.Movie || mongoose.model('Movie', MovieSchema)

module.exports = movieModel