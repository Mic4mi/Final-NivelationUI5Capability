const { wdi5 } = require("wdio-ui5-service")
const Master = require("./pageObjects/Master")

describe("Master journey: ", () => {
    before(async () => {
        await Master.open()
    })

    it("should have the right title", async () => {
        const title = await browser.getTitle()
        expect(title).toEqual("To-Do List!")
    })

})