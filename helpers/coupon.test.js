const couponHelper = require("./coupon.helper")
const { first } = require("lodash")

test('testing cart coupon ', async () => {
    couponHelper.applyCoupon([
        {
            "_id" : "5d887c491e89e35091609468",
            "userId" : 1,
            "productId" : "5d81c0ea3d9f301b928d098f",
            "count" : 10,
            "cost" : 300
        }
    ]
    ).then( data => {
        expect(data.finalPay).tobe(235)
    })
})

test('testing product coupon ', async () => {
    couponHelper.applyCoupon([
        {
            "_id" : "5d887c491e89e35091609468",
            "userId" : 1,
            "productId" : "5d81c0ea3d9f301b928d098f",
            "count" : 10,
            "cost" : 300
        }
    ]
    ).then( data => {
        const item = first(data.items)
        expect(item.finalPrice).tobe(255)
    })
})