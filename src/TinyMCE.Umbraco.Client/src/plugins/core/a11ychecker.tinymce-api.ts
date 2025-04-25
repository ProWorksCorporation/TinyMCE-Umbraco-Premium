import { UmbTinyMcePluginBase } from '../../components/input-tiny-mce/tiny-mce-plugin.js';
import type { TinyMcePluginArguments } from '../../components/input-tiny-mce/tiny-mce-plugin.js';

export default class TinyMceA11ycheckerExtensionApi extends UmbTinyMcePluginBase {
	constructor(args: TinyMcePluginArguments) {
		super(args);
		console.log("allychecker initialized");
	}

}
