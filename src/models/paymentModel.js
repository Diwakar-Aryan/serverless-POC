
const { default: mongoose } = require("mongoose")

const paymentHistorySchema = new mongoose.Schema(
    {
        userId: String,
        email: String,
        cartItems: Array,
        clientSecret: String,
        sessionId: String,
        paymentStatus: String,
        

    },
    {timestamps: true}
)

module.exports.paymentHistoryModel = new mongoose.model('PaymentHistory',paymentHistorySchema,'paymentHistory');



