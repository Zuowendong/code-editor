export const properties = [
    {
        name: "基本配置",
        id: "base",
        attrs: [
            {
                name: "宽度",
                key: "width",
                type: "xui-input-number",
                value: 500,
            },
            {
                name: "高度",
                key: "height",
                type: "xui-input-number",
                value: 300,
            },
        ],
    },
    {
        name: "布局配置",
        id: "layout",
        attrs: [
            {
                name: "行",
                key: "row",
                type: "xui-input-number",
                value: 2,
            },
            {
                name: "列",
                key: "column",
                type: "xui-input-number",
                value: 2,
            },
            {
                name: "文本内容",
                key: "text",
                type: "xui-input",
                value: "测试容器文本",
            },
        ],
    },
];
