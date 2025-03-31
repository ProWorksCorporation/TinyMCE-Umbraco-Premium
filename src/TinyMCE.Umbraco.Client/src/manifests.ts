import { manifests as components } from './components/manifests.js';
import { manifests as entryPoints } from './entry-points/manifest.js';
import { manifests as icons } from './icons/manifests.js';
import { manifests as localizations } from './localizations/manifests.js';
import { manifests as propertyEditors } from './property-editors/manifests.js';
import { manifests as plugins } from './plugins/manifests.js';
import { manifests as stylesheets } from './stylesheets/manifests.js';

// TODO: The current Umbraco 16 nightly build still has the TinyMCE code/manifests,
// so this causes an extension conflict with the manifest aliases.
// This temporary workaround prefixes the manifest names and aliases with "ProWorks".
// Once Umbraco 16 nightly has been updated, we can remove this temporary workaround. [LK]
const temp: Array<UmbExtensionManifest> = [
	...components,
	...entryPoints,
	...icons,
	...localizations,
	...propertyEditors,
	...plugins,
	...stylesheets,
].map((x) => ({ ...x, name: `[ProWorks] ${x.name}`, alias: `ProWorks.${x.alias}` }));

export const manifests = temp;
