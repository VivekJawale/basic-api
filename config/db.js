const mongoose = require("mongoose")

const url=process.env.URL
const connection = mongoose.connect(url)


module.exports = {
    connection
}