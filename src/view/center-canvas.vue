<script setup>
import { reactive, ref } from "vue";
import draggable from "vuedraggable";
import VueDragResize from "vue-drag-resize";
import { useComponentStore } from "../store/modules/component";
import { useDragGroupStore } from "../store/modules/dragGroup";

let components = reactive([
    // { id: 1, name: "表单容器", top: 100, left: 160 },
    // { id: 2, name: "输入框", top: 300, left: 260 },
    // { id: 3, name: "下拉框", top: 500, left: 60 },
    // { id: 4, name: "单选按钮组", top: 600, left: 560 },
    // { id: 5, name: "复选按钮组", top: 800, left: 460 },
]);

const dragGroupStore = useDragGroupStore();
let GROUPNAME = dragGroupStore.dragGroupName;
</script>

<template>
    <div class="centerMain">
        {{components}}
        <draggable
            :list="components"
            :group="{ name: GROUPNAME }"
            tag="transition-group"
            :item-key="id"
        >
            <template #item="{ element }">
                <vue-drag-resize
                    class="component-warp"
                    :w="200"
                    :h="40"
                    :x="element.top"
                    :y="element.left"
                >
                    <input class="input" type="text" :value="element.name" />
                </vue-drag-resize>
            </template>
        </draggable>
    </div>
</template>

<style scoped>
.centerMain {
    position: relative;
    background-color: #fff;
    overflow: hidden;
    background-image: linear-gradient(
            90deg,
            rgba(73, 69, 69, 0.2) 1%,
            rgba(0, 0, 0, 0) 5%
        ),
        linear-gradient(rgba(73, 69, 69, 0.2) 1%, rgba(0, 0, 0, 0) 5%);
    background-size: 28px 28px;
}
.component-warp {
    border: 1px solid #333;
}
.input {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
}
</style>
