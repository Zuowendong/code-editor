import { defineStore } from "pinia";
import { ref } from "vue";

export const useDragGroupStore = defineStore("dragGroup", () => {
    let dragGroupName = ref("");
    const setdDragGroupName = (name) => {
        dragGroupName.value = name;
    };

    return {
        dragGroupName,
        setdDragGroupName,
    };
});
