using Newtonsoft.Json.Linq;
using Umbraco.Cms.Core.Models.Blocks;

namespace TinyMCE.UmbracoCms.Premium.PropertyEditors;

/// <summary>
///     Data converter for blocks in the richtext property editor
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