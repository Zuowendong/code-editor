// 组件数据标准model
export const compTemplateData = ({ name, type }) => {
    return {
        uuid: `${type}_${Date.now()}`,
        name,
        type,
        props: {},
    };
};
