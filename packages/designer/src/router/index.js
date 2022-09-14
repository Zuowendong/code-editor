import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
	{
		path: "/",
		name: "Home",
		component: () => import("../views/home.vue"),
		children: [
			{
				path: "scenes",
				name: "Scene",
				component: () => import("../views/manage-scenes.vue"),
			},
			{
				path: "components",
				name: "Components",
				component: () => import("../views/manage-components.vue"),
			},
		],
	},
	{
		path: '/designer',
		name: 'Designer',
		component: () => import("../views/designer.vue")
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
