import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { compTemplateData } from "../../utils/compTemplateData";

export const useCompStore = defineStore("comp", () => {
    let compsList = reactive([]);

    const addComp = (compData) => {
        compsList.push(
            compTemplateData({
                name: compData.name,
                type: compData.type,
            })
        );
    };

    return {
        compsList,
        addComp,
    };
});
