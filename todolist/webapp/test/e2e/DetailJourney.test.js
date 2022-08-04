const { wdi5 } = require("wdio-ui5-service")
const Detail = require("./pageObjects/Detail")

describe("Detail journey: ", () => {
    before(async () => {
        await Detail.open()
    })

})