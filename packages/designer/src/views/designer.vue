<script setup>
import { useRoute } from "vue-router";

import DesignerHeader from "./designer-header.vue";
import CompsMenu from "./comps-menu.vue";
import CenterCanvas from "./center-canvas.vue";
import RightProperty from "./right-property.vue";

const route = useRoute();
</script>

<template>
	<div class="main">
		<div class="header">
			<DesignerHeader :title="route.query.name" />
		</div>
		<div class="menu"><CompsMenu /></div>
		<div class="canvas"><CenterCanvas /></div>
		<div class="property"><RightProperty /></div>
	</div>
</template>

<style scoped lang="scss">
.main {
	height: 100%;
	display: grid;
	grid-template-columns: 200px auto 300px;
	grid-template-rows: 50px auto;
	background-color: #1d2531;
	.header {
		grid-column-start: 1;
		grid-column-end: 4;
		color: #fff;
	}
}
</style>
