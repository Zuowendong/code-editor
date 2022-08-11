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

    /**
     * 添加组件
     * @param {组件数据} compData
     */
    const addComp = (compData) => {
        compsList.push(compData);
    };

    /**
     * 更新组件属性
     * @param {需要更新的组件数据} compData
     */
    const updateCompProps = (compData) => {
        const targetComp = compsList.find(
            (item) => item.uuid === compData.uuid
        );
        currentComp.value.props = { ...targetComp.props };
    };

    /**
     * 更新容器组件内子组件
     * @param {父级容器组件id} pId
     * @param {子组件数据} childComp
     */
    const updateCompChildren = (pId, childComp) => {
        const parentComp = compsList.find((item) => item.uuid === pId);
        parentComp.children.push(childComp);
    };

    /**
     * 设置当前选中组件
     * @param {组件数据} comp
     */
    const setCurrComp = (comp) => {
        currentComp.value = comp;
    };

    /**
     * 通过id递归查找组件设置当前组件
     * @param {组件id} id
     * @param {组件列表} list
     */
    const findComp = (id, list) => {
        if (list && list.length) {
            for (let i = 0; i < list.length; i++) {
                const item = list[i];
                if (item.uuid === id) {
                    setCurrComp(item);
                }
                findComp(id, item.children);
            }
        }
    };

    /**
     * 通过id设置当前组件
     * @param {组件id} id
     */
    const setCurrCompById = (id) => {
        findComp(id, compsList);
    };

    /**
     * 删除组件
     * @param {组件id} id
     * @param {组件列表} list
     */
    const deleteComp = (id, list) => {
        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            if (item.uuid === id) list.splice(i, 1);
            if (item.children && item.children.length) {
                deleteComp(id, item.children);
            }
        }
    };

    return {
        compsList,
        currentComp,
        addComp,
        updateCompProps,
        setCurrComp,
        updateCompChildren,
        setCurrCompById,
        deleteComp,
    };
});
