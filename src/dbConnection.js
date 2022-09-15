const mongoose = require("mongoose")
let connection;

const connect = () => mongoose.connect(process.env.MONGODB_HOSTNAME)

const createConnection = async () => {
  connection = connection ?? await connect()
  return connection
}

module.exports = createConnection