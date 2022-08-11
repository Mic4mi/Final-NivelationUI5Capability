const { wdi5 } = require("wdio-ui5-service")
const Master = require("./pageObjects/Master")
const { getListItemTitleTexts, checkAscendingOrder, getFirstUncompletedCheckbox } = require("./utils/Helper")
const { Selector } = require("./utils/MasterSelectors")

let oSelector;
describe("The master page: ", async () => {
    before(async () => {
        await Master.open()
        oSelector = await Selector(Master._viewName);
    })

    // it("should have the right title", async () => {
    //     const sTitle = await browser.getTitle()
    //     expect(sTitle).toEqual("To-Do List!")
    // })

    // it("should have a list with at least 3 items", async () => {
    //     const oList = await browser.asControl(oSelector.oListSelector);
    //     const aListItems = await oList.getItems(true);
    //     expect(aListItems.length).toBeGreaterThanOrEqual(3)
    // })

    // it("should have a searchfield that filters the list", async () => {
    //     const oSearchfield = await browser.asControl(oSelector.oSearchFieldSelector);
    //     await oSearchfield.setValue('agua');
    //     await oSearchfield.fireLiveChange();

    //     const oList = await browser.asControl(oSelector.oListSelector);
    //     const aListItems = await oList.getItems(true);
    //     expect(aListItems.length).toBe(1);

    //     await oSearchfield.setValue('');
    //     await oSearchfield.fireLiveChange();
    // })

    // it("should have a sort dialog that allows list sorting", async () => {
    //     // first, we search and click the dialog button
    //     const oButton = await browser.asControl(oSelector.oSortButtonSelector);
    //     await oButton.press();
    //     // second, we search the dialog, get it's buttons and trigger the sort event
    //     const oSortDialog = await browser.asControl(oSelector.oSortDialogSelector);
    //     const oDialogButtons = await oSortDialog.getButtons();
    //     await oDialogButtons[0].firePress()
    //     // third, we check if the list was sorted
    //     const oListAfter = await browser.asControl(oSelector.oListSelector);
    //     const aListItemsAfter = await oListAfter.getItems();
    //     const aItemTextsAfter = await getListItemTitleTexts(aListItemsAfter);
    //     const bIsTheListSortedInAscendingOrder = await checkAscendingOrder(aItemTextsAfter);
    //     expect(bIsTheListSortedInAscendingOrder).toBeTruthy();
    // })

    // it("should have a dialog to add a new task", async () => {
    //     const oButton = await browser.asControl(oSelector.oAddButtonSelector);
    //     await oButton.press();
    //     const oAddTaskDialog = await browser.asControl(oSelector.oAddTaskDialogSelector);
    //     expect(oAddTaskDialog).toBeTruthy();
    // })

    // it("should allow you to add a new task", async () => {
    //     // first, we get the components
    //     const oCreateButton = await browser.asControl(oSelector.oCreateButtonSelector);
    //     const oInputTitle = await browser.asControl(oSelector.oTitleInputSelector);
    //     const oInputContent = await browser.asControl(oSelector.oContentInputSelector);
    //     const oCombobox = await browser.asControl(oSelector.oComboboxSelector);

    //     // second, we set text and select options
    //     await oInputTitle.setValue('This is a test title');
    //     await oInputContent.setValue('This is a test content');
    //     await oCombobox.open();
    //     const oComboboxItem = await browser.asControl(oSelector.oComboboxItemToSelectSelector);
    //     await oComboboxItem.press();
    //     await oCreateButton.press();

    //     // we confirm that we want to add this new task
    //     const oConfirmButton = await browser.asControl(oSelector.oConfirmButtonSelector);
    //     await oConfirmButton.press();

    //     // we check if the list has the new item
    //     const oNewItemTitle = await browser.asControl(oSelector.oExampleNewItemSelector);
    //     const sNewItemDomId = oNewItemTitle._domId;
    //     expect(sNewItemDomId).toBeTruthy();
    // })

    // it("should allow the status of a task to be modified", async () => {
    //     // We bring all checkboxes
    //     const aCheckBoxes = await browser.allControls(oSelector.oCheckBoxSelector);
    //     // We choose the first one that has not been completed yet
    //     const oItem = await getFirstUncompletedCheckbox(aCheckBoxes);
    //     // We change its status
    //     await oItem.item.setSelected(true);
    //     await oItem.item.fireSelect();
    //     // We check if the item status has been changed
    //     const oCompletdItem = await aCheckBoxes.find(async (item) => {
    //         return item._domId === oItem.domId;
    //     })
    //     const bIsCompleted = await oCompletdItem.getSelected();
    //     expect(bIsCompleted).toBeTruthy();
    // })
})
