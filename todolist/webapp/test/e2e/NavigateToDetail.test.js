const { wdi5 } = require("wdio-ui5-service")
const Master = require("./pageObjects/Master")
const Detail = require("./pageObjects/Detail")
const { verifyNavigation, pressItemToNavToDetail } = require("./utils/Helper")
const { MasterSelector } = require("./utils/MasterSelectors")
const { DetailSelector } = require("./utils/DetailSelectors")
let oMasterSelector;
let oDetailSelector;

describe("The Master to Detail interaction: ", () => {
    before(async () => {
        await Master.open()
        oMasterSelector = await MasterSelector(Master._viewName);
    })

    it("should be allowed to navigate to a detailed view", async () => {
        const aItems = await browser.allControls(oMasterSelector.oItemToNavigateSelector)
        await aItems[0].firePress()
        // WARNING: This will vary depending on how the data comes from the backend, 
        // maybe it could be replaced by an id but, in this case, for practicality 
        // reasons we only validate a static value
        const bNavigationOcurred = await verifyNavigation('Notes(guid');
        expect(bNavigationOcurred).toBeTruthy();
    })

})