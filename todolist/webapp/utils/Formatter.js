sap.ui.define([], function () {
    "use strict";
    return {
        formatDate: function (oDate) {
            let sDate;
            if (oDate) {
                sDate = `${oDate.getUTCDate()}/${(oDate.getUTCMonth() + 1)}/${oDate.getUTCFullYear()}`;
            } else {
                sDate = "";
            }
            return sDate;
        },

        formatTypeText: function (iType) {
            return "";
        },

        formatTypeIcon: function (iType) {
            let sIcon;
            switch (iType) {
                case 1:
                    sIcon = "sap-icon://circle-task";
                    break;
                case 2:
                    sIcon = "sap-icon://lateness";
                    break;
                case 3:
                    sIcon = "sap-icon://status-critical";
                    break;
                default:
                    sIcon = "";
                    break;
            }
            return sIcon;
        },

        formatTypeState: function (iType) {
            let sState;
            switch (iType) {
                case 1:
                    sState = "Indication06";
                    break;
                case 2:
                    sState = "Warning";
                    break;
                case 3:
                    sState = "Error";
                    break;
                default:
                    sState = "None";
                    break;
            }
            return sState;
        }
    };
});