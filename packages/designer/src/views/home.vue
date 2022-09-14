<script setup>
import Menu from "./menu.vue";
import HomeHeader from "./home-header.vue";
</script>

<template>
	<div class="main">
		<div class="header"><HomeHeader /></div>
		<div class="menu"><Menu /></div>
		<div class="container">
			<router-view />
		</div>
	</div>
</template>

<style scoped lang="scss">
.main {
	height: 100%;
	display: grid;
	grid-template-columns: 200px auto;
	grid-template-rows: 50px auto;
	.header {
		grid-column-start: 1;
		grid-column-end: 3;
		border-bottom: 1px solid #ccc;
		box-sizing: border-box;
	}
	.menu {
		border-right: 1px solid #ccc;
		box-sizing: border-box;
	}
}
</style>
