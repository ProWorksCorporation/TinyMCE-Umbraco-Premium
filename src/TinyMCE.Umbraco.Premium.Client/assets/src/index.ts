import { UmbEntryPointOnInit } from '@umbraco-cms/backoffice/extension-api';

// load up the manifests here.
import { manifests as tinymcepremiumManifests } from './packages/tiny-mce/manifests.ts';

const manifests: Array<UmbExtensionManifest> = [
    ...tinymcepremiumManifests
];

export const onInit: UmbEntryPointOnInit = (_host, extensionRegistry) => {
    
    // register them here. 
    extensionRegistry.registerMany(manifests);
};
