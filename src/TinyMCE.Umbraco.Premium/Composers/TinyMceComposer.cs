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
        /// <inheritdoc />
        public void Compose(IUmbracoBuilder builder)
        {
            builder.AddNotificationHandler<ServerVariablesParsingNotification, ServerVariablesParsingNotificationHandler>();

			var options = builder.Services.AddOptions<TinyMceConfig>().Bind(builder.Config.GetSection("TinyMceConfig"));

			/// <inheritdoc />
			builder.Services.Configure<RichTextEditorSettings>(options =>
            {
                // Add an example plugin (this will always be enabled) 
                var plugins = options.Plugins.ToList();
                plugins.Add("a11ychecker");
                plugins.Add("advtable");
                plugins.Add("advcode");
                plugins.Add("checklist");
                plugins.Add("casechange");
                plugins.Add("export");
                plugins.Add("footnotes");
                plugins.Add("formatpainter");
                plugins.Add("linkchecker");
                plugins.Add("pageembed");
                plugins.Add("permanentpen");
                plugins.Add("tinymcespellchecker");
                plugins.Add("autocorrect");
                plugins.Add("tableofcontents");
                options.Plugins = plugins.ToArray();

                // Add an example command (that the user can turn on in the data type settings) 
                var commands = options.Commands.ToList();
                commands.Add(new RichTextEditorSettings.RichTextEditorCommand
                {
                    Alias = "a11ycheck",
                    Name = "Accessibility Checker (Premium Plugin)",
                    Mode = RichTextEditorCommandMode.Insert
                });
                commands.Add(new RichTextEditorSettings.RichTextEditorCommand
                {
                    Alias = "casechange",
                    Name = "Case Change (Premium Plugin)",
                    Mode = RichTextEditorCommandMode.Insert
                });
                commands.Add(new RichTextEditorSettings.RichTextEditorCommand
                {
                    Alias = "checklist",
                    Name = "Checklist (Premium Plugin)",
                    Mode = RichTextEditorCommandMode.Insert
                });
                commands.Add(new RichTextEditorSettings.RichTextEditorCommand
                {
                    Alias = "code",
                    Name = "Advanced Code Editor (Premium Plugin)",
                    Mode = RichTextEditorCommandMode.Insert
                });
                commands.Add(new RichTextEditorSettings.RichTextEditorCommand
                {
                    Alias = "export",
                    Name = "Export (Premium Plugin)",
                    Mode = RichTextEditorCommandMode.Insert
                });
                commands.Add(new RichTextEditorSettings.RichTextEditorCommand
                {
                    Alias = "footnotes",
                    Name = "Footnotes (Premium Plugin)",
                    Mode = RichTextEditorCommandMode.Insert
                });
                commands.Add(new RichTextEditorSettings.RichTextEditorCommand
                {
                    Alias = "formatpainter",
                    Name = "Format Painter (Premium Plugin)",
                    Mode = RichTextEditorCommandMode.Insert
                });
                commands.Add(new RichTextEditorSettings.RichTextEditorCommand
                {
                    Alias = "pageembed",
                    Name = "Page Embed (Premium Plugin)",
                    Mode = RichTextEditorCommandMode.Insert
                });
                commands.Add(new RichTextEditorSettings.RichTextEditorCommand
                {
                    Alias = "permanentpen",
                    Name = "Permanent Pen (Premium Plugin)",
                    Mode = RichTextEditorCommandMode.Insert
                });
                commands.Add(new RichTextEditorSettings.RichTextEditorCommand
                {
                    Alias = "spellchecker",
                    Name = "Spell Checker Pro (Premium Plugin)",
                    Mode = RichTextEditorCommandMode.Insert
                });
                commands.Add(new RichTextEditorSettings.RichTextEditorCommand
                {
                    Alias = "tableofcontents",
                    Name = "Table of Contents (Premium Plugin)",
                    Mode = RichTextEditorCommandMode.Insert
                });
                options.Commands = commands.ToArray();                
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
            public void Handle(ServerVariablesParsingNotification notification) => notification.ServerVariables.Add("tinymce", new
            {
                apiKey = _tinyMceConfig != null ? _tinyMceConfig.apikey : "",
            });
        }
    }
}
