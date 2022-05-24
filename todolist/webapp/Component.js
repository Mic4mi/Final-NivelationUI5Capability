sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "acc/todolist/model/models",
    "acc/todolist/controller/ListSelector"
],
    function (UIComponent, Device, models, ListSelector) {
        "use strict";

        return UIComponent.extend("acc.todolist.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // we instantiate the list selector
                this.oListSelector = new ListSelector();

                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            },

            /**
             * The component is destroyed by UI5 automatically.
             * In this method, the ListSelector and ErrorHandler are destroyed.
             * @public
             * @override
             */
            destroy: function () {
                this.oListSelector.destroy();
                // this._oErrorHandler.destroy();
                // call the base component's destroy function
                UIComponent.prototype.destroy.apply(this, arguments);
            }
        });
    }
);