import { UmbTinyMcePluginBase } from '../../components/input-tiny-mce/tiny-mce-plugin.js';
import type { TinyMcePluginArguments } from '../../components/input-tiny-mce/tiny-mce-plugin.js';
import type { Editor } from '../../external/tinymce/index.js';
import type { UmbPropertyEditorConfigCollection } from '@umbraco-cms/backoffice/property-editor';
import { createAiRequest } from './ai-request-factory';

export default class TinyMceAiAssitantExtensionApi extends UmbTinyMcePluginBase {
	readonly #editor: Editor;
	readonly #configuration: UmbPropertyEditorConfigCollection | undefined;

	constructor(args: TinyMcePluginArguments) {
		super(args);
		console.log("ai-assitant initialized");

		this.#editor = args.editor;
		this.#configuration = args.host.configuration;

		if (this.#editor) {
			console.log("ai-assitant this.#editor", [this.#editor]);
		}
		if (this.#configuration) {
			console.log("ai-assitant this.#configuration", [this.#configuration]);
		}
	}

	override async init(): Promise<void> {
		const callAi = await createAiRequest();

		(this.#editor as any).ai_request = callAi;

		console.log("ai-assitant this.#editor 2", [this.#editor]);
	}
}
