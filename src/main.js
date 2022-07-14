import { createApp } from "vue";
import App from "./App.vue";
import { forEach } from "lodash-es";
import vue3ResizeDrag from "vue3-resize-drag";

import * as components from "./components/index";
const createComponents = () => ({
    install: (app) => {
        forEach(components, (component) => {
            app.component(component.name, component);
        });
    },
});

createApp(App).use(vue3ResizeDrag).use(createComponents()).mount("#app");
