import type { UmbInputTinyMcePremiumElement } from './input-tiny-mce.element.js';
import { UmbControllerBase } from '@umbraco-cms/backoffice/class-api';
import type { UmbApi } from '@umbraco-cms/backoffice/extension-api';
import type { Editor } from '@umbraco-cms/backoffice/external/tinymce';
import type { UmbPropertyEditorConfigCollection } from '@umbraco-cms/backoffice/property-editor';

export class UmbTinyMcePremiumPluginBase extends UmbControllerBase implements UmbApi {
	editor: Editor;
	configuration?: UmbPropertyEditorConfigCollection;

	constructor(arg: TinyMcePremiumPluginArguments) {
		super(arg.host);
		this.editor = arg.editor;
		this.configuration = arg.host.configuration;
	}
}

export type TinyMcePremiumPluginArguments = {
	host: UmbInputTinyMcePremiumElement;
	editor: Editor;
};
