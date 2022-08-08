<script>
export default { name: "XuiInputNumber" };
</script>
<script setup>
import { computed, ref, nextTick } from "vue";

let width = ref(0);
</script>

<template>
    <div class="xuiInputNumberMain">
        <div>宽度</div>
        <el-input-number v-model="width" :min="1" controls-position="right" />
    </div>
</template>

<style scoped></style>
