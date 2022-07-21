<script>
export default { name: "Container" };
</script>
<script setup>
import { reactive, ref, toRefs, watch } from "vue";

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
});
let { modelValue } = toRefs(props);
</script>

<template>
    <div class="container">123123</div>
</template>

<style scoped></style>
