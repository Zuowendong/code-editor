import { defineStore } from "pinia";
import { ref } from "vue";

export const useComponentStore = defineStore("component", () => {
    let currentComponent = ref({});
    const setCurrentComponent = (component) => {
        currentComponent.value = component;
    };

    let canvasComponents = ref([]);
    const addCanvasComponent = (data) => {
        canvasComponents.value.push(data);
    };

    return {
        currentComponent,
        setCurrentComponent,
        canvasComponents,
        addCanvasComponent,
    };
});
