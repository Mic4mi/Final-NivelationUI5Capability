const { wdi5 } = require("wdio-ui5-service")
const Master = require("./pageObjects/Master")
const { MasterSelector } = require("./utils/MasterSelectors")

let oMasterSelector;
describe("The master page: ", async () => {
    before(async () => {
        await Master.open()
        oMasterSelector = await MasterSelector(Master._viewName);
    })

    it("should have the right title", async () => {
        const sTitle = await browser.getTitle()
        expect(sTitle).toEqual("To-Do List!")
    })

    it("should have a list with at least 3 items", async () => {
        const oList = await browser.asControl(oMasterSelector.oListSelector);
        const aListItems = await oList.getItems(true);
        expect(aListItems.length).toBeGreaterThanOrEqual(3)
    })

})
