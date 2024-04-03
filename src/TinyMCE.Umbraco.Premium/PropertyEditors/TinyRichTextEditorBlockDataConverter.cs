using Newtonsoft.Json.Linq;
using Umbraco.Cms.Core.Models.Blocks;
using Umbraco.Cms.Core.Models.PublishedContent;

namespace TinyMCE.Umbraco.Premium.PropertyEditors;

/// <summary>
///     Data converter for blocks in the richtext property editor
///     
///     Based on Umbraco-CMS\src\Umbraco.Infrastructure\Models\Blocks\RichTextEditorBlockDataConverter.cs
/// </summary>
internal sealed class TinyRichTextEditorBlockDataConverter : BlockEditorDataConverter
{
    public TinyRichTextEditorBlockDataConverter()
        : base(Constants.PropertyEditors.Aliases.TinyMceUmbracoPremiumRte)
    {
    }

    protected override IEnumerable<ContentAndSettingsReference>? GetBlockReferences(JToken jsonLayout)
    {
        IEnumerable<RichTextBlockLayoutItem>? blockListLayout = jsonLayout.ToObject<IEnumerable<RichTextBlockLayoutItem>>();
        return blockListLayout?.Select(x => new ContentAndSettingsReference(x.ContentUdi, x.SettingsUdi)).ToList();
    }
}