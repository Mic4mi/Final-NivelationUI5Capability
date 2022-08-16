sap.ui.define(
    [],
    function () {
        "use strict";

        let Constants = {
            paths: {
                ROOT: "acc.todolist",
                appView: "appView",
                NotesModel: "ListOfNotesModel",
                mainEntity: "/Notes",
                masterView: "masterView",
                creationModel: "CreationModel",
                detailModel: "DetailModel"
            },
            ids: {
                masterList: "list",
                creationPopUpDialog: "creationPopUpDialog",
                sortDialog: "sortDialog",
                lbInput: "lbInput",
                input: "input",
                lbTextArea: "lbTextArea",
                textArea: "textArea",
                lbType: "lbType",
                slType: "slType",
                lbInputDetail: "lbInputDetail",
                inputDetail: "inputDetail",
                lbTextAreaDetail: "lbTextAreaDetail",
                textAreaDetail: "textAreaDetail",
                lbTypeDetail: "lbTypeDetail",
                slTypeDetail: "slTypeDetail"
            },
            validations: {
                title: "Título",
                date: "Fecha",
                text: "Contenido",
                type_ID: "Tipo",
                completed: "Completado"
            },
            filterFields: {
                title: "title",
                date: "date",
                text: "text",
                type_ID: "type_ID",
                completed: "completed"
            },
            fragments: {
                create: "acc.todolist.view.fragments.createPopup",
                sort: "acc.todolist.view.fragments.sorterPopup"
            }
        };
        return Constants;
    },
    true
);