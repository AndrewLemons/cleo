<template>
	<div :class="`modal ${isActive && 'is-active'}`">
		<div class="modal-background"></div>
		<div class="modal-content">
			<div class="section has-text-centered">
				<p class="title">Processing</p>
				<p class="subtitle">This may take a while.</p>
				<progress class="progress is-info" max="100"></progress>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "LoadingOverlay",
	props: ["isActive"]
};
</script>
