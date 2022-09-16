<script setup>
import { computed, onMounted, ref } from "vue";

import { useCompStore } from "../store/component";
import { formatCompProp, formatCompPropCatalog } from "../utils/formatComp";
import { indexedDBUtil } from "@zyf/utils";

const compStore = useCompStore();
let compAttrs = computed(() => compStore.currentComp.props);

const setMap = (key, val) => {
	return { [key]: val };
};

const updateCompProps = (newCompProp) => {
	Object.values(compAttrs.value).forEach((item) => {
		if (item.attrs && item.attrs[newCompProp.key]) {
			item.attrs[newCompProp.key] = newCompProp;
		}
	});
};

const previewHandle = () => {
	window.open("http://192.168.32.161:8080/", "_blank");
};


</script>

<template>
	<div class="rightMain">
		<div v-for="cataItem in formatCompPropCatalog(compAttrs)" :key="cataItem.id" class="catalogWrap">
			<p class="catalogTitle">{{ cataItem.name }}</p>
			<div class="propWrap" v-for="(val, key, i) of formatCompProp(cataItem.attrs)" :key="i">
				<div class="labelName">{{ val.name }}：</div>
				<component
					:is="val.type"
					:key="val.key"
					v-bind="{ ...setMap('modelVal', val) }"
					@updateCompProps="updateCompProps"
				></component>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.rightMain {
	.catalogWrap {
		margin-bottom: 10px;
		padding-bottom: 6px;
		border-bottom: 1px solid rgb(138, 136, 136);
	}
	.catalogTitle {
		color: #fff;
		height: 40px;
		display: flex;
		align-items: center;
		font-size: 16px;
		font-weight: bold;
		padding-left: 10px;
	}
	.propWrap {
		display: grid;
		grid-template-columns: 86px auto;
		column-gap: 16px;
		align-items: center;
		padding-right: 50px;
		margin-bottom: 10px;
		.labelName {
			color: #fff;
			text-align: right;
		}
	}
}
</style>
