const { wdi5 } = require("wdio-ui5-service")
const Master = require("./pageObjects/Master")
const { getListItemTitleTexts, getSortDirection, getLastUncompletedCheckbox } = require("./utils/Helper")
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

    it("should have a dialog to add a new task", async () => {
        const oButton = await browser.asControl(oMasterSelector.oAddButtonSelector);
        await oButton.press();
        const oAddTaskDialog = await browser.asControl(oMasterSelector.oAddTaskDialogSelector);
        expect(oAddTaskDialog).toBeTruthy();
    })

    it("should allow you to add a new task", async () => {
        // first, we get the components
        const oCreateButton = await browser.asControl(oMasterSelector.oCreateButtonSelector);
        const oInputTitle = await browser.asControl(oMasterSelector.oTitleInputSelector);
        const oInputContent = await browser.asControl(oMasterSelector.oContentInputSelector);
        const oCombobox = await browser.asControl(oMasterSelector.oComboboxSelector);

        // second, we set text and select options
        await oInputTitle.setValue('This is a test title');
        await oInputContent.setValue('This is a test content');
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

    it("should allow the status of a task to be modified", async () => {
        // We bring all checkboxes
        const aCheckBoxes = await browser.allControls(oMasterSelector.oCheckBoxSelector);
        // We choose the first one that has not been completed yet
        const oCheckBox = await getLastUncompletedCheckbox(aCheckBoxes);
        // We change its status
        await oCheckBox.item.setSelected(true);
        await oCheckBox.item.fireSelect();
        // We check if the item status has been changed
        // TODO REVISAR ESTA PARTE
        // const oCompletdCheckBox = await aCheckBoxes.find((item) => {
        //     return item._domId === oCheckBox.domId;
        // })
        let oCompletdCheckBox;
        for (let i = 0; i < aCheckBoxes.length; i++) {
            const oCurrentCheckbox = aCheckBoxes[i];
            if (oCurrentCheckbox._domId === oCheckBox.domId) {
                oCompletdCheckBox = oCurrentCheckbox;
                break;
            }
        }

        const bIsCompleted = await oCompletdCheckBox.getSelected();
        expect(bIsCompleted).toBeTruthy();
    })

})
