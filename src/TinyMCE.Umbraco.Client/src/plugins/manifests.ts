import type { ManifestTinyMcePlugin } from './tinymce-plugin.extension.js';

export const manifests: Array<ManifestTinyMcePlugin> = [
	{
		type: 'tinyMcePlugin',
		alias: 'Umb.TinyMcePlugin.CodeEditor',
		name: 'Code Editor TinyMCE Plugin',
		js: () => import('./tiny-mce-code-editor.plugin.js'),
		meta: {
			toolbar: [
				{
					alias: 'sourcecode',
					label: 'Source code editor',
					icon: 'sourcecode',
					isplugin: false,
				},
			],
		},
	},
	{
		type: 'tinyMcePlugin',
		alias: 'Umb.TinyMcePlugin.MediaPicker',
		name: 'Media Picker TinyMCE Plugin',
		js: () => import('./tiny-mce-mediapicker.plugin.js'),
		meta: {
			toolbar: [
				{
					alias: 'umbmediapicker',
					label: 'Image',
					icon: 'image',
					isplugin: false,
				},
			],
		},
	},
	{
		type: 'tinyMcePlugin',
		alias: 'Umb.TinyMcePlugin.EmbeddedMedia',
		name: 'Embedded Media TinyMCE Plugin',
		js: () => import('./tiny-mce-embeddedmedia.plugin.js'),
		meta: {
			toolbar: [
				{
					alias: 'umbembeddialog',
					label: 'Embed',
					icon: 'embed',
					isplugin: false,
				},
			],
		},
	},
	{
		type: 'tinyMcePlugin',
		alias: 'Umb.TinyMcePlugin.BlockPicker',
		name: 'Block Picker TinyMCE Plugin',
		js: () => import('./tiny-mce-block-picker.plugin.js'),
		meta: {
			toolbar: [
				{
					alias: 'umbblockpicker',
					label: '#blockEditor_insertBlock',
					icon: 'visualblocks',
					isplugin: false,
				},
			],
		},
	},
	{
		type: 'tinyMcePlugin',
		alias: 'Umb.TinyMcePlugin.MultiUrlPicker',
		name: 'Multi Url Picker TinyMCE Plugin',
		js: () => import('./tiny-mce-multi-url-picker.plugin.js'),
		meta: {
			toolbar: [
				{
					alias: 'link',
					label: 'Insert/Edit link',
					icon: 'link',
					isplugin: false,
				},
				{
					alias: 'unlink',
					label: 'Remove link',
					icon: 'unlink',
					isplugin: false,
				},
			],
		},
	},
	{
		type: 'tinyMcePlugin',
		alias: 'Umb.TinyMcePlugin.Accordion',
		name: 'TinyMCE Accorion Plugin',
		js: () => import('./core/accordion.tinymce-api.js'),
		meta: {
			plugins: ['accordion'],
			toolbar: [
				{
					alias: 'accordion',
					label: 'Accordion',
					icon: 'accordion',
					isplugin: true,
					pluginAlias: 'accordion',
				}
			],
		},
	},
	{
		type: 'tinyMcePlugin',
		alias: 'Umb.TinyMcePlugin.Accessibilty',
		name: 'TinyMCE Accessibilty Checker Plugin',
		js: () => import('./core/accordion.tinymce-api.js'),
		meta: {
			plugins: ['a11ychecker'],
			toolbar: [
				{
					alias: 'a11ycheck',
					label: 'Accessibility Checker (Premium Plugin)',
					icon: 'a11ycheck',
					isplugin: true,
					pluginAlias: 'a11ychecker',
				}
			],
		},
	}
];
