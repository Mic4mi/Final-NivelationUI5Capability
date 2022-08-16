export const getListItemTitleTexts = async (aListItems) => {
    let aTexts = [];
    for (const item of aListItems) {
        const oItemContent = await item.getAggregation("content");
        const aItemContentItems = await oItemContent[0].getAggregation("items");
        const aContentItems = await aItemContentItems[1].getAggregation("items");
        const aContentItemsContent = await aContentItems[0].getAggregation("items");
        const sItemText = await aContentItemsContent[0].getProperty("text");
        aTexts.push(sItemText)

        if (aTexts.length >= 3) {
            break;
        }
    }
    return aTexts;
}

export const getSortDirection = async (arr) => {
    const c = [];
    for (let i = 1; i < arr.length; i++) {
        c.push(arr[i - 1].localeCompare(arr[i]));
    }

    if (c.every((n) => n <= 0)) return 'ascending';
    if (c.every((n) => n >= 0)) return 'descending';

    return 'unsorted';
}

export const getLastUncompletedCheckbox = async (arrOfCheckBoxes) => {
    // must return an object containing: the item, its status and its domId
    let bState, oItem, sItemDomId;
    for (let index = arrOfCheckBoxes.length - 1; index >= 0; index--) {
        oItem = arrOfCheckBoxes[index];
        bState = await oItem.getSelected();
        sItemDomId = oItem._domId;
        if (!bState) { break }
    }

    return {
        item: oItem,
        status: bState,
        domId: sItemDomId
    }
}

export const verifyNavigation = async (sMustIncludes) => {
    const sUrl = await browser.getUrl()
    return sUrl.includes(sMustIncludes);
}

export const pressItemToNavToDetail = async (aItems) => {
    // const aItems = await browser.allControls(oMasterSelector.oItemToNavigateSelector);
    const oListItem = aItems[0];
    await oListItem.firePress()
}