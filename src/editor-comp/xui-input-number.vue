<script>
export default { name: "XuiInputNumber" };
</script>
<script setup>
import { computed, ref, toRefs } from "vue";

const props = defineProps({
    val: {
        type: Object,
        default: () => {
            return {};
        },
    },
});

let { val } = toRefs(props);
const emit = defineEmits(["updateCompProps"]);

const handleChange = (val) => {
    console.log(123123, val);
    emit("updateCompProps", val);
};

let num = ref(val.value.value);
</script>

<template>
    <div class="xuiInputNumberMain">
        {{val}}
        <el-input-number
            class="inputNumber"
            v-model="num"
            :min="1"
            @change="handleChange"
        />
    </div>
</template>

<style scoped>
.inputNumber {
    width: 100%;
}
</style>
