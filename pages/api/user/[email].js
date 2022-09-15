const createConnection = require("../../../src/dbConnection");
const User = require("../../../models/user");
const createHash = require("../../../src/hash");

const manageUserByEmailId = async(req, res) => {
    try {
        const email = req.query.email
        await createConnection();
        const result = await methodHandler[req.method](email, req.body)
        res.json(result);
    } catch(err) {
        let statusCode = 500
        if(err=="user not found") {
            statusCode = 404
        } else if(err=="incorrect older password") {
            statusCode = 401
        }
        res.status(statusCode).json({ message: err, error: true })
    }
}

const methodHandler = {
    GET: async function (email) {
        const user = await User.findOne({ email: email });
        if(!user) {
            throw new Error("user not found")
        }
        return user;
    },
    DELETE: async function (email) {
        await User.deleteOne({ email });
        return {
            message: `user with email id ${email} was deleted`,
        };
    },
    PATCH: async function (email, body) {
        const oldPassword = body.oldPassword;
        const newPassword = body.newPassword;
        const user = await User.findOne({ email: email });
        console.log(user)
        if(!user) {
            throw new Error("user not found")
        }
        if(!(user.password==createHash(process.env.PASSWORD_PREFIX + oldPassword))) {
            throw("incorrect older password")
        }
        await User.updateOne(
            {email: email},
            { password: createHash(process.env.PASSWORD_PREFIX + newPassword)}
        )
        return {
            message: `password for the user with email id: ${email} was updated`,
          };
    }
}

module.exports = manageUserByEmailId