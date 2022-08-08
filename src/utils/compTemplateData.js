// 组件数据标准model
export const compTemplateData = ({ name, type, props }) => {
    return {
        uuid: `${type}_${Date.now()}`,
        name,
        type,
        props,
    };
};
