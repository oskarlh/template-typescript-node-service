export default {
	globals: {
		"ts-jest": {
			useESM: true,
		},
	},
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
	preset: "ts-jest/presets/default-esm",
	rootDir: "./src",
	testEnvironment: "jest-environment-node-single-context",
	testRegex: "\\.test\\.ts$",
};
