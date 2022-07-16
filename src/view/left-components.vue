<script setup>
import { ref, reactive } from "vue";
import draggable from "vuedraggable";
import { useComponentStore } from "../store/modules/component";
import { useDragGroupStore } from "../store/modules/dragGroup";

let components = reactive([
    { id: 1, name: "表单容器" },
    { id: 2, name: "输入框" },
    { id: 3, name: "下拉框" },
    { id: 4, name: "单选按钮组" },
    { id: 5, name: "复选按钮组" },
]);

/**
 * 全局拖拽group name
 */
let GROUPNAME = "people";
const dragGroupStore = useDragGroupStore();
dragGroupStore.setdDragGroupName(GROUPNAME);

const componentStore = useComponentStore();

/**
 * 拖拽结束事件
 */
let endLeft = ref("");
let endTop = ref("");
const handleEnd = (event) => {
    endLeft.value = event.originalEvent.clientX - 204; // // 左侧栏宽度200， gap:4
    endTop.value = event.originalEvent.clientY;

    console.log("位置：", endLeft.value, "*", endTop.value);
};

let idGlobal = 8;


const handleClone = ({ id }) => {
    let componentModule = {
        width: 500,
        height: 500,
        top: 0,
        left: 0,
        resize: function (newRect) {
            console.log(newRect, this);
            this.width = newRect.width;
            this.height = newRect.height;
            this.top = newRect.top;
            this.left = newRect.left;
        },
    };
    return componentModule;
};
</script>

<template>
    <div class="leftMain">
        <p class="title">components</p>

        <draggable
            :list="components"
            :group="{ name: GROUPNAME, pull: 'clone', put: false }"
            item-key="id"
            :sort="false"
            :clone="handleClone"
            @end="handleEnd"
        >
            <template #item="{ element }">
                <div class="component-warp">{{ element.name }}</div>
            </template>
        </draggable>
    </div>
</template>

<style scoped>
.leftMain {
    background-color: #fff;
    padding-left: 10px;
    box-sizing: border-box;
}
.title {
    margin: 10px 0;
    padding-bottom: 6px;
    border-bottom: 1px solid #ddd;
}
.component-warp {
    width: 100px;
    height: 50px;
    border: 1px solid #333;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-bottom: 10px;
    user-select: none;
}

.test {
    display: flex;
}
</style>
