<template>
	<div>
		<LoadingOverlay :isActive="isLoading" />
		<div class="box">
			<div class="field has-text-centered">
				<img src="../assets/cleo.svg" alt="Cleo" />
			</div>
			<div class="field">
				<div class="control">
					<div class="file is-boxed has-name">
						<label class="file-label">
							<input
								type="file"
								accept=".stl"
								class="file-input"
								@change="handleFileUpload($event)"
							/>
							<span class="file-cta">
								<span class="file-icon">
									<i class="fas fa-upload"></i>
								</span>
								<span class="file-label">Choose a model...</span>
							</span>
							<span class="file-name">
								{{ file?.name ?? "No file selected" }}
							</span>
						</label>
					</div>
				</div>
			</div>
			<div class="field">
				<div class="control">
					<button class="button is-success is-fullwidth" @click="submit()">
						<span class="icon">
							<i class="fas fa-print"></i>
						</span>
						<span>Print</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";

import LoadingOverlay from "./LoadingOverlay.vue";

export default {
	name: "PrintPage",
	components: {
		LoadingOverlay
	},
	data: () => ({
		file: "",
		isLoading: false
	}),
	methods: {
		submit() {
			if (!this.file) {
				return this.$router.replace({
					name: "/error",
					params: {
						title: "Please select a model.",
						message: "Before you can print, you must select a model that you would like printed."
					}
				})
			}

			this.isLoading = true;

			let form = new FormData();
			form.append("model", this.file);

			axios({
				method: "post",
				url: "/api/upload",
				data: form,
				headers: { "Content-Type": "multipart/form-data" },
			})
				.then(() => {
					this.$router.replace("/success")
				})
				.catch((err) => {
					this.$router.replace({
						name: "error",
						params: {
							title: err.response?.data?.error?.title ?? "Network Error",
							message: err.response?.data?.error?.message ?? "The print request could not be made."
						}
					})
				})
				.finally(() => {
					this.isLoading = false;
				})
		},
		handleFileUpload(event) {
			this.file = event.target?.files[0];
		}
	},
};
</script>
