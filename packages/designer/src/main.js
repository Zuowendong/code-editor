import { createApp } from "vue";
import "./style/reset.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router/index";
import { forEach } from "lodash-es";

import "zyfui/dist/style.css";
import { createZyfUI } from "zyfui";

import * as editorComps from "./components";
import { createDesignerComps } from "@zyf/components";

const store = createPinia();
/**
 * 全局注册属性栏组件
 */
const createEditorComps = () => ({
	install: (app) => {
		forEach(editorComps, (component) => {
			app.component(component.name, component);
		});
	},
});

const app = createApp(App);
app.use(store);
app.use(router);
app.use(createZyfUI());
app.use(createEditorComps());
app.use(createDesignerComps());
app.mount("#app");
