class Server {
    constructor( port ) {
        const express = require("express")
        this.app = express()
        const bodyParser = require("body-parser")
		this.app.use( bodyParser.json() )
		this.app.use( bodyParser.urlencoded({extended: true}) )
        this.app.listen(port)
    }

    static getInstance( port ) {
        return new Server( port )
    }

    async initRoutes() {
        // initialize routes
        const productConroller = require("./controllers/product/product.controller")
        const cartController = require("./controllers/cart/cart.controller")    
        const paramValidator = require("./util/paramValidator")

        this.app.get(
            '/products',
            productConroller.get
        )

        this.app.get(
            '/cart',
            cartController.get
        )

        this.app.post(
            '/cart',
            [cartController.AddValidator, paramValidator],
            cartController.add
        )

        //handle all errors
        this.app.use((err, req, res, next) => {
            console.log(err)
            if (res.headersSent) {
                next(err);
                return;
            }
            const message = ( err.message ) ? err.message : "Something went wrong"
            res.json({
                status: 500,
                data: {},
                message: message,
                errors: (err.errors) ? err.errors: err
            })
        })

        //handle invalid routes
        this.app.all("*", (req,res,next) => {
            res.json({
                status: 300,
                data: {},
                message: "Route not found",
            })
        })
    }
}

module.exports = Server
