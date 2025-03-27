import { manifests as propertyEditors } from './property-editors/manifests.js';
//import { manifests as plugins } from './plugins/manifests.js';
//import { manifests as plugins } from '@umbraco-cms/backoffice/dist-cms/packages/tiny-mce/plugins/manifests.js';
//import { manifests as modalManifests } from './modals/manifests.js';
//import { manifests as modelManifests } from '@umbraco-cms/backoffice/dist-cms/packages/tiny-mce/modals/manifests.js';
import type { ManifestTypes } from '@umbraco-cms/backoffice/extension-registry';

//export const manifests: Array<ManifestTypes> = [...propertyEditors, ...plugins, ...modalManifests];
export const manifests: Array<ManifestTypes> = [...propertyEditors ] //, ...plugins, ...modalManifests];
