<script setup>
import VueDragResize from "vue-drag-resize";
import { reactive, ref } from "vue";

let parentLimitation = ref(true); //true不能超过父组件 fallse可以超过父组件
let aspectRatio = ref(false); //false不限制宽高比例 true限制宽高比例等比缩放
let width = ref(100);
let height = ref(100);
let top = ref(0);
let left = ref(0);

const resize = (newRect) => {
    console.log(newRect);
    width.value = newRect.width;
    height.value = newRect.height;
    top.value = newRect.top;
    left.value = newRect.left;
};

const dataList = reactive([
    {
        id: 1,
        name: "组件1",
        x: 100,
        y: 100,
        children: [
            {
                id: 11,
            },
        ],
    },
]);
</script>

<template>
    <div class="centerMain">
        <!-- <vue-drag-resize
            class="dragCanvas"
            :x="left"
            :y="top"
            :parentLimitation="true"
            :aspectRatio="false"
            v-on:resizing="resize"
            v-on:dragging="resize"
        >
            <div style="width: 100%; height: 100%; border: 1px solid red">
                <p>{{ top }} х {{ left }}</p>
                <p>{{ width }} х {{ height }}</p>
                <div>1231231</div>
            </div>
        </vue-drag-resize> -->
        <vue-drag-resize
            class="dragCanvas"
            :w="500"
            :h="500"
            :x="100"
            :y="200"
            :parentLimitation="true"
            :aspectRatio="false"
        >
            <div
                style="
                    width: 100%;
                    height: 100%;
                    border: 1px solid red;
                    position: relative;
                    top: 0;
                    left: 0;
                "
            >
                123123123
            </div>
        </vue-drag-resize>
    </div>
</template>

<style scoped>
.centerMain {
    background-color: #fff;
    overflow: hidden;
    position: relative;
    top: 0;
    left: 0;
}
.dragCanvas {
    position: absolute;
    top: 0;
    left: 0;
}
</style>
