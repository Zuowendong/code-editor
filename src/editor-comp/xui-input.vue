<script>
export default { name: "XuiInput" };
</script>
<script setup>
import { computed, ref, toRefs } from "vue";

const props = defineProps({
    value: { type: Number, default: 0 },
});

let { value } = toRefs(props);
</script>

<template>
    <div class="xuiInputMain">
        <el-input v-model="value" />
    </div>
</template>

<style scoped></style>
