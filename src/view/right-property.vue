<script setup>
import { computed, onMounted, ref } from "vue";
import { useCompStore } from "../store/modules/component";
import { formatCompProp } from "../utils/formatComp";

const compStore = useCompStore();
let compAttrs = computed(() => compStore.currentComp.props);

const setMap = (key, val) => {
    return { [key]: val };
};

const updateCompProps = (val) => {
    console.log(22222222, val);
};
</script>

<template>
    <div class="rightMain">
        <p class="title">property</p>
        <div
            class="propWrap"
            v-for="(val, key, i) of formatCompProp(compAttrs)"
            :key="i"
        >
            <span class="label">{{ val.name }}：</span>
            <component
                :is="val.type"
                :key="val.key"
                v-bind="{ ...setMap('val', val) }"
                @updateCompProps="() => updateCompProps(event, val)"
            ></component>
        </div>
    </div>
</template>

<style scoped>
.rightMain {
    background-color: #fff;
}
.title {
    margin: 10px 0;
    padding-bottom: 6px;
    border-bottom: 1px solid #ddd;
}
.propWrap {
    height: 40px;
    display: grid;
    grid-template-columns: 100px auto;
    column-gap: 16px;
    align-items: center;
    padding-right: 50px;
}
.label {
    text-align: right;
}
</style>
