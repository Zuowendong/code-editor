<script setup>
import LeftComponents from "./view/left-components.vue";
import CenterCanvas from "./view/center-canvas.vue";
import RightProperty from "./view/right-property.vue";
</script>

<template>
    <div class="main">
        <left-components />
        <center-canvas />
        <right-property />
    </div>
</template>

<style>
* {
    margin: 0;
    padding: 0;
}
#app {
    width: 100vw;
    height: 100vh;
}
.main {
    width: 100%;
    height: 100%;
    display: grid;
    background-color: antiquewhite;
    grid-template-columns: 200px auto 400px;
    column-gap: 4px;
}
</style>
