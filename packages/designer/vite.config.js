import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// element 自动引入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import { resolve } from "path";

function pathResolve(dir) {
	return resolve(process.cwd(), ".", dir);
}

// https://vitejs.dev/config/
export default defineConfig({
	base: "/",
	// 路径重定向
	resolve: {
		alias: [
			{
				find: "@",
				replacement: pathResolve("src") + "/",
			},
		],
		dedupe: ["vue"],
	},
	plugins: [
		vue(),
		AutoImport({
			imports: ["vue"],
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
	],
});
