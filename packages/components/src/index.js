import { forEach } from "lodash-es";
import * as components from "./components/index";

async function handleMountAttributes(data) {
	const compProps = await import(`./components/${data.name}/properties.js`);
	data.customProps = compProps.properties;
	data.__nodeType = "comp_menu";
	data.buildInfo = await import(`./components/${data.name}/build.json`);
	return data;
}

export const createDesignerComps = () => ({
	install: (app) => {
		forEach(components, async (component) => {
			await handleMountAttributes(component);
			app.component(component.name, component);
		});
	},
});

export { components };
