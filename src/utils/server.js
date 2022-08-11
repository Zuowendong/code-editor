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

    const temp1 = '<el-form-item label="形象进度：" prop="graphicProgress">';
    const temp2 = "</el-form-item>";

    const res = await createFormTemplate({
        ranks,
        temp1,
        temp2,
        formItems: [
            { label: "姓名", prop: "name", tag: "el-input" },
            { label: "年龄", prop: "age", tag: "el-input-number" },
        ],
    });
    console.log(222, res);

    return code;
};
