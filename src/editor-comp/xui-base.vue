<script>
export default { name: "XuiBase" };
</script>
<script setup>
import { computed, ref, nextTick } from "vue";
import { useCompStore } from "../store/modules/component";

const compStore = useCompStore();
const style = compStore.currentComp.props;
let formData = ref({
    width: style.width || 0,
    height: style.height || 0,
    left: style.left || 0,
    top: style.top || 0,
});

nextTick(() => {
    // 赋值组件默认宽高
    const uuid = compStore.currentComp.uuid;
    const componentDom = document.getElementsByClassName(uuid)[0];
    // const rawWidth = componentDom.style.width;
    // const rawHeight = componentDom.style.height;
    // console.log(111111, rawWidth, rawWidth);
});
</script>

<template>
    <div class="xuiBaseMain">
        <el-form :model="compStore.currentComp" label-width="80px">
            <el-form-item label="宽度">
                <el-input-number
                    class="formItemVal"
                    v-model="formData.width"
                    :min="1"
                    controls-position="right"
                />
            </el-form-item>
            <el-form-item label="高度">
                <el-input-number
                    class="formItemVal"
                    v-model="formData.height"
                    :min="1"
                    controls-position="right"
                />
            </el-form-item>
            <el-form-item label="位置">
                <div class="formTwoItem">
                    <el-input-number
                        class="formItemVal"
                        v-model="formData.left"
                        :min="1"
                        controls-position="right"
                    />
                    <el-input-number
                        class="formItemVal"
                        v-model="formData.top"
                        :min="1"
                        controls-position="right"
                    />
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
.xuiBaseMain {
    padding: 10px;
}
.formItemVal {
    width: 100%;
}
.formTwoItem {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 10px;
}
</style>
