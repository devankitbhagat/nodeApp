class App {
    constructor(){}

    async init(){
        const _config = require("./config")
        const Mongoose = require("./db/Mongoose")
        console.log("Connecting to DB...")
        await Mongoose.getInstance().connect()
        console.log("Initializing server")
        const server = await require("./Server").getInstance(_config.PORT)
        await server.initRoutes()
        console.log("Server is running")
    }
}

const app = new App()
app.init()