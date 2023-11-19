const mongoose = require("mongoose")
require("dotenv").config()

const dbConnection = async() => {
    const params = {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Mongo DB connected")
    } catch (error) {
        console.log("Mongo DB error : ",error)
    }
}

module.exports = dbConnection