const { wdi5 } = require("wdio-ui5-service")
const Master = require("./pageObjects/Master")
const { getListItemTitleTexts, checkAscendingOrder } = require("./utils/Helper")

describe("The master page: ", async () => {
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

    const oSortButtonSelector = {
        selector: {
            id: "sortButton",
            viewName: Master._viewName
        }
    }

    const oAddButtonSelector = {
        selector: {
            id: "addButton",
            viewName: Master._viewName
        }
    }

    const oCreateButtonSelector = {
        selector: {
            id: "createBtn",
            // controlType: "sap.m.Button",
            searchOpenDialogs: true,
            viewName: Master._viewName
        }
    }

    const oSortDialogSelector = {
        selector: {
            interaction: "root",
            controlType: "sap.m.ViewSettingsDialog",
            // id: "sortDialog",
            viewName: Master._viewName
        }
    }

    const oConfirmationDialogSelector = {
        selector: {
            interaction: "root",
            id: "confirmationPopup",
            // controlType: "sap.m.Dialog",
            searchOpenDialogs: true
        }
    }

    const oConfirmButtonSelector = {
        selector: {
            controlType: "sap.m.Button",
            properties: {
                text: "Yes"
            },
            searchOpenDialogs: true
        }
    }

    const oAddTaskDialogSelector = {
        selector: {
            interaction: "root",
            // controlType: "sap.m.Dialog",
            id: "creationPopUpDialog",
            viewName: Master._viewName
        }
    }

    const oTitleInputSelector = {
        selector: {
            interaction: "root",
            // controlType: "sap.m.Input",
            id: "input",
            viewName: Master._viewName
        }
    }

    const oContentInputSelector = {
        selector: {
            interaction: "root",
            // controlType: "sap.m.Input",
            id: "textArea",
            viewName: Master._viewName
        }
    }

    const oComboboxSelector = {
        selector: {
            interaction: "root",
            // controlType: "sap.m.Combobox",
            id: "slType",
            viewName: Master._viewName
        }
    }

    const oComboboxItemToSelectSelector = {
        selector: {
            controlType: "sap.m.StandardListItem",
            viewName: Master._viewName,
            properties: {
                title: "Reminder - 2"
            },
            searchOpenDialogs: true
        }
    }

    const oExampleNewItemSelector = {
        selector: {
            controlType: "sap.m.Title",
            viewName: Master._viewName,
            properties: {
                text: 'This is a test title'
            }
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

        await oSearchfield.setValue('');
        await oSearchfield.fireLiveChange();
    })

    it("should have a sort dialog that allows list sorting", async () => {
        // first, we search and click the dialog button
        const oButton = await browser.asControl(oSortButtonSelector);
        await oButton.press();
        // second, we search the dialog, get it's buttons and trigger the sort event
        const oSortDialog = await browser.asControl(oSortDialogSelector);
        const oDialogButtons = await oSortDialog.getButtons();
        await oDialogButtons[0].firePress()
        // third, we check if the list was sorted
        const oListAfter = await browser.asControl(oListSelector);
        const aListItemsAfter = await oListAfter.getItems();
        const aItemTextsAfter = await getListItemTitleTexts(aListItemsAfter);
        const bIsTheListSortedInAscendingOrder = await checkAscendingOrder(aItemTextsAfter);
        expect(bIsTheListSortedInAscendingOrder).toBeTruthy();
    })

    //should have a test that verifies that we can add a new task
    it("should have a dialog to add a new task", async () => {
        const oButton = await browser.asControl(oAddButtonSelector);
        await oButton.press();
        const oAddTaskDialog = await browser.asControl(oAddTaskDialogSelector);
        expect(oAddTaskDialog).toBeTruthy();
    })

    it("should allow you to add a new task", async () => {
        const oCreateButton = await browser.asControl(oCreateButtonSelector);
        const oInputTitle = await browser.asControl(oTitleInputSelector);
        const oInputContent = await browser.asControl(oContentInputSelector);
        const oCombobox = await browser.asControl(oComboboxSelector);

        // we set text and select options
        await oInputTitle.setValue('This is a test title');
        await oInputContent.setValue('This is a test content');
        await oCombobox.open();
        const oComboboxItem = await browser.asControl(oComboboxItemToSelectSelector);
        await oComboboxItem.press();
        await oCreateButton.press();

        // we confirm that we want to add this new task
        const oConfirmButton = await browser.asControl(oConfirmButtonSelector);
        await oConfirmButton.press();

        // we check if the list has the new item
        const oNewItemTitle = await browser.asControl(oExampleNewItemSelector);
        const sNewItemDomId = oNewItemTitle._domId;
        expect(sNewItemDomId).toBeTruthy();
    })

    //should have a test that verifies that we can check an item of the list and change it's state
    //should have a test that verifies that we can navigate to detail

})
