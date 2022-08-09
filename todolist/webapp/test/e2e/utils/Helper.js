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

export const checkAscendingOrder = async (arr) => {
    if (arr[0][0] <= arr[1][0] && arr[1][0] <= arr[2][0]) {
        return true;
    }
    return false;
}