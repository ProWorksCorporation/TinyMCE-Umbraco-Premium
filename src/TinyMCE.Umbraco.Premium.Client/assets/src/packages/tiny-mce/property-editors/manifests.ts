import { manifest as blockRteTypeManifest } from './block/manifests.js';
import { manifests as tinyMcePremiumManifest } from './tiny-mce/manifests.js';
import type { ManifestTypes } from '@umbraco-cms/backoffice/extension-registry';

export const manifests: Array<ManifestTypes> = [
	...tinyMcePremiumManifest,
	blockRteTypeManifest,
	{
		type: 'propertyEditorUi',
		alias: 'TinyMCE.PropertyEditorUI.TinyMCEPremium.ToolbarConfiguration',
		name: 'TinyMCE Premium Toolbar Property Editor UI',
		js: () => import('./toolbar/property-editor-ui-tiny-mce-toolbar-configuration.element.js'),
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
		js: () => import('./stylesheets/property-editor-ui-tiny-mce-stylesheets-configuration.element.js'),
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
		js: () => import('./dimensions/property-editor-ui-tiny-mce-dimensions-configuration.element.js'),
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
		js: () => import('./max-image-size/property-editor-ui-tiny-mce-maximagesize.element.js'),
		meta: {
			label: 'TinyMCE Premium Max Image Size Configuration',
			icon: 'icon-autofill',
			group: 'common',
		},
	},
];
