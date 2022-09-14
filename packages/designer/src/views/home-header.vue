<template>
	<div class="headerMain">
		<div></div>
		<div class="title">Zyf low code platform</div>
		<div></div>
	</div>
</template>

<script setup>
import { Plus } from "@element-plus/icons-vue";
</script>

<style lang="scss" scoped>
.headerMain {
	height: 100%;
	display: grid;
	grid-template-columns: 1fr 3fr 1fr;
	.title {
		font-size: 16px;
    font-weight: bold;
		color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
	}
}
</style>
