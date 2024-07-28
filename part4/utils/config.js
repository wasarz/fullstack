require('dotenv').config()

let PORT = process.env.PORT
let MONGOURL = process.env.MONGODB_URI

module.exports = {
  MONGOURL,
  PORT
}