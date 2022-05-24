sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History",
        "sap/ui/core/UIComponent",
        "sap/ui/model/json/JSONModel",
        "sap/ui/Device",
        "sap/ui/core/Fragment",
        "acc/todolist/utils/Formatter",
        "acc/todolist/utils/Constants",
        "acc/todolist/utils/OdataService"
    ],
    function (
        Controller,
        History,
        UIComponent,
        JSONModel,
        Device,
        Fragment,
        Formatter,
        Constants,
        OdataService
    ) {
        "use strict";

        return Controller.extend("acc.todolist.controller.BaseController", {
            formatter: Formatter,
            constants: Constants,
            _mViewSettingsDialogs: {},

            /**
             * Returns the router from the UIComponent
             */
            getRouter: function () {
                return UIComponent.getRouterFor(this);
            },

            /**
             * Convenience method for getting the view model by name in every controller of the application.
             * @public
             * @param {string} sName the model name
             * @returns {sap.ui.model.Model} the model instance
             */
            getModel: function (sName) {
                return this.getView().getModel(sName);
            },

            /**
             * Convenience method for setting the view model in every controller of the application.
             * @public
             * @param {sap.ui.model.Model} oModel the model instance
             * @param {string} sName the model name
             * @returns {sap.ui.mvc.View} the view instance
             */
            setModel: function (oModel, sName) {
                return this.getView().setModel(oModel, sName);
            },

            /**
             * Convenience method for getting the resource bundle.
             * @public
             * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
             */
            getResourceBundle: function () {
                return this.getOwnerComponent().getModel("i18n").getResourceBundle();
            },

            /**
             *  Convenience method for getting text from i18h archive
             * @param {String} sText 
             */
            getTextFor: function (sText) {
                return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sText);
            },

            /**
             * Method for navigation to specific view
             * @public
             * @param {string} psTarget Parameter containing the string for the target navigation
             * @param {Object.<string, string>} pmParameters? Parameters for navigation
             * @param {boolean} pbReplace? Defines if the hash should be replaced (no browser history entry) or set (browser history entry)
             */
            navTo: function (psTarget, pmParameters, pbReplace) {
                this.getRouter().navTo(psTarget, pmParameters, pbReplace);
            },

            /**
             * Method for using Odata Services.
             * @public
             * @returns the oData Service
             */
            getOdataService: function () {
                if (!this._odataService) {
                    this._odataService = new OdataService(this.getOwnerComponent().getModel(this.constants.paths.NotesModel));
                }
                return this._odataService;
            },

            /**
             * Event handler for the filter, sort and group buttons to open the ViewSettingsDialog.
             * @param {sap.ui.base.Event} oEvent the button press event
             * @public
             */
            getViewSettingsDialog: function (sDialogFragmentName) {
                let pDialog = this._mViewSettingsDialogs[sDialogFragmentName];

                if (!pDialog) {
                    pDialog = Fragment.load({
                        id: this.getView().getId(),
                        name: sDialogFragmentName,
                        controller: this
                    }).then(function (oDialog) {
                        if (Device.system.desktop) {
                            oDialog.addStyleClass("sapUiSizeCompact");
                        }
                        return oDialog;
                    });
                    this._mViewSettingsDialogs[sDialogFragmentName] = pDialog;
                }
                return pDialog;
            },

            /**
             * Method to open a popup
             * @param {sap.m.Dialog} oDialog
             * @param {string} sFrgamentId
             * @public
             */
            openSettingDialog: function (oDialog, sFrgamentId) {
                try {
                    if (!oDialog) {
                        this.getViewSettingsDialog(sFrgamentId)
                            .then(function (oViewSettingsDialog) {
                                this.getView().addDependent(oViewSettingsDialog);
                                oViewSettingsDialog.open();
                            }.bind(this));
                    } else {
                        oDialog.open();
                    }
                } catch (oError) {
                    console.log(`${console.log(this.getTextFor("errWhileOpenPopup"))}: ${oError}`);
                }
            },

        });
    }
);