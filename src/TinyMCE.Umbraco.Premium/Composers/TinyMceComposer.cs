using J2N.Collections.Generic.Extensions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Dynamic;
using System.Text.Json;
using System.Text.Json.Nodes;
using TinyMCE.UmbracoCms.Premium.Options;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.Configuration.Models;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Models.ContentEditing;
using Umbraco.Cms.Core.Notifications;
using static Umbraco.Cms.Core.Constants;

namespace TinyMCE.UmbracoCms.Premium.Composers
{
    internal class TinyMceComposer : IComposer
    {
		private TinyMceConfig _tinyMceConfig = new TinyMceConfig();

		/// <inheritdoc />
		public void Compose(IUmbracoBuilder builder)
        {
            builder.AddNotificationHandler<ServerVariablesParsingNotification, ServerVariablesParsingNotificationHandler>();

			var tinyMceOptionsBuilder = builder.Services.AddOptions<TinyMceConfig>().Bind(builder.Config.GetSection("TinyMceConfig"));

			/// <inheritdoc />
			builder.Services.Configure<RichTextEditorSettings>(options =>
            {
				// Rebuild the Json
				var tinyMceCustomConfigurationSection = builder.Config.GetSection("TinyMceConfig:customConfig");
				var customConfigKeys = new Dictionary<string, string>();
				foreach(var child in tinyMceCustomConfigurationSection.GetChildren())
				{
					dynamic obj = ConfigurationBinder.BindToExpandoObject(child);
					dynamic customConfigObj = ((IDictionary<string, object>)obj.TinyMceConfig.customConfig).First().Value;
					var valueAsText = System.Text.Json.JsonSerializer.Serialize(customConfigObj);
					customConfigKeys.Add(child.Key, valueAsText);
				}

				var optionsService = StaticServiceProvider.Instance.GetRequiredService<IOptions<TinyMceConfig>>();
				if (optionsService != null)
				{
					_tinyMceConfig = (TinyMceConfig)optionsService.Value;
				}

				if (_tinyMceConfig != null)
				{
					var plugins = options.Plugins.ToList();
					var commands = options.Commands.ToList();
					var customConfig = options.CustomConfig;
					if (customConfigKeys.Any())
					{
						foreach (var item in customConfigKeys)
						{
							if (!customConfig.ContainsKey(item.Key))
							{
								customConfig.Add(item.Key, item.Value);
							}
						}
					}

					// Add some default plugins to all RTEs that don't require much configuration and have a toolbar that
					// can be disabled
					if (!_tinyMceConfig.pluginsToExclude.Contains("accordion"))
					{
						plugins.Add("accordion");
						commands.Add(new RichTextEditorSettings.RichTextEditorCommand
						{
							Alias = "accordion",
							Name = "Accordion",
							Mode = RichTextEditorCommandMode.All
						});
					}
					if (!_tinyMceConfig.pluginsToExclude.Contains("codesample"))
					{
						plugins.Add("codesample");
						commands.Add(new RichTextEditorSettings.RichTextEditorCommand
						{
							Alias = "codesample",
							Name = "Code Sample",
							Mode = RichTextEditorCommandMode.All
						});
					}
					if (!_tinyMceConfig.pluginsToExclude.Contains("emoticons"))
					{
						plugins.Add("emoticons");
						commands.Add(new RichTextEditorSettings.RichTextEditorCommand
						{
							Alias = "emoticons",
							Name = "Emoticons",
							Mode = RichTextEditorCommandMode.Insert
						});
					}
					if (!_tinyMceConfig.pluginsToExclude.Contains("help"))
					{
						plugins.Add("help");
						commands.Add(new RichTextEditorSettings.RichTextEditorCommand
						{
							Alias = "help",
							Name = "Help for Editors",
							Mode = RichTextEditorCommandMode.All
						});
					}
					if (!_tinyMceConfig.pluginsToExclude.Contains("insertdatetime"))
					{
						plugins.Add("insertdatetime");
						commands.Add(new RichTextEditorSettings.RichTextEditorCommand
						{
							Alias = "insertdatetime",
							Name = "Insert Date/Time",
							Mode = RichTextEditorCommandMode.Insert
						});
					}
					if (!_tinyMceConfig.pluginsToExclude.Contains("searchreplace"))
					{
						plugins.Add("searchreplace");
						commands.Add(new RichTextEditorSettings.RichTextEditorCommand
						{
							Alias = "searchreplace",
							Name = "Search and Replace",
							Mode = RichTextEditorCommandMode.All
						});
					}
					if (!_tinyMceConfig.pluginsToExclude.Contains("wordcount"))
					{
						plugins.Add("wordcount");
						commands.Add(new RichTextEditorSettings.RichTextEditorCommand
						{
							Alias = "wordcount",
							Name = "Word Count",
							Mode = RichTextEditorCommandMode.All
						});
					}
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
					if (!_tinyMceConfig.pluginsToExclude.Contains("typography"))
					{
						plugins.Add("typography");
						commands.Add(new RichTextEditorSettings.RichTextEditorCommand
						{
							Alias = "typography",
							Name = "Advanced Typography (Premium Plugin)",
							Mode = RichTextEditorCommandMode.Selection
						});
					}
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
					if (!_tinyMceConfig.pluginsToExclude.Contains("mergetags"))
					{
						plugins.Add("mergetags");
						commands.Add(new RichTextEditorSettings.RichTextEditorCommand
						{
							Alias = "mergetags",
							Name = "Merge Tags (Premium Plugin)",
							Mode = RichTextEditorCommandMode.Insert
						});
					}
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
				openAiApikey = _tinyMceConfig != null ? _tinyMceConfig.openAiApikey : "",
			});
        }
    }


