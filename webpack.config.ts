import { resolve } from 'path'
import { Configuration } from 'webpack'

import CopyPlugin from 'copy-webpack-plugin'

const config: Configuration = {
	target: 'node',
	entry: './src/extension.ts',
	output: {
		path: resolve(__dirname, 'dist'),
		filename: 'extension.js',
		libraryTarget: 'commonjs2',
		devtoolModuleFilenameTemplate: '../[resource-path]',
		clean: true,
	},
	devtool: 'source-map',
	externals: {
		vscode: 'commonjs vscode',
	},
	resolve: {
		extensions: ['.ts'],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
					},
				],
			},
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [{ from: 'src/**/*.json', to: '[name][ext]' }],
		}),
	],
}

export default config
