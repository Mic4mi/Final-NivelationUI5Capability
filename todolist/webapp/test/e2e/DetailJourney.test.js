const { wdi5 } = require("wdio-ui5-service")
const Master = require("./pageObjects/Master")
const Detail = require("./pageObjects/Detail")
const { verifyNavigation } = require("./utils/Helper")
const { MasterSelector } = require("./utils/MasterSelectors")
const { DetailSelector } = require("./utils/DetailSelectors")
let oMasterSelector;
let oDetailSelector;

describe("Detail journey: ", () => {
    before(async () => {
        await Master.open()
        await Detail.open()
        oMasterSelector = await MasterSelector(Master._viewName);
        oDetailSelector = await DetailSelector(Detail._viewName);
    })

    it("should be allowed to navigate to a detailed view", async () => {
        const aItems = await browser.allControls(oMasterSelector.oItemToNavigateSelector)
        await aItems[0].firePress()
        // WARNING: This will vary depending on how the data comes from the backend, 
        // maybe it could be replaced by an id but, in this case, for practicality 
        // reasons we only validate a static value
        const bNavigationOcurred = await verifyNavigation('Notes(guid');
        expect(bNavigationOcurred).toBeTruthy();
    })

    // should have a test that verifies that we can edit an item    
    it("should have an edit button", async () => {
        const oEditBtn = await browser.asControl(oDetailSelector.oEditBtnSelector);
        oEditBtn.press();
        expect(oEditBtn._domId).toBeTruthy();
    })

    it("should allow edit", async () => {
        // first, we get the components
        const oInputTitle = await browser.asControl(oDetailSelector.oInputTitleSelector);
        const oInputContent = await browser.asControl(oDetailSelector.oInputContentSelector);
        const oCombobox = await browser.asControl(oDetailSelector.oComboboxSelector);

        // second, we set text and select options
        await oInputTitle.setValue('Edited with wdio!');
        await oInputContent.setValue('We edited this content with webdriverio!');
        await oCombobox.open();
        const oComboboxItem = await browser.asControl(oDetailSelector.oComboboxItemToSelectSelector);
        await oComboboxItem.press();

        // we confirm that we want to add this new task
        const oSaveButton = await browser.asControl(oDetailSelector.oSaveEditBtnSelector);
        await oSaveButton.press();
        const oConfirmButton = await browser.asControl(oDetailSelector.oConfirmDialogBtn);
        await oConfirmButton.press();

        // TODO - Verify that the item has been edited
        const oNewTitle = await browser.asControl(oDetailSelector.oNewEditedTitle);
        expect(oNewTitle._domId).toBeTruthy();
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