	public static class ConfigurationBinder
	{
		public static ExpandoObject BindToExpandoObject(IConfiguration config)
		{
			var result = new ExpandoObject();

			// retrieve all keys from your settings
			var configs = config.AsEnumerable();
			foreach (var kvp in configs)
			{
				var parent = result as IDictionary<string, object>;
				var path = kvp.Key.Split(':');

				// create or retrieve the hierarchy (keep last path item for later)
				var i = 0;
				for (i = 0; i < path.Length - 1; i++)
				{
					if (!parent.ContainsKey(path[i]))
					{
						parent.Add(path[i], new ExpandoObject());
					}

					parent = parent[path[i]] as IDictionary<string, object>;
				}

				if (kvp.Value == null)
					continue;

				// add the value to the parent
				// note: in case of an array, key will be an integer and will be dealt with later
				var key = path[i];
				parent.Add(key, kvp.Value);
			}

			// at this stage, all arrays are seen as dictionaries with integer keys
			ReplaceWithArray(null, null, result);

			return result;
		}

		private static void ContinueArray(ExpandoObject parent, string key, object input)
		{
			if (input == null)
				return;

			var array = input as object[];
			if (array != null)
			{
				foreach ( var item in array)
				{
					var dict = item as IDictionary<string, object>;
					if (dict != null)
					{
						var keys = dict.Keys.ToArray();

						foreach (var childKey in dict.Keys.ToList())
						{
							ReplaceWithArray(item as ExpandoObject, childKey, dict[childKey] as ExpandoObject);
						}
					}
				}
			}
		}

		private static void ReplaceWithArray(ExpandoObject parent, string key, ExpandoObject input)
		{
			if (input == null)
				return;

			var dict = input as IDictionary<string, object>;
			var keys = dict.Keys.ToArray();

			// it's an array if all keys are integers
			if (keys.All(k => int.TryParse(k, out var dummy)))
			{
				var array = new object[keys.Length];
				foreach (var kvp in dict)
				{
					array[int.Parse(kvp.Key)] = kvp.Value;
				}

				var parentDict = parent as IDictionary<string, object>;
				parentDict.Remove(key);
				parentDict.Add(key, array);

				foreach (var childKey in parentDict.Keys.ToList())
				{
					ContinueArray(parent, childKey, parentDict[childKey]);
				}
			}
			else
			{
				foreach (var childKey in dict.Keys.ToList())
				{
					  ReplaceWithArray(input, childKey, dict[childKey] as ExpandoObject);
				}
			}
		}
	}
}
