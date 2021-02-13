export function setTable (headers, excellist) {
    const tableTitleData = []; // Store table header data
    const tableMapTitle = {}; // Set table content for Chinese and English
    headers.forEach((_, i) => {
        tableMapTitle[_] = "prop" + i;
        tableTitleData.push({
            prop: "prop" + i,
            label: _,
            width: 100
        });
    });
    console.log("tableTitleData", tableTitleData);
    // Mapping table content attribute name is English
    const newTableData = [];
    excellist.forEach(_ => {
        const newObj = {};
        Object.keys(_).forEach(key => {
            newObj[tableMapTitle[key]] = _[key];
        });
        newTableData.push(newObj);
    });
    console.log('newTableData', newTableData);

    return {
        headers: tableTitleData,
        excellist : newTableData
    }
}
