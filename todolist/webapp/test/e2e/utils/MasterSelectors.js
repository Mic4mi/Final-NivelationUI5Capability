export const MasterSelector = async (sViewName) => {
    return {
        oListSelector: {
            selector: {
                interaction: "root",
                controlType: "sap.m.List",
                viewName: sViewName
            }
        },

        oSearchFieldSelector: {
            selector: {
                // controlType: "sap.m.Searchfield",
                id: "searchField",
                viewName: sViewName
            }
        },

        oSortButtonSelector: {
            selector: {
                id: "sortButton",
                viewName: sViewName
            }
        },

        oAddButtonSelector: {
            selector: {
                id: "addButton",
                viewName: sViewName
            }
        },

        oCreateButtonSelector: {
            selector: {
                id: "createBtn",
                // controlType: "sap.m.Button",
                searchOpenDialogs: true,
                viewName: sViewName
            }
        },

        oConfirmButtonSelector: {
            selector: {
                controlType: "sap.m.Button",
                properties: {
                    text: "Yes"
                },
                searchOpenDialogs: true
            }
        },

        oSortDialogSelector: {
            selector: {
                interaction: "root",
                controlType: "sap.m.ViewSettingsDialog",
                // id: "sortDialog",
                viewName: sViewName
            }
        },

        oAddTaskDialogSelector: {
            selector: {
                interaction: "root",
                // controlType: "sap.m.Dialog",
                id: "creationPopUpDialog",
                viewName: sViewName
            }
        },

        oTitleInputSelector: {
            selector: {
                interaction: "root",
                // controlType: "sap.m.Input",
                id: "input",
                viewName: sViewName
            }
        },

        oContentInputSelector: {
            selector: {
                interaction: "root",
                // controlType: "sap.m.Input",
                id: "textArea",
                viewName: sViewName
            }
        },

        oComboboxSelector: {
            selector: {
                interaction: "root",
                // controlType: "sap.m.Combobox",
                id: "slType",
                viewName: sViewName
            }
        },

        oComboboxItemToSelectSelector: {
            selector: {
                controlType: "sap.m.StandardListItem",
                viewName: sViewName,
                properties: {
                    title: "Reminder - 2"
                },
                searchOpenDialogs: true
            }
        },

        oExampleNewItemSelector: {
            selector: {
                controlType: "sap.m.Title",
                viewName: sViewName,
                properties: {
                    text: 'An item generated with wdio!'
                }
            }
        },

        oItemToNavigateSelector: {
            selector: {
                viewName: sViewName,
                controlType: "sap.m.CustomListItem"
            }
        },

        oCheckBoxSelector: {
            selector: {
                controlType: "sap.m.CheckBox",
                viewName: sViewName
            }
        },

        oExampleDeletdItemSelector :{
            selector: {
                controlType: "sap.m.Title",
                viewName: sViewName,
                properties: {
                    text: 'Edited with wdio!'
                }
            }
        }
    }
}