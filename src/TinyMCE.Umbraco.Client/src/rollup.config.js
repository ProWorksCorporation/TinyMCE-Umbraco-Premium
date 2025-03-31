import esbuild from 'rollup-plugin-esbuild';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-import-css';
import replace from '@rollup/plugin-replace';
import { readdirSync, lstatSync, cpSync, copyFileSync, existsSync, unlinkSync } from 'fs';
import * as globModule from 'tiny-glob';

// TODO: [LK] Review if this is required.

const glob = globModule.default;

// TODO: could we rename this to just dist?
const DIST_DIRECTORY = './dist';

/* TODO: temp solution. Not every external library can run in the browser so we need rollup to bundle them and make them Browser friendly.
For each external library we want to bundle all its files into one js bundle. First we run the
Typescript compiler to create the external folder with d.ts files in the correct places. Then we delete all the js modules that are created, but
might not work in the browser. Then we run rollup to bundle the external libraries. */
console.log('--- Deleting temp external JS modules ---');
const tempJsFiles = await glob(`${DIST_DIRECTORY}/external/**/*.js`);
tempJsFiles.forEach((path) => existsSync(path) && unlinkSync(path));
console.log('--- Deleting temp external JS modules done ---');

// Copy TinyMCE
console.log('--- Copying TinyMCE ---');
cpSync('./node_modules/tinymce', `${DIST_DIRECTORY}/tinymce`, { recursive: true });
console.log('--- Copying TinyMCE done ---');

// Copy TinyMCE i18n
console.log('--- Copying TinyMCE i18n ---');
cpSync('./node_modules/tinymce-i18n/langs6', `${DIST_DIRECTORY}/tinymce/langs`, { recursive: true });
console.log('--- Copying TinyMCE i18n done ---');

const readFolders = (path) => readdirSync(path).filter((folder) => lstatSync(`${path}/${folder}`).isDirectory());
const createModuleDescriptors = (folderName) =>
	readFolders(`./src/${folderName}`).map((moduleName) => {
		return {
			name: moduleName,
			file: `index.ts`,
			root: `./src/${folderName}/${moduleName}`,
			dist: `${DIST_DIRECTORY}/${folderName}/${moduleName}`,
		};
	});

const externals = createModuleDescriptors('external');
const exclude = [];
const allowed = externals.filter((module) => !exclude.includes(module.name));

// TODO: Minify code
const libraries = allowed.map((module) => {
	/** @type {import('rollup').RollupOptions} */
	return {
		input: `./src/external/${module.name}/index.ts`,
		output: {
			dir: `${DIST_DIRECTORY}/external/${module.name}`,
			format: 'es',
		},
		plugins: [
			nodeResolve({ preferBuiltins: false, browser: true }),
			// Replace the vite specific inline query with nothing so that the import is valid
			replace({
				preventAssignment: true,
				values: {
					'?inline': '',
				},
			}),
			css({ minify: true }),
			esbuild({ minify: true, sourceMap: true }),
		],
	};
});

/** @type {import('rollup').RollupOptions[]} */
export default [...libraries];
