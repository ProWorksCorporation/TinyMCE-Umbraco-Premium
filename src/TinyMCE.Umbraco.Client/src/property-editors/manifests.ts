import { manifests as tinyMceManifest } from './tiny-mce/manifests.js';

export const manifests: Array<UmbExtensionManifest> = [
	...tinyMceManifest,
	{
		type: 'propertyEditorUi',
		alias: 'TinyMCE.PropertyEditorUI.TinyMCEPremium.PluginConfiguration',
		name: 'TinyMCE Premium Plugin Property Editor UI',
		element: () => import('./plugin/property-editor-ui-tiny-mce-plugin-configuration.element.js'),
		meta: {
			label: 'TinyMCE Premium Plugin Configuration',
			icon: 'icon-autofill',
			group: 'common',
		},
	},
	{
		type: 'propertyEditorUi',
		alias: 'Umb.PropertyEditorUI.TinyMCE.ToolbarConfiguration',
		name: 'TinyMCE Toolbar Property Editor UI',
		element: () => import('./toolbar/property-editor-ui-tiny-mce-toolbar-configuration.element.js'),
		meta: {
			label: 'TinyMCE Toolbar Configuration',
			icon: 'icon-autofill',
			group: 'common',
		},
	},
];
