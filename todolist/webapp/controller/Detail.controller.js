sap.ui.define([
    "acc/todolist/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, MessageToast) {
        "use strict";

        return Controller.extend("acc.todolist.controller.Detail", {
            onInit: function () {
                try {
                    this.oDataModel = this.getOwnerComponent().getModel(this.constants.paths.NotesModel);
                    let oViewModel = new JSONModel({
                        busy: false,
                        delay: 0
                    });

                    this.getRouter().getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
                    this.setModel(oViewModel, this.constants.paths.detailView);
                } catch (error) {
                    MessageToast.show(`${this.getTextFor("errorWhileloadingDetailPage")}: ${oError}`);
                }
            },

            /**
             * Binds the view to the object path and expands the aggregated line items.
             * @function
             * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
             * @private
             */
            _onObjectMatched: function (oEvent) {
                let sObjectId = oEvent.getParameter("arguments").ID;
                this.currentObjectPath = sObjectId;
                let sPath = "/" + this.currentObjectPath;
                this.onCancelEdit();
                this.getOdataService().read(sPath)
                    .then((oRetrievedResult) => {
                        let oData = oRetrievedResult;
                        let oDataModel = new JSONModel();
                        oDataModel.setData(oData);
                        this.getOwnerComponent().setModel(oDataModel, this.constants.paths.detailModel);
                    })
                    .catch((oError) => {
                        MessageToast.show(`${this.getTextFor("errorWhenNavigatingtoItem")}: ${oError}`);
                    });

                this.getModel(this.constants.paths.appView).setProperty("/layout", "TwoColumnsMidExpanded");
                this._bindView("/" + this.currentObjectPath);
            },

            /**
             * Binds the view to the object path. Makes sure that detail view displays
             * a busy indicator while data for the corresponding element binding is loaded.
             * @function
             * @param {string} sObjectPath path to the object to be bound to the view.
             * @private
            */
            _bindView: function (sObjectPath) {
                // Set busy indicator during view binding
                let oViewModel = this.getModel(this.constants.paths.detailView);
                // If the view was not bound yet its not busy, only if the binding requests data it is set to busy again
                oViewModel.setProperty("/busy", false);

                this.getView().bindElement({
                    path: sObjectPath,
                    events: {
                        change: this._onBindingChange.bind(this),
                        dataRequested: function () {
                            oViewModel.setProperty("/busy", true);
                        },
                        dataReceived: function () {
                            oViewModel.setProperty("/busy", false);
                        }
                    }
                });
            },

            /**
             * Event that we attached to the event binding
             */
            _onBindingChange: function () {
                let oView = this.getView(),
                    oElementBinding = oView.getElementBinding();
                // No data for the binding
                if (!oElementBinding.getBoundContext()) {
                    this.getRouter().getTargets().display("detailObjectNotFound");
                    // if object could not be found, the selection in the master list
                    // does not make sense anymore.
                    this.getOwnerComponent().oListSelector.clearMasterListSelection();
                    return;
                }

                let sPath = oElementBinding.getPath();
                this.getOwnerComponent().oListSelector.selectAListItem(sPath);
            },

            /**
             * Event that handles the button that zooms the detail view
             */
            toggleFullScreen: function () {
                let bFullScreen = this.getModel(this.constants.paths.appView).getProperty("/actionButtonsInfo/midColumn/fullScreen");
                this.getModel(this.constants.paths.appView).setProperty("/actionButtonsInfo/midColumn/fullScreen", !bFullScreen);
                if (!bFullScreen) {
                    // store current layout and go full screen
                    this.getModel(this.constants.paths.appView).setProperty("/previousLayout", this.getModel(this.constants.paths.appView).getProperty("/layout"));
                    this.getModel(this.constants.paths.appView).setProperty("/layout", "MidColumnFullScreen");
                } else {
                    // reset to previous layout
                    this.getModel(this.constants.paths.appView).setProperty("/layout", this.getModel(this.constants.paths.appView).getProperty("/previousLayout"));
                }
            },

            /**
             * Event handling for the closing of the detail view
             */
            onCloseDetailPress: function () {
                this.getModel(this.constants.paths.appView).setProperty("/actionButtonsInfo/midColumn/fullScreen", false);
                // No item should be selected on master after detail page is closed
                this.getOwnerComponent().oListSelector.clearMasterListSelection();
                this.getRouter().navTo("master");
            },

            /**
             * Event handler for edit event. makes the required fields editable and shows footer
             * @public
             */
            onEditAction: function () {
                this.toggleEdition(true);
            },

            /**
             * Makes all the fields non editable
             */
            onCancelEdit: function () {
                this.toggleEdition(false);
            },

            /**
             * Allows to change the editability or non-editability of form elements.
             * @param {Boolean} bEnabled 
             */
            toggleEdition: function (bEnabled) {
                let inpClave1 = this.getView().byId(this.constants.ids.inputDetail),
                    inpClave2 = this.getView().byId(this.constants.ids.textAreaDetail),
                    inpClave3 = this.getView().byId(this.constants.ids.slTypeDetail),
                    lbClave1 = this.getView().byId(this.constants.ids.lbInputDetail),
                    lbClave2 = this.getView().byId(this.constants.ids.lbTextAreaDetail),
                    lbClave3 = this.getView().byId(this.constants.ids.lbTypeDetail);
                inpClave1.setEnabled(bEnabled);
                inpClave2.setEnabled(bEnabled);
                inpClave3.setEnabled(bEnabled);
                inpClave1.setEditable(bEnabled);
                inpClave2.setEditable(bEnabled);
                inpClave3.setEditable(bEnabled);
                lbClave1.setRequired(bEnabled);
                lbClave2.setRequired(bEnabled);
                lbClave3.setRequired(bEnabled);
                this.getView().mAggregations.content[0].setShowFooter(bEnabled);
            },

            /**
             * Event handler for saving the edit. makes fields not editable and hides footer
             * @public
             */
            handleSaveEdit: function () {
                let sMessageBoxType = "confirm",
                    sMessage = this.getTextFor("doYouWishToEditThisItem"),
                    sQueryPath = "/" + this.currentObjectPath,
                    that = this;

                MessageBox[sMessageBoxType](sMessage, {
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    onClose: function (oAction) {
                        if (oAction === MessageBox.Action.YES) {
                            let oValidator = this.validator.dataValidationOnEdit(this);
                            if (oValidator.success) {
                                let oDetailModel = this.getView().getModel(this.constants.paths.detailModel),
                                    oDataDetail = oDetailModel.getData(),
                                    oChangedItem = {
                                        title: oDataDetail.title,
                                        text: oDataDetail.text,
                                        type_ID: oDataDetail.type_ID
                                    };
                                this.getOdataService().update(sQueryPath, oChangedItem)
                                    .then(oResponse => {
                                        MessageToast.show(oValidator.message);
                                    })
                                    .catch(oError => {
                                        console.log(`${this.getTextFor("statusItemCanNtotBeEdited")}: ${oError}`);
                                        MessageToast.show(`${this.getTextFor("statusItemCanNtotBeEdited")}: ${oError}`);
                                        this.getOdataService().read(sQueryPath)
                                            .then(oRetrievedResult => {
                                                let oData = oRetrievedResult,
                                                    oDetailModel = this.getView().getModel(this.constants.paths.detailModel);

                                                oDetailModel.setData(oData);
                                                MessageToast.show(this.getTextFor("itemCouldNotBeEdited"));
                                            })
                                            .catch(oError => {
                                                MessageToast.show(`${this.getTextFor("statusItemCanNtotBeEdited")}`);
                                            })

                                    })
                                    .finally(() => {
                                        this.oDataModel.refresh();
                                    })

                                this.toggleEdition(false);
                            } else {
                                MessageToast.show(oValidator.message);
                            }
                        }
                    }.bind(this)
                });
                return;
            },

            /**
             * Event handler for canceling the edit. makes fields not editable and hides footer
             * @public
             */
            handleCancelEdit: function () {
                let sQueryPath = "/" + this.currentObjectPath;

                this.getOdataService().read(sQueryPath)
                    .then(oRetrievedResult => {
                        let oData = oRetrievedResult,
                            oDetailModel = this.getView().getModel(this.constants.paths.detailModel);
                        oDetailModel.setData(oData);

                    })
                    .catch(oError => {
                        let oResponseError = JSON.parse(oError.responseText).error;
                        console.log(oResponseError);
                        MessageToast.show(this.getTextFor("errCancelEdition"));
                    })
                    .finally(() => {
                        this.onCancelEdit();
                    })

            },

            /**
             * Event handler for the delete operation. Shows a MessageBox for confirmation
             * before deletion
             * @public
             */
            onDeleteAction: function () {
                let sMessageBoxType = "warning",
                    sMessage = this.getTextFor("doYouWishToDeleteThisItem"),
                    queryPath = "/" + this.currentObjectPath;
                MessageBox[sMessageBoxType](sMessage, {
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    onClose: function (oAction) {
                        if (oAction === MessageBox.Action.YES) {
                            this.getOdataService().delete(queryPath)
                                .then((oData, oResponse) => {
                                    MessageToast.show(this.getTextFor("deletedElement"));
                                    this.currentObjectPath = "";
                                    this.onCloseDetailPress();
                                })
                                .catch(oError => {
                                    MessageToast.show(this.getTextFor("theItemCouldNotBeeliminated"));
                                });
                        }
                    }.bind(this)
                });
            },
        });
    });
