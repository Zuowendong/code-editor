// 处理传入的style对象
export const formatStyle = (style) => {
    // 几何属性，需要加单位px
    const sizeList = ["width", "height"];
    // 多余属性，需要剔除
    const reduceList = ["align"];

    const resStyle = {};
    if (style) {
        for (const key in style) {
            if (sizeList.includes(key)) {
                resStyle[key] = style[key] + "px";
            } else if (!reduceList.includes(key)) {
                resStyle[key] = style[key];
            }
        }
    }

    return resStyle;
};

// 处理传入的 属性对象
export const formatProps = (props) => {
    let resObj = {};
    Object.values(props).forEach((p) => {
        if (p.attrs) {
            Object.keys(p.attrs).forEach((attr) => {
                resObj[attr] = p.attrs[attr].value;
            });
        }
    });
    return formatStyle(resObj);
};
