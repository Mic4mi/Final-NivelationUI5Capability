const { wdi5 } = require("wdio-ui5-service")
const Master = require("./pageObjects/Master")

describe("The master page: ", () => {
    const oListSelector = {
        selector: {
            interaction: "root",
            controlType: "sap.m.List",
            viewName: Master._viewName
        }
    }

    const oSearchFieldSelector = {
        selector: {
            // controlType: "sap.m.Searchfield",
            id: "searchField",
            viewName: Master._viewName
        }
    }

    before(async () => {
        await Master.open()
    })

    it("should have the right title", async () => {
        const sTitle = await browser.getTitle()
        expect(sTitle).toEqual("To-Do List!")
    })

    //should have a test that verifies that the list has items
    it("should have a list with at least 3 items", async () => {
        const oList = await browser.asControl(oListSelector);
        const aListItems = await oList.getItems(true);
        expect(aListItems.length).toBeGreaterThanOrEqual(3)
    })

    //should have a test that verifies that the list can be filtered
    it("should have a searchfield that filters the list", async () => {
        const oSearchfield = await browser.asControl(oSearchFieldSelector);
        await oSearchfield.setValue('agua');
        await oSearchfield.fireLiveChange();

        const oList = await browser.asControl(oListSelector);
        const aListItems = await oList.getItems(true);
        expect(aListItems.length).toBe(1);
    })

    //should have a test that verifies that the list can be sorted
    //should have a test that verifies that we can add a new task
    //should have a test that verifies that we can check an item of the list and change it's state
    //should have a test that verifies that we can navigate to detail

})