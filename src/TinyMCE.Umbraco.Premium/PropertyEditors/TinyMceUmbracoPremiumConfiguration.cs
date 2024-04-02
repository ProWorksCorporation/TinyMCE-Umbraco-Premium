using static Umbraco.Cms.Core.PropertyEditors.RichTextConfiguration;
using Umbraco.Cms.Core.PropertyEditors;

namespace TinyMCE.Umbraco.Premium.PropertyEditors;

/// <summary>
///     Represents the configuration for the rich text value editor.
/// </summary>
public class TinyMceUmbracoPremiumConfiguration : RichTextConfiguration
{
	[ConfigurationField("editor", "Editor", "~/App_Plugins/TinyMCE.Umbraco.Premium/PreValues/tinymce.rte.prevalues.html", HideLabel = true)]
	public new object? Editor { get; set; }
}
