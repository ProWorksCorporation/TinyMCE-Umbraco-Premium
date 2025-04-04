import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { LitElement, html, css, customElement, property } from "@umbraco-cms/backoffice/external/lit";

@customElement('tinymce_umbraco_premium-dashboard')
export class TinyMCE_Umbraco_PremiumDashboard extends UmbElementMixin(LitElement) {

    constructor() {
        super();
    }

    @property()
    title = 'TinyMCE.Umbraco.Premium dashboard'

    render() {
        return html`
            <uui-box headline="${this.title}">
                dashboard content goes here
            </uui-box>
        `
    }

    static styles = css`
        :host {
            display: block;
            padding: 20px;
        }
    `
}


export default TinyMCE_Umbraco_PremiumDashboard;

declare global {
    interface HtmlElementTagNameMap {
        'TinyMCE.Umbraco.Premium-dashboard': TinyMCE_Umbraco_PremiumDashboard
    }
}