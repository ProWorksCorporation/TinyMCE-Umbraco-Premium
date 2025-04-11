import { css, customElement, html, property, state, repeat } from '@umbraco-cms/backoffice/external/lit';
import { firstValueFrom } from '@umbraco-cms/backoffice/external/rxjs';
import { tinymce } from '@umbraco-cms/backoffice/external/tinymce';
import { umbExtensionsRegistry } from '@umbraco-cms/backoffice/extension-registry';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbPropertyValueChangeEvent } from '@umbraco-cms/backoffice/property-editor';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import type { PropertyValueMap } from '@umbraco-cms/backoffice/external/lit';
import type {
	UmbPropertyEditorUiElement,
	UmbPropertyEditorConfigCollection,
} from '@umbraco-cms/backoffice/property-editor';

const tinyIconSet = tinymce.IconManager.get('default');

type PluginConfig = {
	alias: string;
	label: string;
	icon?: string;
	selected: boolean;
};

/**
 * @element umb-property-editor-ui-tiny-mce-premium-plugin-configuration
 */
@customElement('umb-property-editor-ui-tiny-mce-premium-plugin-configuration')
export class UmbPropertyEditorUITinyMcePremiumPluginConfigurationElement
	extends UmbLitElement
	implements UmbPropertyEditorUiElement
{
	@property({ attribute: false })
	set value(value: string | string[] | null) {
		if (!value) return;

		if (typeof value === 'string') {
			this.#selectedValues = value.split(',').filter((x) => x.length > 0);
		} else if (Array.isArray(value)) {
			this.#selectedValues = value;
		} else {
			this.#selectedValues = [];
			return;
		}

		this._pluginConfig.forEach((v) => {
			v.selected = this.#selectedValues.includes(v.alias);
		});
	}
	get value(): string[] {
		return this.#selectedValues;
	}

	@property({ attribute: false })
	config?: UmbPropertyEditorConfigCollection;

	@state()
	private _pluginConfig: PluginConfig[] = [];

	#selectedValues: string[] = [];

	protected override async firstUpdated(_changedProperties: PropertyValueMap<unknown>) {
		super.firstUpdated(_changedProperties);

		var basePlugins = this.config?.getValueByAlias<PluginConfig[]>('plugins');

		basePlugins?.forEach((v) => {
			this._pluginConfig.push({
				...v,
				selected: this.value.includes(v.alias),
			});
		});

		await this.getPlugins();

		this.requestUpdate('_pluginConfig');
	}

	private async getPlugins(): Promise<void> {
		// Get all the toolbar plugins
		const plugin$ = umbExtensionsRegistry.byType('tinyMcePlugin');

		const plugins = await firstValueFrom(plugin$);

		plugins.forEach((p) => {
			if (p.meta?.config?.plugins) {
				if (typeof p.meta.config.plugins === 'string') {
					this._pluginConfig.push({
						alias: p.meta.config.plugins,
						label: p.meta.config.plugins,
						icon: undefined,
						selected: this.value.includes(p.meta.config.plugins),
					});
				}
				else if (Array.isArray(p.meta.config.plugins)) {
					p.meta.config.plugins.forEach((pl: any) => {
						this._pluginConfig.push({
							alias: pl,
							label: pl,
							icon: undefined,
							selected: this.value.includes(pl),
						});
					});
				}
			}
		});
	}

	private onChange(event: CustomEvent) {
		const checkbox = event.target as HTMLInputElement;
		const alias = checkbox.value;

		const value = this._pluginConfig
			.filter((t) => (t.alias !== alias && t.selected) || (t.alias === alias && checkbox.checked))
			.map((v) => v.alias);

		this.value = value;

		this.dispatchEvent(new UmbPropertyValueChangeEvent());
	}

	override render() {
		return html`<ul>
			${repeat(
				this._pluginConfig,
				(v) => v.alias,
				(v) =>
					html`<li>
						<uui-checkbox label=${v.label} value=${v.alias} ?checked=${v.selected} @change=${this.onChange}>
							<uui-icon .svg=${tinyIconSet?.icons[v.icon ?? 'alignjustify']}></uui-icon>
							${v.label}
						</uui-checkbox>
					</li>`,
			)}
		</ul>`;
	}

	static override readonly styles = [
		UmbTextStyles,
		css`
			ul {
				list-style: none;
				padding: 0;
				margin: 0;

				uui-icon {
					width: 1.5em;
					height: 1.5em;
					margin-right: 5px;
				}
			}
		`,
	];
}

export default UmbPropertyEditorUITinyMcePremiumPluginConfigurationElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-property-editor-ui-tiny-mce-premium-plugin-configuration': UmbPropertyEditorUITinyMcePremiumPluginConfigurationElement;
	}
}
