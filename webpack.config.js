const webpack = require('webpack');
const path = require('path');
// const outputPath = path.resolve(__dirname);
// const outputPath = path.resolve(__dirname, 'dist');

// 'production' か 'development' を指定
const MODE = "development";
// const MODE = "production";

// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = MODE === "development";

module.exports = {
	// resolve: { root: [path.resolve(__dirname)] },
	mode: MODE,
	entry: {
		main: './src/assets/js/index.js',
		top: './src/assets/js/page/top.js',
		form: './src/assets/js/page/form.js'
	},
	output: {
		// path: `${__dirname}/assets/js/`,
		filename: "[name].js",
	},
	optimization: {
		splitChunks: {
			name: 'bundle',
			chunks: 'initial',
		}
	},
	module: {
		rules: [
			{
				// 拡張子 .js の場合
				test: /\.js$/,
				use: [
					{
						// Babel を利用する
						loader: 'babel-loader',
						// Babel のオプションを指定する
						options: {
							presets: [
								// プリセットを指定することで、ES2020 を ES5 に変換
								'@babel/preset-env',
							]
						}
					}
				]
			},
			{
				test: /\.css/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						// options: {
						// 	url: false
						// }
					}
				],
			},
			{
				test: /\.png|jpg|svg|gif|eot|wof|woff|ttf$/,
				use: ['url-loader']
			}
		]
	},
	// plugins: [
	// 	new webpack.ProvidePlugin({
	// 		$: 'jquery',
	// 		jQuery: 'jquery'
	// 	})
	// ]
};
