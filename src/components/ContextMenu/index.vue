<script>
export default { name: "contextMenu" };
</script>
<script setup>
import { reactive, ref, toRefs, watch } from "vue";

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    position: {
        type: Object,
        default: () => {
            return {
                left: "",
                top: "",
            };
        },
    },
});
let { modelValue, position } = toRefs(props);
// const emits = defineEmits(["update:modelValue"]);

/**
 * 菜单显隐
 */
let menuDisplay = ref("none");
watch(
    () => props.modelValue,
    (val) => (menuDisplay.value = val ? "block" : "none")
);

/**
 * 菜单位置
 */
let left = ref("");
let top = ref("");
watch(
    () => props.position,
    (val) => {
        left.value = val.left;
        top.value = val.top;
    },
    { deep: true }
);

const menus = reactive([{ id: 1, name: "删除组件" }]);
</script>

<template>
    <div class="menuMain">
        <div class="menuItem" v-for="item in menus" :key="item.id">
            {{ item.name }}
        </div>
    </div>
</template>

<style scoped>
.menuMain {
    display: v-bind(menuDisplay);
    left: v-bind(left);
    top: v-bind(top);
    position: absolute;
    width: 100px;
    padding: 10px 0;
    background-color: #fff;
    box-shadow: rgb(0 0 0 / 40%) 0px 1px 4px 0px;
    border: 1px solid #ccc;
    border-radius: 5px;
    user-select: none;
}
.menuItem {
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    padding: 0 10px;
    letter-spacing: 1px;
}
.menuItem:hover {
    background-color: #eee;
}
</style>
