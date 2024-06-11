const cartModel = require("../models/cartModel");

module.exports.updateCart = async (req, res) => {
    try {
        const items = req.body.items;
        const userId = req.user.userId;

        const cartDoc = await cartModel.findOneAndUpdate({userId: userId}, {cartItems:items}, {
            new : true,
            upsert: true
        })

        res.status(200).send(cartDoc);

        
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
        
    }
}