const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userId: {
        type: Number,
        default: 1
    },
    productId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    }
})

const CartModel = mongoose.model("Cart", CartSchema, "cart")

module.exports = CartModel