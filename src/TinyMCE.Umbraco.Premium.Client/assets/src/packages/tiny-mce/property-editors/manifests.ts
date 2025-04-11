import { manifest as blockRteTypeManifest } from './block/manifests.js';
import { manifests as tinyMcePremiumManifest } from './tiny-mce/manifests.js';

export const manifests: Array<UmbExtensionManifest> = [
	...tinyMcePremiumManifest,
	blockRteTypeManifest,
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
		alias: 'TinyMCE.PropertyEditorUI.TinyMCEPremium.ToolbarConfiguration',
		name: 'TinyMCE Premium Toolbar Property Editor UI',
		element: () => import('./toolbar/property-editor-ui-tiny-mce-toolbar-configuration.element.js'),
		meta: {
			label: 'TinyMCE Premium Toolbar Configuration',
			icon: 'icon-autofill',
			group: 'common',
		},
	},
	{
		type: 'propertyEditorUi',
		alias: 'TinyMCE.PropertyEditorUI.TinyMCEPremium.StylesheetsConfiguration',
		name: 'TinyMCE Premium Stylesheets Property Editor UI',
		element: () => import('./stylesheets/property-editor-ui-tiny-mce-stylesheets-configuration.element.js'),
		meta: {
			label: 'TinyMCE Premium Stylesheets Configuration',
			icon: 'icon-autofill',
			group: 'common',
		},
	},
	{
		type: 'propertyEditorUi',
		alias: 'TinyMCE.PropertyEditorUI.TinyMCEPremium.DimensionsConfiguration',
		name: 'TinyMCE Premium Dimensions Property Editor UI',
		element: () => import('./dimensions/property-editor-ui-tiny-mce-dimensions-configuration.element.js'),
		meta: {
			label: 'TinyMCE Premium Dimensions Configuration',
			icon: 'icon-autofill',
			group: 'common',
		},
	},
	{
		type: 'propertyEditorUi',
		alias: 'TinyMCE.PropertyEditorUI.TinyMCEPremium.MaxImageSizeConfiguration',
		name: 'TinyMCE Premium Max Image Size Property Editor UI',
		element: () => import('./max-image-size/property-editor-ui-tiny-mce-maximagesize.element.js'),
		meta: {
			label: 'TinyMCE Premium Max Image Size Configuration',
			icon: 'icon-autofill',
			group: 'common',
		},
	},
];
