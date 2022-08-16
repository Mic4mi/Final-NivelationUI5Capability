sap.ui.define([
    "acc/todolist/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (
        Controller,
        JSONModel,
        Device,
        MessageBox,
        MessageToast,
        Filter,
        FilterOperator,
        Sorter
    ) {
        "use strict";

        return Controller.extend("acc.todolist.controller.Master", {
            onInit: function () {
                try {
                    this.oDataModel = this.getOwnerComponent().getModel(this.constants.paths.NotesModel);
                    this.oDataModel.refresh();

                    let oList = this.byId(this.constants.ids.masterList),
                        oViewModel = this._createViewModel(),
                        oCreationModel = new JSONModel(this._oCreationData);

                    this.getView().setModel(oCreationModel, this.constants.paths.creationModel);
                    this.setModel(oViewModel, this.constants.paths.masterView);

                    // Triggered when navigating to the master route
                    this.getRouter().getRoute("master").attachPatternMatched(this._onMasterMatched, this);
                    this.getRouter().attachBypassed(this.onBypassed, this);

                } catch (oError) {
                    console.log(`${this.getTextFor("errWhenStartingMasterView")}: ${oError}`);
                }
            },

            _oCreationData: {
                title: null,
                date: null,
                text: null,
                type_ID: null,
                completed: false
            },

            /**
             * Event handler for list items
             * @param {*} oEvent 
             */
            onSelectionChange: function (oEvent) {
                try {
                    let oList = oEvent.getSource(),
                        bSelected = oEvent.getParameter("selected");

                    // skip navigation when deselecting an item in multi selection mode
                    if (!(oList.getMode() === "MultiSelect" && !bSelected)) {
                        // get the list item, either from the listItem parameter or from the event"s source itself (will depend on the device-dependent mode).
                        this._showDetail(oEvent.getParameter("listItem") || oEvent.getSource());
                    }
                } catch (oError) {
                    console.log(`${this.getTextFor("errNavigateToDetail")}: ${oError}`);
                }
            },

            /**
             * Allows navigation to the detail view and display it
             * @param {Object} oItem 
             */
            _showDetail: function (oItem) {
                try {
                    let sPath = oItem.getBindingContextPath();
                    let oItemFromModel = this.getOwnerComponent().getModel(this.constants.paths.NotesModel).getProperty(sPath);
                    let oDetailJSONModel = new JSONModel(oItemFromModel);

                    this.getOwnerComponent().setModel(oDetailJSONModel, this.constants.paths.detailModel);
                    var bReplace = !Device.system.phone;
                    // set the layout property of FCL control to show two columns
                    this.getModel("appView").setProperty("/layout", "TwoColumnsMidExpanded");
                    this.getRouter().navTo("detail", {
                        ID: sPath.substring(1)
                    }, bReplace);
                } catch (oError) {
                    console.log(`${this.getTextFor("errShowDetail")}: ${oError}`);
                }
            },

            /**
             * Create a basic model of the master view
             */
            _createViewModel: function () {
                return new JSONModel({
                    isFilterBarVisible: false,
                    filterBarLabel: "",
                    delay: 0,
                    title: this.getResourceBundle().getText("masterTitleCount"),
                    noDataText: this.getResourceBundle().getText("masterListNoDataText"),
                    groupBy: "None"
                });
            },

            /**
             * When returning to the master view, set the visibility of a single column.
             */
            _onMasterMatched: function () {
                this.getModel("appView").setProperty("/layout", "OneColumn");
            },

            /**
             * Open the creation popup
             */
            onOpenCreatePopup: function () {
                this.openSettingDialog(this.byId(this.constants.ids.creationPopUpDialog), this.constants.fragments.create);
            },

            /**
             * Event handler for creation button
             */
            handleCreation: function () {
                let sMessageBoxType = "confirm",
                    sMessage = this.getTextFor("doYouWishToAddANewItem");
                MessageBox[sMessageBoxType](sMessage, {
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    id: "confirmationPopup",
                    onClose: function (oAction) {
                        if (oAction === MessageBox.Action.YES) {
                            this.addNewItem();
                        }
                    }.bind(this)
                });

            },

            /**
             * Adds a new element
             */
            addNewItem: function () {
                let oValidator = this.validator.dataValidationOnSubmit(this),
                    msg;
                if (oValidator.success) {
                    let oNewItem = this.getView().getModel(this.constants.paths.creationModel).getData();
                    oNewItem.date = new Date();
                    oNewItem.completed = false;
                    this.getOdataService().create(this.constants.paths.mainEntity, oNewItem)
                        .then(oResponse => {
                            msg = oValidator.message;
                            MessageToast.show(msg);
                        })
                        .catch(oError => {
                            MessageToast.show(`${this.getTextFor("failedToCreateNewItem")}: ${oError}`);
                        })
                        .finally(() => {
                            let oEmptyModel = new JSONModel(this._oCreationData);
                            this.getView().setModel(oEmptyModel, this.constants.paths.creationModel);
                            this.cleanCreationPopup();
                            this.byId(this.constants.ids.creationPopUpDialog).close();
                        })
                } else {
                    msg = oValidator.message;
                    MessageToast.show(msg);
                }
            },

            /**
             * Handle cancel creation
             */
            handleCreationPopUpCancel: function () {
                this.cleanCreationPopup();
                this.byId(this.constants.ids.creationPopUpDialog).close();
            },

            /**
             * Allows the cleaning for the fields of the creation popup
             */
            cleanCreationPopup: function () {
                let inpClave1 = this.getView().byId(this.constants.ids.input),
                    inpClave2 = this.getView().byId(this.constants.ids.textArea),
                    inpClave3 = this.getView().byId(this.constants.ids.slType),
                    oEmptyModel = new JSONModel(this._oCreationData);
                this.getView().setModel(oEmptyModel, this.constants.paths.creationModel);
                inpClave1.setValue("");
                inpClave2.setValue("");
                inpClave3.setSelectedKey(null);
                inpClave1.setValueState("None");
                inpClave2.setValueState("None");
                inpClave3.setValueState("None");
            },

            /**
             * Handles task status change
             * @param {*} oEvent 
             */
            onHandleCheck: function (oEvent) {
                let bSelected = oEvent.getSource().getSelected(),
                    sPath = oEvent.getSource().getParent().getParent().getBindingContextPath(),
                    oChangedItem = {
                        completed: bSelected
                    };
                this.getOdataService().update(sPath, oChangedItem)
                    .then(oResponse => {
                        MessageToast.show(this.getTextFor("statusItemProperlyEdited"));
                    })
                    .catch(oError => {
                        console.log(`${this.getTextFor("statusItemCanNtotBeEdited")}: ${oError}`);
                    })
                    .finally(() => {
                        this.oDataModel.refresh();
                    })
            },

            /**
             * Event Handler for searchfield
             * @param {Event} oEvent 
             */
            onSearch: function (oEvent) {
                let sQuery = oEvent.getSource().getValue(),
                    oTable = this.byId(this.constants.ids.masterList),
                    oBinding = oTable.getBinding("items"),
                    oSearchFilter;
                if (sQuery) {
                    oSearchFilter = new Filter([
                        new Filter(this.constants.filterFields.title, FilterOperator.Contains, sQuery),
                        new Filter(this.constants.filterFields.text, FilterOperator.Contains, sQuery)
                    ], false);
                } else {
                    oSearchFilter = null;
                }

                oBinding.filter(oSearchFilter, "Application");
            },

            /**
             * Opens the settings popup for sorting
             */
            onOpenSortPopup: function name() {
                this.openSettingDialog(this.byId(this.constants.ids.sortDialog), this.constants.fragments.sort);
            },

            /**
             * Event handler for sorting 
             * @param {Event} oEvent 
             */
            onSortListConfirm: function (oEvent) {
                let oMParams = oEvent.getParameters(),
                    oTable = this.byId(this.constants.ids.masterList),
                    oBinding = oTable.getBinding("items"),
                    sPath,
                    oSorter,
                    bDescending;

                sPath = oMParams.sortItem.getKey();
                bDescending = oMParams.sortDescending;
                oSorter = new Sorter(sPath, bDescending);
                oBinding.sort(oSorter);
            }
        });
    });
