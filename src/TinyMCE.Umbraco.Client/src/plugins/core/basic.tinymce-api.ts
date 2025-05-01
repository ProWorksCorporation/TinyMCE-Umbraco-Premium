import { UmbTinyMcePluginBase } from '../../components/input-tiny-mce/tiny-mce-plugin.js';
import type { TinyMcePluginArguments } from '../../components/input-tiny-mce/tiny-mce-plugin.js';

export default class TinyMceBasicExtensionApi extends UmbTinyMcePluginBase {
	constructor(args: TinyMcePluginArguments) {
		super(args);
		//console.log("basic initialized");
	}

}
