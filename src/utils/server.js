import createFormTemplate from "./createFormTemplate.js";

/**
 * 处理容器数据
 */
export const formCodeTemp = async (compData) => {
    let code = "";

    console.log(111, compData);
    // 获取容器布局
    const { row, column } = compData.props.layout.attrs;
    const ranks = {
        rNum: row.value,
        cNum: column.value,
    };

    let formItems = [];
    for (let i = 0; i < compData.children.length; i++) {
        if (i % 2) continue;
        const labelItem = compData.children[i];
        const valueItem = compData.children[i + 1];
        // console.log(labelItem);

        formItems.push({
            label: labelItem.name,
            prop: "name",
            tag: "el-input",
        });
    }

    const res = await createFormTemplate({
        ranks,
        formItems
    });
    console.log(222, res);

    return code;
};
