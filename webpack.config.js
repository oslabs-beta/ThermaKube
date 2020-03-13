// const HtmlWebPackPlugin = require('html-webpack-plugin');

// module.exports = {
// 	module: {
// 		// //mode: process.env.NODE_ENV,
// 		// entry: ['./client/index.js'],
// 		// output: {
// 		// 	//path: path.resolve(__dirname,''),
// 		// 	//filename: ''
// 		// },
// 		rules: [
// 			{
// 				test: /\.(js|jsx)$/,
// 				exclude: /node_modules/,
// 				use: {
// 					loader: 'babel-loader',
// 				},
// 			},
// 			{
// 				test: /\.html$/,
// 				use: [
// 					{
// 						loader: 'html-loader',
// 					},
// 				],
// 			},
// 			{
// 				test: /.(css|scss)$/,
// 				use: ['css-loader', 'sass-loader'],
// 			},
// 		],
// 	},
// 	plugins: [
// 		new HtmlWebPackPlugin({
// 			template: './src/index.html',
// 			filename: './index.html',
// 		}),
// 	],
// };

const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './index.html',
			filename: './index.html',
		}),
	],
};
