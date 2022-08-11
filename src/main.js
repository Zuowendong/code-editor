import { createApp } from "vue";
import { forEach } from "lodash-es";
import App from "./App.vue";
import { store } from "./store";

/**
 * 全局注册组件
 */
import * as components from "./components/index";
const createComponents = () => ({
    install: (app) => {
        forEach(components, (component) => {
            app.component(component.name, component);
        });
    },
});
/**
 * 全局注册属性栏组件
 */
import * as editorComs from "./editor-comp/index";
const createEditorComps = () => ({
    install: (app) => {
        forEach(editorComs, (component) => {
            app.component(component.name, component);
        });
    },
});

const app = createApp(App);
app.use(store);
app.use(createComponents());
app.use(createEditorComps());
app.mount("#app");
