const { wdi5 } = require("wdio-ui5-service")
const Master = require("./pageObjects/Master")
const { MasterSelector } = require("./utils/MasterSelectors")

let oMasterSelector;
describe("The master page: ", async () => {
    before(async () => {
        oMasterSelector = await MasterSelector(Master._viewName);
    })

    it("should have a searchfield that filters the list", async () => {
        const oSearchfield = await browser.asControl(oMasterSelector.oSearchFieldSelector);
        await oSearchfield.setValue('Valor');
        await oSearchfield.fireLiveChange();

        const oList = await browser.asControl(oMasterSelector.oListSelector);
        const aListItems = await oList.getItems(true);
        expect(aListItems.length).toBe(1);

        await oSearchfield.setValue('');
        await oSearchfield.fireLiveChange();
    })

})
