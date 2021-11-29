<template>
	<div class="box">
		<h1 class="title has-text-black">{{ title ?? "Unknown Error" }}</h1>
		<p class="subtitle has-text-black">{{ message ?? "An unknown error has occurred." }}</p>
		<button class="button is-fullwidth is-link" @click="$router.replace('/')">
			Back
		</button>
	</div>
</template>

<script>
export default {
	name: "ErrorMenu",
	emits: ["close"],
	props: ["title", "message"],
};
</script>
