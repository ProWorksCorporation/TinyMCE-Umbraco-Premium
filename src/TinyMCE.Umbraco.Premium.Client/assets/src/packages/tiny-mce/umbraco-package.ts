export const name = 'TinyMce.Umbraco.Premium';
export const extensions = [
	{
		name: 'TinyMce Premium Bundle',
		alias: 'TinyMce.Bundle.TinyMcePremium',
		type: 'bundle',
		js: () => import('./manifests.js'),
	},
];
