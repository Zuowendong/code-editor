import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useCompStore = defineStore("useCompStore", () => {
    let compsList = reactive([]);
    let currentComp = ref({
        uuid: "",
        name: "",
        type: "",
        props: {},
    });

    const addComp = (compData) => {
        compsList.push(compData);
    };

    const updateComp = (compData) => {
        const targetComp = compsList.find(
            (item) => item.uuid === compData.uuid
        );
        currentComp.value.props = { ...targetComp.props };
    };

    const setCurrComp = (comp) => {
        currentComp.value = comp;
    };

    return {
        compsList,
        currentComp,
        addComp,
        updateComp,
        setCurrComp,
    };
});
