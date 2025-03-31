import { client } from '../api/index.js';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import type { UmbEntryPointOnInit, UmbEntryPointOnUnload } from '@umbraco-cms/backoffice/extension-api';

export const onInit: UmbEntryPointOnInit = (_host, _extensionRegistry) => {
	// Will use only to add in Open API config with generated TS OpenAPI HTTPS Client
	// Do the OAuth token handshake stuff
	_host.consumeContext(UMB_AUTH_CONTEXT, async (authContext) => {
		// Get the token info from Umbraco
		const config = authContext.getOpenApiConfiguration();

		client.setConfig({
			baseUrl: config.base,
			credentials: config.credentials,
		});

		// For every request being made, add the token to the headers
		// Can't use the setConfig approach above as its set only once and
		// tokens expire and get refreshed
		client.interceptors.request.use(async (request, _options) => {
			const token = await config.token();
			request.headers.set('Authorization', `Bearer ${token}`);
			return request;
		});
	});

	// TODO: The current Umbraco 16 nightly build still has the TinyMCE code/manifests,
	// so this causes an extension conflict with the manifest aliases.
	// This temporary workaround to exclude the built-in Umbraco TinyMCE manifests.
	// Once Umbraco 16 nightly has been updated, we can remove this temporary workaround. [LK]
	//_extensionRegistry.exclude('Umb.Modal.StylesheetRuleSettings');
	//_extensionRegistry.exclude('Umb.PropertyEditorUI.TinyMCE.StylesheetsConfiguration');
	//_extensionRegistry.exclude('Umb.PropertyEditorUI.TinyMCE.ToolbarConfiguration');
	_extensionRegistry.exclude('Umb.PropertyEditorUi.TinyMCE');
	_extensionRegistry.exclude('Umb.TinyMcePlugin.BlockPicker');
	_extensionRegistry.exclude('Umb.TinyMcePlugin.CodeEditor');
	_extensionRegistry.exclude('Umb.TinyMcePlugin.EmbeddedMedia');
	_extensionRegistry.exclude('Umb.TinyMcePlugin.MediaPicker');
	_extensionRegistry.exclude('Umb.TinyMcePlugin.MultiUrlPicker');
	//_extensionRegistry.exclude('Umb.WorkspaceView.Stylesheet.RichTextEditor');
};

export const onUnload: UmbEntryPointOnUnload = (_host, _extensionRegistry) => {};
