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
];
