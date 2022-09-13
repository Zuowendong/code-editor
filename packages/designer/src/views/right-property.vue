<script setup>
import { computed, onMounted, ref } from "vue";

import { useCompStore } from "../store/component";
import { formatCompProp, formatCompPropCatalog } from "../utils/formatComp";

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
</script>

<template>
	<div class="rightMain">
		<p class="title">
			<span class="titleText">property</span>
		</p>
		<div v-for="cataItem in formatCompPropCatalog(compAttrs)" :key="cataItem.id" class="catalogWrap">
			<p class="catalogTitle">{{ cataItem.name }}</p>
			<div class="propWrap" v-for="(val, key, i) of formatCompProp(cataItem.attrs)" :key="i">
				<span class="label">{{ val.name }}：</span>
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

<style scoped>
.rightMain {
	background-color: #fff;
}
.title {
	margin: 10px 0;
	padding-bottom: 6px;
	border-bottom: 1px solid #ddd;
}
.catalogWrap {
	margin-bottom: 10px;
	padding-bottom: 6px;
	border-bottom: 1px solid rgb(226, 223, 223);
}
.catalogTitle {
	height: 40px;
	display: flex;
	align-items: center;
	font-size: 16px;
	font-weight: bold;
	padding-left: 6px;
}
.propWrap {
	display: grid;
	grid-template-columns: 100px auto;
	column-gap: 16px;
	align-items: center;
	padding-right: 50px;
	margin-bottom: 10px;
}
.label {
	text-align: right;
}
.titleText {
	margin-right: 20px;
}
</style>
