import { TinyMceService } from '../api/index.js';
import { tryExecute } from '@umbraco-cms/backoffice/resources';
// @ts-ignore
import { umbHttpClient } from '@umbraco-cms/backoffice/http-client';
import { UmbTinyMcePluginBase } from '../components/input-tiny-mce/tiny-mce-plugin.js';
import type { TinyMcePluginArguments } from '../components/input-tiny-mce/tiny-mce-plugin.js';

export default class UmbTinyMcePremiumExamplePlugin extends UmbTinyMcePluginBase {
	constructor(args: TinyMcePluginArguments) {
		super(args);
		this.#getTinyMceConfig();
	}

	async #getTinyMceConfig() {
		// @ts-ignore
		const { data } = await tryExecute(this, TinyMceService.getConfig({ client: umbHttpClient }));
		if (!data) return;

		// @ts-ignore
		const apiKey = data.config?.apikey || 'no-origin';
		// @ts-ignore
		const url = `https://cdn.tiny.cloud/1/${apiKey}/tinymce/6/plugins.min.js`;

		console.log('TinyMceService.getConfig', [data, url]);

		// TODO: Uncomment this when the plugin is ready
		//await import(url);
	}
}
