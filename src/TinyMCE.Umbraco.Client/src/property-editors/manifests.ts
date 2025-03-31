import { manifests as tinyMceManifest } from './tiny-mce/manifests.js';

export const manifests: Array<UmbExtensionManifest> = [
	...tinyMceManifest,
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
	{
		type: 'propertyEditorUi',
		alias: 'Umb.PropertyEditorUI.TinyMCE.StylesheetsConfiguration',
		name: 'TinyMCE Stylesheets Property Editor UI',
		element: () => import('./stylesheets/property-editor-ui-tiny-mce-stylesheets-configuration.element.js'),
		meta: {
			label: 'TinyMCE Stylesheets Configuration',
			icon: 'icon-autofill',
			group: 'common',
		},
	},
];
