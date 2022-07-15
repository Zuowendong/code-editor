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
 * 全局拖拽组名
 */
let GROUPNAME = "people";
const dragGroupStore = useDragGroupStore();
dragGroupStore.setdDragGroupName(GROUPNAME);

const componentStore = useComponentStore();
let idGlobal = 8;
const handleClone = ({ id }) => {
    return {
        id: idGlobal++,
        name: `cat ${id}`,
        top: 10,
        left: 10,
    };
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
