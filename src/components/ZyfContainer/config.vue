<script>
export default { name: "ZyfContainerConfig" };
</script>

<script setup>
import { ref, toRefs, watch } from "vue";

const props = defineProps({
    itemProps: {
        type: Object,
        default: () => {
            return {};
        },
    },
});

let { itemProps } = toRefs(props);
</script>

<template>
    <div class="containerConfigMain">
        <xui-base />
    </div>
</template>

<style scoped>
.containerMain {
    width: 150px;
    height: 50px;
    border: 1px solid #333;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
}
</style>
