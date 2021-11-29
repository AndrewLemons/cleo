<template>
	<div class="box">
		<h1 class="title has-text-black">Success!</h1>
		<p class="subtitle has-text-black">
			Your print is in progress and will be on its way soon.
		</p>
		<button class="button is-fullwidth is-link" @click="$emit('close')">
			Ok
		</button>
	</div>
</template>

<script>
export default {
	name: "SuccessMenu"
};
</script>
