sap.ui.define([
    "acc/todolist/utils/Constants"
], function (Constants) {
    "use strict";
    return {
        /**
         * Method that informs if the input is empty
         * @public
         */
        validateRequiredInput: function (oEvent) {
            let oInput = oEvent.getSource(),
                sInput = oInput.getDOMValue(),
                resourceBundle = this.getView().getModel("i18n").getResourceBundle();
            if (sInput === "" || sInput === undefined || sInput.length === 0) {
                oInput.setValueState('Error');
                oInput.setValueStateText(resourceBundle.getText("requiredField"));
            } else {
                oInput.setValueState('None');
                oInput.setValueStateText("");
            }
        },

        /**
         * Method that informs if the Text Area is empty
         * @public
         */
        validateRequiredTextArea: function (oEvent) {
            let oTextArea = oEvent.getSource(),
                sTextArea = oTextArea.getValue(),
                resourceBundle = this.getView().getModel("i18n").getResourceBundle();
            if (sTextArea === "" || sTextArea === undefined || sTextArea.length === 0) {
                oTextArea.setValueState('Error');
                oTextArea.setValueStateText(resourceBundle.getText("requiredField"));
            } else {
                oTextArea.setValueState('None');
                oTextArea.setValueStateText("");
            }
        },

        /**
         * Method that informs if the selected input is correct
         * @public
         */
        validateComboboxInput: function (oEvent) { //generic combobox validator
            let sComboboxValue = oEvent.getSource().getValue(),
                sNewValue = oEvent.getParameter("newValue"),
                sComboboxKey = oEvent.getSource().getSelectedItem(),
                sErrorValueStateTextCombobox = this.getView().getModel("i18n").getResourceBundle().getText("errorComboboxInputNotFound");
            if (sNewValue !== "" && sComboboxKey === null || sComboboxValue === "") {
                oEvent.getSource().setValue("");
                oEvent.getSource().setValueState("Error");
                oEvent.getSource().setValueStateText(sErrorValueStateTextCombobox);
            } else {
                oEvent.getSource().setValueState("None");
            }
        },

        /**
         * Event handler for submit event. Validates the input that can"t be null before adding a element
         * @public
         */
        dataValidationOnSubmit: function (oScope) {
            let inpClave1 = oScope.getView().byId(Constants.ids.input).getValue(),
                inpClave2 = oScope.getView().byId(Constants.ids.textArea).getValue(),
                inpClave3 = oScope.getView().byId(Constants.ids.slType).getSelectedKey(),
                messageValue;

            if (
                inpClave1 &&
                inpClave2 &&
                inpClave3
            ) {
                messageValue = oScope.getTextFor("theItemhasBeenGenerated");
                return {
                    success: true,
                    message: messageValue
                };
            } else {
                let aValues = [];

                if (!inpClave1) {
                    aValues.push(Constants.validations.title);
                }

                if (!inpClave2) {
                    aValues.push(Constants.validations.text);
                }

                if (!inpClave3) {
                    aValues.push(Constants.validations.type_ID);
                }

                messageValue = `${oScope.getTextFor("invalidOrEmptyFields")}: ${aValues.join(", ")}`;

                return {
                    success: false,
                    message: messageValue
                }
            }
        },

        /**
         * Event handler for submit event. Validates the input that can"t be null before adding a element
         * @public
         */
        dataValidationOnEdit: function (oScope) {
            let inpClave1 = oScope.getView().byId(Constants.ids.inputDetail).getValue(),
                inpClave2 = oScope.getView().byId(Constants.ids.textAreaDetail).getValue(),
                inpClave3 = oScope.getView().byId(Constants.ids.slTypeDetail).getSelectedKey(),
                messageValue;

            if (
                inpClave1 &&
                inpClave2 &&
                inpClave3
            ) {
                messageValue = oScope.getTextFor("theItemhasBeenUpdated");
                return {
                    success: true,
                    message: messageValue
                };
            } else {
                let aValues = [];

                if (!inpClave1) {
                    aValues.push(Constants.validations.title);
                }

                if (!inpClave2) {
                    aValues.push(Constants.validations.text);
                }

                if (!inpClave3) {
                    aValues.push(Constants.validations.type_ID);
                }

                messageValue = `${oScope.getTextFor("invalidOrEmptyFields")}: ${aValues.join(", ")}`;

                return {
                    success: false,
                    message: messageValue
                }
            }

        }
    };
});