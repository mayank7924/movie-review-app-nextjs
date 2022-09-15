const createConnection = require("../../../src/dbConnection")
const User = require("../../../models/user")
const createHash = require("../../../src/hash")

const handler = async (req, res) => {
    if(req.method!=="POST") {
        res.status(500).json({
            error: "method is not supported"
        })
    }
    await createConnection()
    const {firstName, lastName, dob, email, password} = req.body
    if(!password || password.trim().length<10 || !email.match(/\S+@\S+\.\S+/) ) {
        res.status(422).json({
            error: "please check the entered credentials, either password or email is invalid"
        })
    }
    const exists = await User.findOne({email: email})
    if(exists) {
        res.status(409).json({
            error: "user already exists"
        })
    } else {
        await User.create({
            firstName,
            lastName,
            email,
            dob,
            password: createHash(process.env.PASSWORD_PREFIX + password)
        })
        res.status(202).json({
            message: "user signup was successful" 
        })
    }
}

module.exports = handler