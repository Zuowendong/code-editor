<script>
export default { name: "XuiBase" };
</script>
<script setup>
import { computed, ref } from "vue";
import { useCompStore } from "../store/modules/component";

const compStore = useCompStore();
</script>

<template>
    <div class="xuiBaseMain">
        <el-form :model="compStore.currentComp" label-width="80px">
            <el-form-item label="宽度">
                <el-input-number
                    class="formItemVal"
                    v-model="compStore.currentComp.props.width"
                    :min="1"
                    controls-position="right"
                />
            </el-form-item>
            <el-form-item label="高度">
                <el-input-number
                    class="formItemVal"
                    v-model="compStore.currentComp.props.height"
                    :min="1"
                    controls-position="right"
                />
            </el-form-item>
            <el-form-item label="位置">
                <div class="formTwoItem">
                    <el-input-number
                        class="formItemVal"
                        v-model="compStore.currentComp.props.left"
                        :min="1"
                        controls-position="right"
                    />
                    <el-input-number
                        class="formItemVal"
                        v-model="compStore.currentComp.props.top"
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
