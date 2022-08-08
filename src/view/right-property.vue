<script setup>
import { computed, onMounted, ref } from "vue";
import { useCompStore } from "../store/modules/component";
import { formatCompProp } from "../utils/formatComp";

const compStore = useCompStore();
let compAttrs = computed(() => compStore.currentComp.props);

const setMap = (key, val) => {
    // console.log("454545", { [key]: val });
    return { [key]: val };
};
</script>

<template>
    <div class="rightMain">
        <p class="title">property</p>
        {{ formatCompProp(compAttrs) }}

        <div v-for="(val, key, i) of formatCompProp(compAttrs)" :key="i">
            <!-- {{ key }} -- {{ val }} -->

            <component
                :is="val.type"
                :key="val.key"
                v-bind="{ ...setMap(val.key, val.value) }"
            ></component>
        </div>
        <!-- <component :is="configCompName" :key="currentCompId"></component> -->
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
</style>
