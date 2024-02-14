using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using TinyMCE.Umbraco.Premium.Options;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.Configuration.Models;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Models.ContentEditing;
using Umbraco.Cms.Core.Notifications;

namespace TinyMCE.Umbraco.Premium.Composers
{
    internal class TinyMceComposer : IComposer
    {
		private static readonly string[] Default_tinymce_premium_plugins =
        {
			"a11ychecker", "advtable", "advcode", "checklist", "casechange", "export", "footnotes", "formatpainter",
			"linkchecker", "pageembed", "permanentpen", "tinymcespellchecker", "autocorrect", "tableofcontents"
		};
		private static readonly string[] Default_tinymce_additional_free_plugins =
		{
		};

		private TinyMceConfig _tinyMceConfig;
		//public TinyMceComposer(IOptions<TinyMceConfig> tinyMceConfig)
		//{
		//	_tinyMceConfig = tinyMceConfig.Value;
		//}


		/// <inheritdoc />
		public void Compose(IUmbracoBuilder builder)
        {
            builder.AddNotificationHandler<ServerVariablesParsingNotification, ServerVariablesParsingNotificationHandler>();

			var tinyMceOptionsBuilder = builder.Services.AddOptions<TinyMceConfig>().Bind(builder.Config.GetSection("TinyMceConfig"));

			/// <inheritdoc />
			builder.Services.Configure<RichTextEditorSettings>(options =>
            {
				var optionsService = StaticServiceProvider.Instance.GetRequiredService<IOptions<TinyMceConfig>>();
				if (optionsService != null)
				{
					_tinyMceConfig = (TinyMceConfig)optionsService.Value;
				}

				if (_tinyMceConfig != null)
				{
					var plugins = options.Plugins.ToList();
					var commands = options.Commands.ToList();

					//plugins.AddRange(Default_tinymce_premium_plugins);

					// Add some default plugins to all RTEs that don't require much configuration and have a toolbar that
					// can be disabled
					if (!_tinyMceConfig.pluginsToExclude.Contains("a11ychecker"))
					{
						plugins.Add("a11ychecker");
						commands.Add(new RichTextEditorSettings.RichTextEditorCommand
						{
							Alias = "a11ycheck",
							Name = "Accessibility Checker (Premium Plugin)",
							Mode = RichTextEditorCommandMode.All
						});
					}
					//plugins.Add("advtable");  // No toolbar so excluding by default
					//plugins.Add("advcode");   // Umbraco uses the ace editor
					//commands.Add(new RichTextEditorSettings.RichTextEditorCommand
					//{
					//    Alias = "code",
					//    Name = "Advanced Code Editor (Premium Plugin)",
					//    Mode = RichTextEditorCommandMode.Insert
					//});

					if (!_tinyMceConfig.pluginsToExclude.Contains("casechange"))
					{
						plugins.Add("casechange");
						commands.Add(new RichTextEditorSettings.RichTextEditorCommand
						{
							Alias = "casechange",
							Name = "Case Change (Premium Plugin)",
							Mode = RichTextEditorCommandMode.Selection
						});
						// TODO: Add a default "casechange_title_case_minors" in some way
					}
					if (!_tinyMceConfig.pluginsToExclude.Contains("checklist"))
					{
						plugins.Add("checklist");   // Umbraco has the "lists" plugin by default
						commands.Add(new RichTextEditorSettings.RichTextEditorCommand
						{
							Alias = "checklist",
							Name = "Checklist (Premium Plugin)",
							Mode = RichTextEditorCommandMode.All
						});
					}
					if (!_tinyMceConfig.pluginsToExclude.Contains("export"))
					{
						plugins.Add("export");
						commands.Add(new RichTextEditorSettings.RichTextEditorCommand
						{
							Alias = "export",
							Name = "Export (Premium Plugin)",
							Mode = RichTextEditorCommandMode.All
						});
					}
					if (!_tinyMceConfig.pluginsToExclude.Contains("footnotes"))
					{
						plugins.Add("footnotes");
						commands.Add(new RichTextEditorSettings.RichTextEditorCommand
						{
							Alias = "footnotes",
							Name = "Footnotes (Premium Plugin)",
							Mode = RichTextEditorCommandMode.All
						});
					}
					if (!_tinyMceConfig.pluginsToExclude.Contains("formatpainter"))
					{
						plugins.Add("formatpainter");
						commands.Add(new RichTextEditorSettings.RichTextEditorCommand
						{
							Alias = "formatpainter",
							Name = "Format Painter (Premium Plugin)",
							Mode = RichTextEditorCommandMode.Selection
						});
					}
					//plugins.Add("linkchecker"); // No toolbar so excluding by default
					if (!_tinyMceConfig.pluginsToExclude.Contains("pageembed"))
					{
						plugins.Add("pageembed");
						commands.Add(new RichTextEditorSettings.RichTextEditorCommand
						{
							Alias = "pageembed",
							Name = "Page Embed (Premium Plugin)",
							Mode = RichTextEditorCommandMode.Insert
						});
					}
					if (!_tinyMceConfig.pluginsToExclude.Contains("permanentpen"))
					{
						plugins.Add("permanentpen");
						commands.Add(new RichTextEditorSettings.RichTextEditorCommand
						{
							Alias = "permanentpen",
							Name = "Permanent Pen (Premium Plugin)",
							Mode = RichTextEditorCommandMode.Selection
						});
					}
					if (!_tinyMceConfig.pluginsToExclude.Contains("tinymcespellchecker"))
					{
						plugins.Add("tinymcespellchecker");
						commands.Add(new RichTextEditorSettings.RichTextEditorCommand
						{
							Alias = "spellchecker",
							Name = "Spell Checker Pro (Premium Plugin)",
							Mode = RichTextEditorCommandMode.All
						});
					}
					//plugins.Add("autocorrect"); // No toolbar so excluding by default
					if (!_tinyMceConfig.pluginsToExclude.Contains("tableofcontents"))
					{
						plugins.Add("tableofcontents");
						commands.Add(new RichTextEditorSettings.RichTextEditorCommand
						{
							Alias = "tableofcontents",
							Name = "Table of Contents (Premium Plugin)",
							Mode = RichTextEditorCommandMode.Insert
						});
					}


					options.Plugins = plugins.ToArray();
					options.Commands = commands.ToArray();
				}
            });
        }

        /// <inheritdoc /> 
        private class ServerVariablesParsingNotificationHandler : INotificationHandler<ServerVariablesParsingNotification>
        {
            private TinyMceConfig _tinyMceConfig;

            public ServerVariablesParsingNotificationHandler(IOptions<TinyMceConfig> tinyMceConfig) { 
                _tinyMceConfig = tinyMceConfig.Value;
            }

            /// <inheritdoc /> 
            public void Handle(ServerVariablesParsingNotification notification) => notification.ServerVariables.Add("tinymcepremium", new
            {
                apiKey = _tinyMceConfig != null ? _tinyMceConfig.apikey : "",
            });
        }
    }
}
