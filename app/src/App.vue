<template>
	<div :class="`hero is-fullheight ${$route.meta.backgroundColor}`">
		<div class="hero-body is-justify-content-center">
			<router-view />
		</div>
	</div>
</template>

<script>
export default {
	name: "App",
};
</script>
