<script setup>
import { computed, onMounted, ref } from "vue";
import { useCompStore } from "../store/modules/component";

const compStore = useCompStore();
// let configCompName = computed(() => compStore.currentComp.type + "Config");
// const currentCompId = computed(() => compStore.currentComp.uuid);

</script>

<template>
    <div class="rightMain">
        <p class="title">property</p>
        <component :is="configCompName" :key="currentCompId"></component>
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
