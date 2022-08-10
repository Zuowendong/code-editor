import createFormTemplate from "./createFormTemplate.js";

/**
 * 处理容器数据
 * @param {*} compData
 * @returns
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

    const res = await createFormTemplate({
        ranks,
    });
    console.log(222, res);

    return code;
};
