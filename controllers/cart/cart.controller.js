const mongooseDb = require("../../db/Mongoose").getInstance()
const ProductModel = require("../../models/product.model")
const cartModel = require("../../models/cart.model")
const couponHelper = require("../../helpers/coupon.helper")
const AddValidator = require("./validators/add.validator")
const { castArray } = require('lodash');
const pMap = require("p-map")

const get = async( req, res, next ) => {
    try {
        let cart = await mongooseDb.find( cartModel )
        let updatedCart = await couponHelper.applyCoupon(cart)
        res.json({
            status: 200,
            data: { cart: updatedCart },
            message: "success"
        })
    } catch ( error ) {
        next( error )
    }
}

//add products to cart
const add = async( req, res, next ) => {
    try {
        const {item:item} = req.body
        await pMap(
            castArray(item),
            async ( sgItem ) => {
                const {productId:productId, count:count} = sgItem
                //get product for price info
                const product = await mongooseDb.findOne( ProductModel, {
                    _id: productId
                })

                //check if user already have product in cart
                const cartProduct = await mongooseDb.findOne( cartModel, {
                    productId: productId
                })

                // add the product if product is not there
                if( !cartProduct ) {
                    await mongooseDb.save( cartModel, {
                        productId: productId,
                        count: parseInt(count),
                        cost : parseInt(count) * product.price
                    })
                } else {
                    //update count of existing product
                    const exstCount = cartProduct.count
                    await mongooseDb.update( cartModel, {
                        _id: cartProduct._id
                    }, {
                        count: count + exstCount,
                        cost: (parseInt(count) + exstCount) * product.price
                    })
                }
            }
        )
        

        res.json({
            status: 200,
            data: {},
            message: "success"
        })
    } catch( error ) {
        next( error )
    }
}

module.exports = {
    AddValidator,
    get,
    add
}