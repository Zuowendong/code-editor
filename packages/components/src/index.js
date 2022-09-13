import { forEach } from "lodash-es";
import * as components from "./components/index";

export const createDesignerComps = () => ({
	install: (app) => {
		forEach(components, async (component) => {
			const compProps = await import("./components/" + component.name + "/properties.js");
			component.customProps = compProps.properties;
			app.component(component.name, component);
		});
	},
});

export { components };
