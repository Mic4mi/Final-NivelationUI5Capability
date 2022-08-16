const { wdi5 } = require("wdio-ui5-service")
const Master = require("./pageObjects/Master")
const { MasterSelector } = require("./utils/MasterSelectors")

let oMasterSelector;
describe("The master page: ", async () => {
    before(async () => {
        oMasterSelector = await MasterSelector(Master._viewName);
    })

    it("should have a dialog to add a new task", async () => {
        const oButton = await browser.asControl(oMasterSelector.oAddButtonSelector);
        await oButton.press();
        const oAddTaskDialog = await browser.asControl(oMasterSelector.oAddTaskDialogSelector);
        expect(oAddTaskDialog._domId).toBeTruthy();
    })

    it("should allow you to add a new task", async () => {
        // first, we get the components
        const oCreateButton = await browser.asControl(oMasterSelector.oCreateButtonSelector);
        const oInputTitle = await browser.asControl(oMasterSelector.oTitleInputSelector);
        const oInputContent = await browser.asControl(oMasterSelector.oContentInputSelector);
        const oCombobox = await browser.asControl(oMasterSelector.oComboboxSelector);

        // second, we set text and select options
        await oInputTitle.setValue('An item generated with wdio!');
        await oInputContent.setValue("Cool, isn't it? ;)");
        await oCombobox.open();
        const oComboboxItem = await browser.asControl(oMasterSelector.oComboboxItemToSelectSelector);
        await oComboboxItem.press();
        await oCreateButton.press();

        // we confirm that we want to add this new task
        const oConfirmButton = await browser.asControl(oMasterSelector.oConfirmButtonSelector);
        await oConfirmButton.press();

        // we check if the list has the new item
        const oNewItemTitle = await browser.asControl(oMasterSelector.oExampleNewItemSelector);
        const sNewItemDomId = oNewItemTitle._domId;
        expect(sNewItemDomId).toBeTruthy();
    })

})
