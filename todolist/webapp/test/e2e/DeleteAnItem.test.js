const { wdi5 } = require("wdio-ui5-service")
const Master = require("./pageObjects/Master")
const Detail = require("./pageObjects/Detail")
const { pressItemToNavToDetail } = require("./utils/Helper")
const { MasterSelector } = require("./utils/MasterSelectors")
const { DetailSelector } = require("./utils/DetailSelectors")
let oMasterSelector;
let oDetailSelector;

describe("The Detail Page: ", () => {
    before(async () => {
        oMasterSelector = await MasterSelector(Master._viewName);
        oDetailSelector = await DetailSelector(Detail._viewName);
    })

    // should have a test that verifies that we can delete an item
    it("should allow deletion", async () => {
        const oDeleteBtn = await browser.asControl(oDetailSelector.oDeleteBtnSelector);
        await oDeleteBtn.press();
        const oConfirmButton = await browser.asControl({
            selector: {
                viewName: Detail._viewName,
                controlType: "sap.m.Button",
                properties: {
                    text: "Yes"
                },
                searchOpenDialogs: true
            }
        });
        await oConfirmButton.press();
        // TODO - Verify that the item does not exists anymore
        const oDeletedItemTitle = await browser.asControl(oMasterSelector.oExampleDeletdItemSelector);
        const sNewItemDomId = oDeletedItemTitle._domId;
        expect(sNewItemDomId).toBeFalsy();
    })

})