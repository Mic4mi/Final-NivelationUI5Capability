const { wdi5 } = require("wdio-ui5-service")
const Master = require("./pageObjects/Master")
const { getLastUncompletedCheckbox } = require("./utils/Helper")
const { MasterSelector } = require("./utils/MasterSelectors")

let oMasterSelector;
describe("The master page: ", async () => {
    before(async () => {
        oMasterSelector = await MasterSelector(Master._viewName);
    })

    it("should allow the status of a task to be modified", async () => {
        // We bring all checkboxes
        const aCheckBoxes = await browser.allControls(oMasterSelector.oCheckBoxSelector);
        // We choose the first one that has not been completed yet
        const oCheckBox = await getLastUncompletedCheckbox(aCheckBoxes);
        // We change its status
        await oCheckBox.item.setSelected(true);
        await oCheckBox.item.fireSelect();
        // We check if the item status has been changed
        let oCompletdCheckBox;
        for (let i = 0; i < aCheckBoxes.length; i++) {
            const oCurrentCheckbox = aCheckBoxes[i];
            if (oCurrentCheckbox._domId === oCheckBox.domId) {
                oCompletdCheckBox = oCurrentCheckbox;
                break;
            }
        }

        const bIsCompleted = await oCompletdCheckBox.getSelected();
        expect(bIsCompleted).toBeTruthy();
    })

})
