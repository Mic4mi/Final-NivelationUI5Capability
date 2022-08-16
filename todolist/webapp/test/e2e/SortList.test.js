const { wdi5 } = require("wdio-ui5-service")
const Master = require("./pageObjects/Master")
const { getListItemTitleTexts, getSortDirection } = require("./utils/Helper")
const { MasterSelector } = require("./utils/MasterSelectors")

let oMasterSelector;
describe("The master page: ", async () => {
    before(async () => {
        oMasterSelector = await MasterSelector(Master._viewName);
    })

    it("should have a sort dialog that allows list sorting", async () => {
        // first, we search and click the dialog button
        const oButton = await browser.asControl(oMasterSelector.oSortButtonSelector);
        await oButton.press();
        // second, we search the dialog, get it's buttons and trigger the sort event
        const oSortDialog = await browser.asControl(oMasterSelector.oSortDialogSelector);
        const oDialogButtons = await oSortDialog.getButtons();
        await oDialogButtons[0].firePress()
        // third, we check if the list was sorted
        const oListAfter = await browser.asControl(oMasterSelector.oListSelector);
        const aListItemsAfter = await oListAfter.getItems();
        const aItemTextsAfter = await getListItemTitleTexts(aListItemsAfter);
        const sOrderDirection = await getSortDirection(aItemTextsAfter);
        expect(sOrderDirection).toBe('ascending');
    })

})
