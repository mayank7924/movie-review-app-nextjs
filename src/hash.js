const crypto = require("crypto")

const createHash = (input) => {
    //perform hashing logic
    const hash = crypto.createHash("sha256")
    const hashedValue = hash.update(input).digest("hex")
    return hashedValue
}

module.exports = createHash