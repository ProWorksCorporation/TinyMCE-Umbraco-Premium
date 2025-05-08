import { css, customElement, html, property, state, query } from '@umbraco-cms/backoffice/external/lit';
//import { TinyMceService } from '../../api/index.js';
//import { tryExecute } from '@umbraco-cms/backoffice/resources';
//import { umbHttpClient } from '@umbraco-cms/backoffice/http-client';

//import { umbExtensionsRegistry } from '@umbraco-cms/backoffice/extension-registry';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
//import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import type { PropertyValueMap } from '@umbraco-cms/backoffice/external/lit';
import type {
	UmbPropertyEditorUiElement,
	UmbPropertyEditorConfigCollection,
} from '@umbraco-cms/backoffice/property-editor';
import { UmbChangeEvent, UmbInputEvent } from '@umbraco-cms/backoffice/event';
import type { UmbCodeEditorElement, CodeEditorLanguage } from '@umbraco-cms/backoffice/code-editor';
//import type { TinyMceConfigResponseModel } from '../../api/index.js';

/**
 * @element umb-property-editor-ui-tiny-mce-config-editor
 */
@customElement('umb-property-editor-ui-tiny-mce-config-editor')
export class UmbPropertyEditorUITinyMceConfigEditorElement
	extends UmbLitElement
	implements UmbPropertyEditorUiElement
{
	#defaultLanguage: CodeEditorLanguage = 'json';

	@property({ attribute: false })
	set value(value: string | null) {
		if (!value) return;

		this._customConfig = value;
	}
	get value(): string {
		return this._customConfig;
	}

	@property({ attribute: false })
	config?: UmbPropertyEditorConfigCollection;

	@state()
	private _customConfig: string = "";

	@query('umb-code-editor')
	_codeEditor?: UmbCodeEditorElement;

	//#tinyConfiguration: TinyMceConfigResponseModel | undefined;

	protected override async firstUpdated(_changedProperties: PropertyValueMap<unknown>) {
		super.firstUpdated(_changedProperties);

		this._customConfig = this.value;
		this._customConfig = "{ test: 'test' }";
		//this.#tinyConfiguration = await this.#getTinyMceConfig();

		this.requestUpdate('_customConfig');
	}

	//async #getTinyMceConfig() {
	//	// @ts-ignore
	//	const { data } = await tryExecute(this, TinyMceService.getConfig({ client: umbHttpClient }));
	//	if (!data) return;

	//	return data;
	//}


	//private onChange(_event: CustomEvent) {
	//	//const checkbox = event.target as HTMLInputElement;

	//	this.value = this._codeEditor?.editor?.monacoEditor?.getValue() ?? '';

	//	//this.value = value;

	//	this.dispatchEvent(new UmbChangeEvent());
	//}

	#onChange(event: UmbInputEvent & { target: UmbCodeEditorElement }) {
		if (!(event instanceof UmbInputEvent)) return;
		this.value = event.target.code;
		this.dispatchEvent(new UmbChangeEvent());
	}


	#renderCodeEditor() {
		return html`
			<umb-code-editor .language="${this.#defaultLanguage}" .code=${this.value ?? ''} @input=${this.#onChange}></umb-code-editor>
		`;
	}

	override render() {
		return html`
			<umb-body-layout>
				<p>TODO...</p>
				<div id="editor-box">${this.#renderCodeEditor()}</div>
			</umb-body-layout>
		`;
	}

	static override readonly styles = [
		css`
			#editor-box {
				padding: var(--uui-box-default-padding, var(--uui-size-space-5, 18px));
				height: 100%;
				display: flex;
			}

			umb-code-editor {
				width: 100%;
				height: 300px;
			}
		`,
	];
}

export default UmbPropertyEditorUITinyMceConfigEditorElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-property-editor-ui-tiny-mce-config-editor': UmbPropertyEditorUITinyMceConfigEditorElement;
	}
}
