using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.IO;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.PropertyEditors;

namespace TinyMCE.Umbraco.Premium.PropertyEditors;

/// <summary>
///     Represents the configuration editor for the rich text value editor.
/// </summary>
public class TinyMceUmbracoPremiumConfigurationEditor : ConfigurationEditor<TinyMceUmbracoPremiumConfiguration>
{
	// Scheduled for removal in v12
	[Obsolete("Please use constructor that takes an IEditorConfigurationParser instead")]
	public TinyMceUmbracoPremiumConfigurationEditor(IIOHelper ioHelper)
		: this(ioHelper, StaticServiceProvider.Instance.GetRequiredService<IEditorConfigurationParser>())
	{
	}

	public TinyMceUmbracoPremiumConfigurationEditor(IIOHelper ioHelper, IEditorConfigurationParser editorConfigurationParser)
		: base(ioHelper, editorConfigurationParser)
	{
	}
}
