sap.ui.define([
    "acc/todolist/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Device) {
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
                type_ID: null
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
             * Handle cancel creation
             */
            handleCreationPopUpCancel: function () {
                this.byId(this.constants.ids.creationPopUpDialog).close();
            }

        });
    });
