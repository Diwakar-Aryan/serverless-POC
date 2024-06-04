const { default: mongoose } = require("mongoose")
const { mongoEnv } = require('../config/envConfig')
const initMongo = async () => {
    try {
        await mongoose.connect(mongoEnv.mongoUri)
        
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = initMongo