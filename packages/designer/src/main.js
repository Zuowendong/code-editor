import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { forEach } from "lodash-es";

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
app.use(createEditorComps());
app.use(createDesignerComps());
app.mount("#app");
