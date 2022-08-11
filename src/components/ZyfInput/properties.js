export const properties = [
    {
        name: "基本配置",
        id: "base",
        attrs: [
            {
                name: "宽度",
                key: "width",
                type: "xui-input-number",
                value: 100,
            },
            {
                name: "高度",
                key: "height",
                type: "xui-input-number",
                value: 30,
            },
        ],
    },
    {
        name: "输入框配置",
        id: "inputSetting",
        attrs: [
            {
                name: "值",
                key: "value",
                type: "xui-input",
                value: "",
            },
            {
                name: "提示",
                key: "placeholder",
                type: "xui-input",
                value: "请输入",
            },
        ],
    },
];
