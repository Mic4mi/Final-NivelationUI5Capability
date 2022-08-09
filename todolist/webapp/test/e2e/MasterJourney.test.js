const { wdi5 } = require("wdio-ui5-service")
const Master = require("./pageObjects/Master")
const { getListItemTitleTexts, checkAscendingOrder, getFirstUncompletedCheckbox } = require("./utils/Helper")

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

    const oConfirmButtonSelector = {
        selector: {
            controlType: "sap.m.Button",
            properties: {
                text: "Yes"
            },
            searchOpenDialogs: true
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

    const oItemToNavigateSelector = {
        selector: {
            viewName: Master._viewName,
            controlType: "sap.m.CustomListItem"
        }
    }

    const oCheckBoxSelector = {
        selector: {
            controlType: "sap.m.CheckBox",
            viewName: Master._viewName
        }
    }

    before(async () => {
        await Master.open()
    })

    it("should have the right title", async () => {
        const sTitle = await browser.getTitle()
        expect(sTitle).toEqual("To-Do List!")
    })

    it("should have a list with at least 3 items", async () => {
        const oList = await browser.asControl(oListSelector);
        const aListItems = await oList.getItems(true);
        expect(aListItems.length).toBeGreaterThanOrEqual(3)
    })

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

    it("should allow the status of a task to be modified", async () => {
        // We bring all checkboxes
        const aCheckBoxes = await browser.allControls(oCheckBoxSelector);
        // We choose the first one that has not been completed yet
        const oItem = await getFirstUncompletedCheckbox(aCheckBoxes);
        // We change its status
        await oItem.item.setSelected(true);
        await oItem.item.fireSelect();
        // We check if the item status has been changed
        const oCompletdItem = await aCheckBoxes.find(async (item) => {
            return item._domId === oItem.domId;
        })
        const bIsCompleted = await oCompletdItem.getSelected();
        expect(bIsCompleted).toBeTruthy();
    })

    it("should be allowed to navigate to a detailed view", async () => {
        const aItems = await browser.allControls(oItemToNavigateSelector)
        await aItems[0].firePress()
        const sUrl = await browser.getUrl()
        const bNavigationOcurred = sUrl.includes('412790bd-390a-4626-ae32-ef3e7e3ccd0a');
        expect(bNavigationOcurred).toBeTruthy();
    })
})
