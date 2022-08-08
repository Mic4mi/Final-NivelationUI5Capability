const { wdi5 } = require("wdio-ui5-service")
const Master = require("./pageObjects/Master")
const { getListItemTexts } = require("./utils/Helper")

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

    const oSortDialogSelector = {
        selector: {
            interaction: "root",
            controlType: "sap.m.ViewSettingsDialog",
            // id: "sortDialog",
            viewName: Master._viewName
        }
    }

    const oAscendingSortRadioButtonSelector = {
        selector: {
            controlType: "sap.m.RadioButton",
            viewName: Master._viewName,
            properties: {
                editable: true
            },
            searchOpenDialogs: true,
            ancestor: {
                controlType: "sap.m.StandardListItem",
                viewName: Master._viewName,
                properties: {
                    title: "Ascending"
                },
                searchOpenDialogs: true
            }
        }
    }

    const oTitleSortRadioButtonSelector = {
        selector: {
            controlType: "sap.m.RadioButton",
            viewName: Master._viewName,
            properties: {
                editable: true
            },
            searchOpenDialogs: true,
            ancestor: {
                controlType: "sap.m.StandardListItem",
                viewName: Master._viewName,
                properties: {
                    title: "Título"
                },
                searchOpenDialogs: true
            }
        }
    }

    const oAcceptSortButtonSelector = {
        viewName: Master._viewName,
        controlType: "sap.m.Button",
        searchOpenDialogs: true,

    }

    before(async () => {
        await Master.open()
    })

    // it("should have the right title", async () => {
    //     const sTitle = await browser.getTitle()
    //     expect(sTitle).toEqual("To-Do List!")
    // })

    // //should have a test that verifies that the list has items
    // it("should have a list with at least 3 items", async () => {
    //     const oList = await browser.asControl(oListSelector);
    //     const aListItems = await oList.getItems(true);
    //     expect(aListItems.length).toBeGreaterThanOrEqual(3)
    // })

    // //should have a test that verifies that the list can be filtered
    // it("should have a searchfield that filters the list", async () => {
    //     const oSearchfield = await browser.asControl(oSearchFieldSelector);
    //     await oSearchfield.setValue('agua');
    //     await oSearchfield.fireLiveChange();

    //     const oList = await browser.asControl(oListSelector);
    //     const aListItems = await oList.getItems(true);
    //     expect(aListItems.length).toBe(1);

    //     await oSearchfield.setValue('');
    //     await oSearchfield.fireLiveChange();
    // })

    //should have a test that verifies that the list can be sorted
    //TO-DO verify that the lis has been filtered!

    it("should have a sort dialog that allows list sorting", async () => {
        // This test could be optimized, for sure. It's just a first approach. 
        // to-do verify that the list is sorted and... maybe split this test in two? 
        const oListBefore = await browser.asControl(oListSelector);
        const aListItemsBefore = await oListBefore.getItems();
        // first we get the initial items order
        const aItemTextsBefore = await getListItemTexts(aListItemsBefore);
        console.log("LIST BEFORE!!!!:    ", aItemTextsBefore);
        // second we get the button a press it
        const oButton = await browser.asControl(oSortButtonSelector);
        await oButton.press();
        //third, we search the dialog
        const oSortDialog = await browser.asControl(oSortDialogSelector);
        //quarter, we fire sort event
        const oDialogButtons = await oSortDialog.getButtons();
        const oOkButton = oDialogButtons[0];
        await oOkButton.firePress()
        //fifth, we verify the if the list has been sorted
        const oListAfter = await browser.asControl(oListSelector);
        const aListItemsAfter = await oListAfter.getItems();
        const aItemTextsAfter = await getListItemTexts(aListItemsAfter);
        console.log("LIST AFTER!!!!:    ", aItemTextsAfter);
        //sixth, we compare the two list to see if the second one is sorted. 
    })

    //should have a test that verifies that we can add a new task
    //should have a test that verifies that we can check an item of the list and change it's state
    //should have a test that verifies that we can navigate to detail


})
