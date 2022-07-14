<script setup>
import { reactive, ref } from "vue";
import draggable from "vuedraggable";

let drag = ref(false);

const myArray = ref([
    { name: "vue.draggable", id: 2 },
    { name: "draggable", id: 1 },
    { name: "component", id: 3 },
    { name: "for", id: 4 },
    { name: "vue.js 2.0", id: 5 },
    { name: "based", id: 6 },
    { name: "on", id: 7 },
    { name: "Sortablejs", id: 8 },
]);

const handleClone = () => {
    console.log(1212313);
};
</script>

<template>
    <div class="centerMain">
        <draggable
            v-model="myArray"
            group="people"
            item-key="id"
            :sort="false"
            @clone="handleClone"
        >
            <template #item="{ element }">
                <div class="item">{{ element.name }}</div>
            </template>
        </draggable>
    </div>
</template>

<style scoped>
.centerMain {
    background-color: #fff;
    overflow: hidden;
    position: relative;
}
.item {
    height: 100px;
    background: #ddd;
    margin: 10px 0;
}
</style>
