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

    //should have a test that verifies that the list has items
    //should have a test that verifies that the list can be filtered
    //should have a test that verifies that the list can be sorted
    //should have a test that verifies that we can add a new task
    //should have a test that verifies that we can check an item of the list and change it's state
    //should have a test that verifies that we can navigate to detail

})