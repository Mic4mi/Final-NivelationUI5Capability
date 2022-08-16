export const DetailSelector = async (sViewName) => {
    return {
        oEditBtnSelector: {
            selector: {
                // controlType: "sap.m.Searchfield",
                id: "edit",
                viewName: sViewName
            }
        },

        oDeleteBtnSelector: {
            selector: {
                // controlType: "sap.m.Searchfield",
                id: "delete",
                viewName: sViewName
            }
        },

        oInputTitleSelector: {
            selector: {
                interaction: "root",
                // controlType: "sap.m.Input",
                id: "inputDetail",
                viewName: sViewName
            }
        },

        oInputContentSelector: {
            selector: {
                interaction: "root",
                // controlType: "sap.m.Input",
                id: "textAreaDetail",
                viewName: sViewName
            }
        },

        oComboboxSelector: {
            selector: {
                interaction: "root",
                // controlType: "sap.m.Combobox",
                id: "slTypeDetail",
                viewName: sViewName
            }
        },

        oComboboxItemToSelectSelector: {
            selector: {
                controlType: "sap.m.StandardListItem",
                viewName: sViewName,
                properties: {
                    title: "Critical - 3"
                },
                searchOpenDialogs: true
            }
        },

        oSaveEditBtnSelector: {
            selector: {
                id: "saveBtn",
                viewName: sViewName
            }
        },

        oConfirmDialogBtn: {
            selector: {
                controlType: "sap.m.Button",
                properties: {
                    text: "Yes"
                },
                searchOpenDialogs: true
            }
        },

        oNewEditedTitle: {
            selector: {
                viewName: sViewName,
                id: "idTitlePadron",
                properties: {
                    text: 'Edited with wdio!'
                },
            }
        }
    }
}