const _config = require('../config')
let mongoInstance = null

class Mongoose {
  constructor() {
    this.mongoose = require('mongoose')
  }

  static getInstance() {
    if( mongoInstance == null ) {
      mongoInstance = new Mongoose()
    }
    return mongoInstance
  }

  async connect() {
    try {
      await this.mongoose.connect(_config.MONGO_URI, { useNewUrlParser: true })
    } catch( error ) {
      throw new Error( error )
    }
  }

  async save( model, data ) {
		try {
			const m = new model( data )
			const d = await m.save()
			return d
		} catch ( error ) {
			throw error
		}
  }

	async findOne( model, data ) {
		try {
			const returnedData = await model.findOne(data).exec()
			return returnedData
		} catch( error ) {
			throw error
		}
	}

	async find( model, data ) {
		try {
			const returnedData = await model.find(data).exec()
			return returnedData
		} catch( error ) {
			throw error
		}
	}

	async update( model, query, data ) {
		try {
			const returnedData = await model.update( query, {$set: data})
			return returnedData
		} catch( error ) {
			throw error
		}
	}
}

module.exports = Mongoose