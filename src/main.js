import { createApp } from "vue";
import { forEach } from "lodash-es";
import App from "./App.vue";
import { store } from "./store";

import * as components from "./components/index";
const createComponents = () => ({
    install: (app) => {
        forEach(components, (component) => {
            app.component(component.name, component);
        });
    },
});

createApp(App).use(store).use(createComponents()).mount("#app");
