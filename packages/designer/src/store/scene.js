import { defineStore } from "pinia";
import { reactive } from "vue";

export const useSceneStore = defineStore("useSceneStore", () => {
	let scenesMap = reactive({});

	/**
	 * 添加场景
	 * @param {场景} scene
	 */
	const addScene = (scene) => {
		scenesMap[scene.id] = scene;
	};

	return {
		scenesMap,
		addScene,
	};
});
