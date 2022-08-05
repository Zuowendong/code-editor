import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { compTemplateData } from "../../utils/compTemplateData";

export const useCompStore = defineStore("comp", () => {
    let compsList = reactive([]);

    const addComp = (compData) => {
        compsList.push(compTemplateData(compData));
    };

    const updateComp = (compData) => {
        const targetComp = compsList.find(
            (item) => item.uuid === compData.uuid
        );
        targetComp.props = { ...compData.props };
        console.log(111, compsList);
    };

    return {
        compsList,
        addComp,
        updateComp,
    };
});
