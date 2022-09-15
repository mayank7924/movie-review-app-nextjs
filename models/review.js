const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
    movieId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}, { timestamps: true, bufferCommands: false, autoCreate: false })

const reviewModel = mongoose.models.Review || mongoose.model('Review', ReviewSchema)

module.exports = reviewModel