const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env = {}) => ({
	mode: env.prod ? "production" : "development",
	entry: path.resolve(__dirname, "./app/src/index.js"),
	output: {
		path: path.resolve(__dirname, "./app/dist"),
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: "vue-loader",
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.svg$/,
				type: "asset/inline",
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: "./app/src/index.html",
		}),
	],
});
