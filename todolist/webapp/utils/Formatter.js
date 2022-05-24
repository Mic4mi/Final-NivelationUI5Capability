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
        }
    };
});