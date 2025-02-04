import type { ManifestTinyMcePlugin } from '@umbraco-cms/backoffice/extension-registry';

export const manifests: Array<ManifestTinyMcePlugin> = [
	{
		type: 'tinyMcePlugin',
		alias: 'TinyMCE.TinyMcePremiumPlugin.CodeEditor',
		name: 'Code Editor TinyMCE Premium Plugin',
		js: () => import('./tiny-mce-code-editor.plugin.js'),
		meta: {
			toolbar: [
				{
					alias: 'tinymcesourcecode',
					label: 'Source code editor',
					icon: 'sourcecode',
				},
			],
		},
	},
	{
		type: 'tinyMcePlugin',
		alias: 'TinyMCE.TinyMcePremiumPlugin.MediaPicker',
		name: 'Media Picker TinyMCE Premium Plugin',
		js: () => import('./tiny-mce-mediapicker.plugin.js'),
		meta: {
			toolbar: [
				{
					alias: 'tinymcemediapicker',
					label: 'Image',
					icon: 'image',
				},
			],
		},
	},
	{
		type: 'tinyMcePlugin',
		alias: 'TinyMCE.TinyMcePremiumPlugin.EmbeddedMedia',
		name: 'Embedded Media TinyMCE Premium Plugin',
		js: () => import('./tiny-mce-embeddedmedia.plugin.js'),
		meta: {
			toolbar: [
				{
					alias: 'tinymceembeddialog',
					label: 'Embed',
					icon: 'embed',
				},
			],
		},
	},
];
