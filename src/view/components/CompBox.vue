<script setup>
import { ref, computed, toRefs } from "vue";

const props = defineProps({
    item: {
        type: Object,
        required: true,
        default: () => {
            return {};
        },
    },
});

// 锚点
const pointList = ref(["t", "r", "b", "l", "lt", "rt", "lb", "rb"]);
// 光标朝向
const cursorResize = ref(["n", "e", "s", "w", "nw", "ne", "sw", "se"]);

/**
 * 计算锚点的位置
 */
const usePointStyle = (pointItem, index, props) => {
    // const { width = 150, height = 50 } = props;
    let width = 550;
    let height = 250;

    const isTop = /t/.test(pointItem);
    const isBottom = /b/.test(pointItem);
    const isLeft = /l/.test(pointItem);
    const isRight = /r/.test(pointItem);

    let newLeft = 0;
    let newTop = 0;

    // 四个角的点
    if (pointItem.length === 2) {
        newLeft = isLeft ? 0 : width;
        newTop = isTop ? 0 : height;
    } else {
        // 上下两点的点，宽度居中
        if (isTop || isBottom) {
            newLeft = width / 2;
            newTop = isTop ? 0 : height;
        }

        // 左右两边的点，高度居中
        if (isLeft || isRight) {
            newLeft = isLeft ? 0 : width;
            newTop = Math.floor(height / 2);
        }
    }

    const style = {
        left: `${newLeft}px`,
        top: `${newTop}px`,
        cursor: cursorResize.value[index] + "-resize",
    };

    return style;
};

/**
 * 锚点移动事件
 */

const handleMousedown = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
}
</script>

<template>
    <div class="compBoxMain">
        <slot></slot>
        <!-- 锚点 -->
        <!-- <div
            v-for="(pointItem, index) in pointList"
            :key="index"
            :class="`shapePoint ${pointItem}`"
            :style="usePointStyle(pointItem, index, item.props)"
            @mousedown="handleMousedown($event, compItem)"
        ></div> -->
    </div>
</template>

<style scoped>
.compBoxMain {
    position: absolute;
    cursor: move;
}
.shapePoint {
    z-index: 1;
    position: absolute;
    width: 4px;
    height: 4px;
    border: 2px solid #333;
    border-radius: 50%;
    background-color: #fff;
    transform: translate(-40%, -30%);
}
.t {
    transform: translate(-50%, -50%);
}
.b {
    transform: translate(-50%, -30%);
}
.r {
    transform: translate(-20%, -50%);
}
.l {
    transform: translate(-45%, -50%);
}
.rt,
.rb {
    transform: translate(-30%, -30%);
}
</style>
