import { defaults } from 'jest-config';

const config = {
	...defaults,
	rootDir: process.cwd(),
	modulePathIgnorePatterns: ['<rootDir>/.history'],
	moduleDirectories: ['dist/node_modules', ...defaults.moduleDirectories],
	testEnvironment: 'jsdom'
};

export default config;
