import { UmbEntryPointOnInit } from '@umbraco-cms/backoffice/extension-api';
import { ManifestTypes } from '@umbraco-cms/backoffice/extension-registry';

// load up the manifests here.
import { manifests as dashboardManifests } from './dashboards/manifest.ts';
import { manifests as tinymcepremiumManifests } from './packages/tiny-mce/manifests.ts';

const manifests: Array<ManifestTypes> = [
    ...dashboardManifests,
    ...tinymcepremiumManifests
];

export const onInit: UmbEntryPointOnInit = (_host, extensionRegistry) => {
    
    // register them here. 
    extensionRegistry.registerMany(manifests);
};
