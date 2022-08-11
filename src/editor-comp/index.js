export { default as XuiBase } from "./xui-base.vue";
export { default as XuiInputNumber } from "./xui-input-number.vue";
export { default as XuiInput } from "./xui-input.vue";

export const getCompPorps = async (targetData) => {
    const { type } = targetData;
    if (type) {
        const compProps = await import(
            "../components/" + type + "/properties.js"
        );
        return compProps;
    }
};

