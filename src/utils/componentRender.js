import containerRender from "./containerRender.jsx";
class ComponentRender {
    constructor() {
        this.id = ""; // 组件id
        this.type = "";
    }

    /**
     * 生成组件数据
     */
    renderData(id, name, type) {
        this.id = id + Math.round(Math.random() * 1000);
        this.type = type;
        return {
            width: 300,
            height: 100,
            top: 0,
            left: 0,
            type,
            name,
            resize: function (newRect) {
                this.width = newRect.width;
                this.height = newRect.height;
                this.top = newRect.top;
                this.left = newRect.left;
            },
        };
    }

    /**
     * 生成组件dom
     */
    renderDom() {
        return containerRender();
    }
}

export default new ComponentRender();
