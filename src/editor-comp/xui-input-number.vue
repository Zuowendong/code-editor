<script>
export default { name: "XuiInputNumber" };
</script>
<script setup>
import { computed, ref, toRefs } from "vue";

const props = defineProps({
    name: { type: String, default: "" },
    value: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
});

let { name, value } = toRefs(props);

let width = ref(0);
</script>

<template>
    <div class="xuiInputNumberMain">
        <div>{{ name }}</div>
        <el-input-number v-model="width" :min="1" controls-position="right" />
    </div>
</template>

<style scoped></style>
