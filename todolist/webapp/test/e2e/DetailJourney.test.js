const { wdi5 } = require("wdio-ui5-service")
const Master = require("./pageObjects/Master")
const Detail = require("./pageObjects/Detail")
const { Selector } = require("./utils/MasterSelectors")
let oSelector;

describe("Detail journey: ", () => {
    before(async () => {
        await Master.open() // We first run this command to 
        await Detail.open()
        oSelector = await Selector(Master._viewName);
    })

    const oEditBtnSelector = {
        selector: {
            // controlType: "sap.m.Searchfield",
            id: "edit",
            viewName: Detail._viewName
        }
    }

    const oInputTitleSelector = {
        selector: {
            interaction: "root",
            // controlType: "sap.m.Input",
            id: "inputDetail",
            viewName: Detail._viewName
        }
    }

    const oInputContentSelector = {
        selector: {
            interaction: "root",
            // controlType: "sap.m.Input",
            id: "textAreaDetail",
            viewName: Detail._viewName
        }
    }

    const oComboboxSelector = {
        selector: {
            interaction: "root",
            // controlType: "sap.m.Combobox",
            id: "slTypeDetail",
            viewName: Detail._viewName
        }
    }

    const oComboboxItemToSelectSelector = {
        selector: {
            controlType: "sap.m.StandardListItem",
            viewName: Detail._viewName,
            properties: {
                title: "Critical - 3"
            },
            searchOpenDialogs: true
        }
    }

    const oSaveEditBtnSelector = {
        selector: {
            id: "saveBtn",
            viewName: sViewName
        }
    }

    it("should be allowed to navigate to a detailed view", async () => {
        const aItems = await browser.allControls(oItemToNavigateSelector)
        await aItems[0].firePress()
        const sUrl = await browser.getUrl()
        const bNavigationOcurred = sUrl.includes('412790bd-390a-4626-ae32-ef3e7e3ccd0a');
        expect(bNavigationOcurred).toBeTruthy();
    })

    //should have a test that verifies that we can edit an item    
    it("should have an edit button", async () => {
        const oEditBtn = await browser.asControl(oEditBtnSelector);
        oEditBtn.press();
        expect(oEditBtn._domId).toBeTruthy();
    })

    it("should allow edit", async () => {
        // first, we get the components
        const oInputTitle = await browser.asControl(oInputTitleSelector);
        const oInputContent = await browser.asControl(oInputContentSelector);
        const oCombobox = await browser.asControl(oComboboxSelector);
        // second, we set text and select options
        await oInputTitle.setValue('We edited this item with wdio!');
        await oInputContent.setValue('We edited this content with webdriverio!');
        await oCombobox.open();
        const oComboboxItem = await browser.asControl(oComboboxItemToSelectSelector);
        await oComboboxItem.press();

        // we confirm that we want to add this new task
        const oConfirmButton = await browser.asControl(oSaveEditBtnSelector);
        await oConfirmButton.press();

        // TODO - Verify that the item has been edited
    })

    //should have a test that verifies that we can delete an item
    //should have a test that verifies that we can close the detail page

})