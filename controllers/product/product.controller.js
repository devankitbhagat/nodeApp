const mongooseDb = require("../../db/Mongoose").getInstance()
const ProductModel = require("../../models/product.model")

//add products to cart
const get = async( req, res, next ) => {
    try {
        //check if user already have product in cart
        const products = await mongooseDb.find( ProductModel )

        res.json({
            status: 200,
            data: { products: products},
            message: "success"
        })
    } catch( error ) {
        next(error)
    }
}

module.exports = {
    get
}