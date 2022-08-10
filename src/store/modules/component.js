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

    const updateCompProps = (compData) => {
        const targetComp = compsList.find(
            (item) => item.uuid === compData.uuid
        );
        currentComp.value.props = { ...targetComp.props };
    };

    const updateCompChildren = (pId, childComp) => {
        const parentComp = compsList.find((item) => item.uuid === pId);
        parentComp.children.push(childComp);
    };

    const setCurrComp = (comp) => {
        currentComp.value = comp;
    };

    return {
        compsList,
        currentComp,
        addComp,
        updateCompProps,
        setCurrComp,
        updateCompChildren,
    };
});
