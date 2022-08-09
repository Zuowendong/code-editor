<script>
export default { name: "XuiInputNumber" };
</script>
<script setup>
import { computed, ref, toRefs } from "vue";

const props = defineProps({
    value: { type: Number, default: 0 },
});

let { value } = toRefs(props);
</script>

<template>
    <div class="xuiInputNumberMain">
        <el-input-number v-model="value" :min="1" controls-position="right" />
    </div>
</template>

<style scoped></style>
