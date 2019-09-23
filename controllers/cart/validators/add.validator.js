const { checkSchema } = require('express-validator');
const { isString, castArray } = require('lodash');
const mongoose = require('mongoose')
const pMap = require("p-map")
const ObjectId = mongoose.Types.ObjectId;

const addSchema = {
  item: {
    in: "body",
    required: true,
    custom: {
        options: async value => {
            await pMap(
                castArray(value),
                async (item) => {
                    if( !item.productId || !item.count ) {
                        throw new Error("item should have productId and count" )
                    }

                    if( !ObjectId.isValid(item.productId) ) {
                        throw new Error("productId should be objectId")
                    }
                }
            )

            return true
        }
    }
  },
};

const addValidator = checkSchema(addSchema);

module.exports = addValidator
