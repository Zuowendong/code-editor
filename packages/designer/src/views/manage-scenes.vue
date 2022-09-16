<template>
	<div class="sceneMain">
		<ZyfTable :fetch="tableData" :tableFilter="tableFilterList">
			<template #btn>
				<el-button type="primary" plain @click="createHandle">
					<el-icon><Plus /></el-icon>添加
				</el-button>
			</template>
			<el-table-column prop="xid" label="序号" width="60" />
			<el-table-column prop="name" label="场景名称" min-width="100" />
			<el-table-column prop="user" label="创建用户" width="120" />
			<el-table-column prop="createTime" label="创建时间" width="150" />
			<el-table-column prop="updateTime" label="更新时间" width="150" />
			<el-table-column label="操作" width="220">
				<template #default="{ row }">
					<el-button link type="primary" @click="viewHandle(row)">查看</el-button>
					<el-button link type="primary" @click="editHandle(row)">进入编辑器</el-button>
					<el-button link type="primary" @click="deleteHandle(row)">删除</el-button>
				</template>
			</el-table-column>
		</ZyfTable>

		<ManageScenesCreate v-model="isManageScenesCreate" />
	</div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { Plus } from "@element-plus/icons-vue";
import ManageScenesCreate from "./manage-scenes-create.vue";

const tableData = reactive([
	{ xid: 1, projectId: "1", name: "场景1", user: "Tom", createTime: "", updateTime: "" },
	{ xid: 2, projectId: "2", name: "场景测试", user: "Tom", createTime: "", updateTime: "" },
	{ xid: 3, projectId: "3", name: "场景3333333333", user: "Tom", createTime: "", updateTime: "" },
	{ xid: 4, projectId: "4", name: "场景4", user: "Tom", createTime: "", updateTime: "" },
	{ xid: 5, projectId: "5", name: "场景5", user: "Tom", createTime: "", updateTime: "" },
	{ xid: 6, projectId: "6", name: "场景1", user: "Tom", createTime: "", updateTime: "" },
	{ xid: 7, projectId: "7", name: "场景1", user: "Tom", createTime: "", updateTime: "" },
	{ xid: 8, projectId: "8", name: "场景1", user: "Tom", createTime: "", updateTime: "" },
	{ xid: 9, projectId: "9", name: "场景1", user: "Tom", createTime: "", updateTime: "" },
	{ xid: 10, projectId: "10", name: "场景1", user: "Tom", createTime: "", updateTime: "" },
	{ xid: 11, projectId: "11", name: "场景1", user: "Tom", createTime: "", updateTime: "" },
	{ xid: 12, projectId: "12", name: "场景1", user: "Tom", createTime: "", updateTime: "" },
	{ xid: 13, projectId: "13", name: "场景1", user: "Tom", createTime: "", updateTime: "" },
	{ xid: 14, projectId: "14", name: "场景1", user: "Tom", createTime: "", updateTime: "" },
]);

let tableFilterList = reactive([
	{ type: "input", label: "场景名称", field: "name", inputModel: "" },
	{ type: "input", label: "创建用户", field: "user", inputModel: "" },
]);

let isManageScenesCreate = ref(false);
const createHandle = () => {
	isManageScenesCreate.value = true;
};

const router = useRouter();
const editHandle = (rowData) => {
	router.push({
		name: "Designer",
		query: {
			projectId: rowData.projectId,
			name: rowData.name,
		},
	});
};

const viewHandle = () => {};
const deleteHandle = () => {};
</script>

<style lang="scss" scoped>
.sceneMain {
	padding: 0 10px;
}
</style>
