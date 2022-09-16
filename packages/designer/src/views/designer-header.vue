<template>
	<div class="headerMain">
		<div></div>
		<div class="title">{{ sceneInfo.name }} -- {{ sceneInfo.projectId }}</div>
		<div class="opBtnWrap">
			<el-button type="primary" plain @click="resetBackHandle">返回</el-button>
			<el-button type="primary" @click="saveHandle">保存</el-button>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { Plus } from "@element-plus/icons-vue";
import { indexedDBUtil } from "@zyf/utils";
import { cloneDeep } from "lodash-es";

import { useCompStore } from "../store/component";
import { useSceneStore } from "../store/scene";
import { indexedDBConfig } from "../config/indexedDB";

const props = defineProps({
	sceneInfo: {
		type: Object,
		default: () => {
			return {};
		},
	},
});
let { sceneInfo } = toRefs(props);

const router = useRouter();
const resetBackHandle = () => {
	router.push({
		name: "Home",
	});
};

const compStore = useCompStore();
const sceneStore = useSceneStore();
const saveHandle = () => {
	const sceneData = {
		id: sceneInfo.value.projectId,
		name: sceneInfo.value.name,
		details: cloneDeep(compStore.compsList),
	};
	storeIndexedDB(sceneData);
	sceneStore.addScene(sceneData);
};

/**
 * 存入indexedDB
 */
const storeIndexedDB = async (sceneData) => {
	const { dbName, storeName, version } = indexedDBConfig;
	const db = await indexedDBUtil.openDB(dbName, storeName, version);
	const storeKey = await indexedDBUtil.getDataByKey(db, storeName, sceneInfo.value.projectId);
	if (storeKey) {
		await indexedDBUtil.updateDB(db, storeName, sceneData);
	} else {
		await indexedDBUtil.addData(db, storeName, sceneData);
	}
};
</script>

<style lang="scss" scoped>
.headerMain {
	height: 100%;
	display: grid;
	grid-template-columns: 1fr 3fr 1fr;
	.title {
		font-size: 16px;
		font-weight: bold;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.opBtnWrap {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-right: 10px;
	}
}
</style>
