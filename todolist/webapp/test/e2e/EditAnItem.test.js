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

})