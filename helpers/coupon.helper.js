const mongooseDb = require("../db/Mongoose").getInstance()
const couponModel = require("../models/coupon.model")
const pMap = require('p-map');

const applyCoupon = async ( cartItems ) => {
    try {
        const response = {
            items: [],
            cartValue: 0,
            finalPay: 0
        }

        const cartCoupon = await mongooseDb.findOne(couponModel, {
            type: "cart",
            autoApplied: true
        })
        
        //apply item coupons
        const updatedCart = 
            await pMap(
                cartItems,
                async (item) => {
                    item = item.toJSON()
                    item.finalPrice = item.price
                    item.discout = 0
                    
                    const productCoupon = await mongooseDb.findOne( couponModel, {
                        itemId: item.productId,
                        autoApplied: true
                    })

                    if( productCoupon ) {
                        if( productCoupon.discountType == "multiple") {
                            const offAmount = ( Math.floor(item.count / productCoupon.minValue) ) * productCoupon.valueOff
                            item.finalPrice = item.cost - offAmount
                            item.discout = offAmount
                        }
                    }

                    response.cartValue += item.finalPrice

                    return item
                }
            )
        
        response.items = updatedCart
        response.finalPay = response.cartValue

        if( cartCoupon ) {
            if( response.cartValue > cartCoupon.minValue ) {
                response.finalPay = response.cartValue - cartCoupon.valueOff
            }
        }

        return response

    } catch( error ) {
        throw error 
    }
    
}

module.exports = {
    applyCoupon
}