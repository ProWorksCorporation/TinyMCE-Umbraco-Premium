import { css, customElement, html, property, state, repeat } from '@umbraco-cms/backoffice/external/lit';
import { firstValueFrom } from '@umbraco-cms/backoffice/external/rxjs';
//import { tinymce } from '@umbraco-cms/backoffice/external/tinymce';
import { umbExtensionsRegistry } from '@umbraco-cms/backoffice/extension-registry';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import type { PropertyValueMap } from '@umbraco-cms/backoffice/external/lit';
import type {
	UmbPropertyEditorUiElement,
	UmbPropertyEditorConfigCollection,
} from '@umbraco-cms/backoffice/property-editor';
import { UmbChangeEvent } from '@umbraco-cms/backoffice/event';
import { defaultFallbackConfig } from '../../components/input-tiny-mce/input-tiny-mce.defaults.js';

//const tinyIconSet = tinymce.IconManager.get('default');

type PluginConfig = {
	alias: string;
	label: string;
	icon?: string;
	selected: boolean;
	disabled: boolean;
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

		this.config?.getValueByAlias<PluginConfig[]>('plugins')?.forEach((v) => {
			this._pluginConfig.push({
				...v,
				selected: this.value.includes(v.alias),
			});
		});

		await this.getPlugins();

		this.requestUpdate('_pluginConfig');
	}

	private async getPlugins(): Promise<void> {
		// Get all the tinymce plugins
		const plugin$ = umbExtensionsRegistry.byType('tinyMcePlugin');

		const plugins = await firstValueFrom(plugin$);

		// Add defaultPlugins
		if (typeof defaultFallbackConfig.plugins === 'string') {
			this._pluginConfig.push({
				alias: defaultFallbackConfig.plugins,
				label: defaultFallbackConfig.plugins + " (default plugin)",
				icon: undefined,
				selected: true,
				disabled: true,
			});
		}
		else if (Array.isArray(defaultFallbackConfig.plugins)) {
			defaultFallbackConfig.plugins.forEach((pl: any) => {
				this._pluginConfig.push({
					alias: pl,
					label: pl + " (default plugin)",
					selected: true,
					disabled: true,
				});
			});
		}

		plugins.forEach((p) => {
			if (p.meta?.plugins) {
				if (typeof p.meta.plugins === 'string') {
					this._pluginConfig.push({
						alias: p.meta.plugins,
						label: p.meta.plugins,
						icon: undefined,
						selected: this.value.includes(p.meta.plugins),
						disabled: false,
					});
				}
				else if (Array.isArray(p.meta.plugins)) {
					p.meta.plugins.forEach((pl: any) => {
						this._pluginConfig.push({
							alias: pl,
							label: pl,
							icon: undefined,
							selected: this.value.includes(pl),
							disabled: false,
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

		this.dispatchEvent(new UmbChangeEvent());
	}

	override render() {
		return html`<ul>
			${repeat(
				this._pluginConfig,
				(v) => v.alias,
				(v) =>
					html`<li>
						<uui-checkbox label=${v.label} value=${v.alias} ?disabled=${v.disabled} ?checked=${v.selected} @change=${this.onChange}>							
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
