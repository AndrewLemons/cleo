import { createRouter, createMemoryHistory } from "vue-router";

import PrintPage from "./components/PrintPage.vue";
import ErrorPage from "./components/ErrorPage.vue";
import SuccessPage from "./components/SuccessPage.vue";

const routes = [
	{
		path: "/",
		name: "print",
		component: PrintPage,
		meta: { backgroundColor: "is-primary" }
	},
	{
		path: "/error",
		name: "error",
		component: ErrorPage,
		props: route => route.params,
		meta: { backgroundColor: "is-danger" }
	},
	{
		path: "/success",
		name: "success",
		component: SuccessPage,
		meta: { backgroundColor: "is-success" }
	}
];

export default createRouter({
	routes,
	history: createMemoryHistory()
})