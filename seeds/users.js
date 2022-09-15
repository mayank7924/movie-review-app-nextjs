const mongoose = require("mongoose")
const User = require("../models/user")

const seedUsers = async () => {
    try {
        await mongoose.connect(`mongodb://app_user:16tCWXrQroEXc86K@ac-bdb83b7-shard-00-00.7b8y9ko.mongodb.net:27017,ac-bdb83b7-shard-00-01.7b8y9ko.mongodb.net:27017,ac-bdb83b7-shard-00-02.7b8y9ko.mongodb.net:27017/movie_review?ssl=true&replicaSet=atlas-akvwyn-shard-0&authSource=admin&retryWrites=true&w=majority`)
        await User.insertMany([
            {
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@mail.com",
                dob: "2001-05-18T16:00:00Z",
                password: "password123"
            }
        ])
    } catch(err) {
        console.error(err)
    }
}

seedUsers()