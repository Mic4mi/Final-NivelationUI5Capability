const { wdi5 } = require("wdio-ui5-service")
const Detail = require("./pageObjects/Detail")

describe("Detail journey: ", () => {
    before(async () => {
        await Detail.open()
    })

    //should have a test that verifies that we can edit an item
    //should have a test that verifies that we can delete an item
    //should have a test that verifies that we can close the detail page

})