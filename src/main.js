import { createApp } from "vue";
import App from "./App.vue";
import { forEach } from "lodash-es";

import * as components from "./components/index";
const createComponents = () => ({
    install: (app) => {
        forEach(components, (component) => {
            app.component(component.name, component);
        });
    },
});

createApp(App).use(createComponents()).mount("#app");
