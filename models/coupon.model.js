const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CouponSchema = new Schema({
    name: {
        type: String
    },
    type: {
        type: String, //off in cart, item 
        required: true,
        enum: ["item", "cart"]
    },
    itemId: {
        type: mongoose.Types.ObjectId
    },
    autoApplied: {
        type: Boolean,
    },
    discountType: {
        type: String // multiple, one_time
    },
    minValue: {
        type: Number
    },
    percentageOff: {
        type: Number
    },
    valueOff: {
        type: Number
    }
})

const CouponModel = mongoose.model("Coupon", CouponSchema, "coupons")

module.exports = CouponModel