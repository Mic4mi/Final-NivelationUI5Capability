sap.ui.define(
    [],
    function () {
        "use strict";

        let Constants = {
            paths: {
                ROOT: "acc.todolist",
                NotesModel: "ListOfNotesModel",
                masterView: "masterView",
                creationModel: "CreationModel",
                detailModel: "DetailModel"
            },
            ids: {
                masterList: "list",
                creationPopUpDialog: "creationPopUpDialog"
            },
            fragments: {
                create: "acc.todolist.view.fragments.createPopup"
            }
        };
        return Constants;
    },
    true
);