const { default: mongoose } = require("mongoose")

const cartSchema = new mongoose.Schema(
    {
        userId: String,
        cartItems: Array
    },
    {timestamps: true}
)

const cartModel = new mongoose.model('cart',cartSchema)

module.exports = cartModel