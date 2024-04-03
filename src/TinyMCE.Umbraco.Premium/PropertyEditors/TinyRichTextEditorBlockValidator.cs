using Microsoft.Extensions.Logging;
using TinyMCE.Umbraco.Premium.PropertyEditors;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models.Blocks;
using Umbraco.Cms.Core.Serialization;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.PropertyEditors;

using static Umbraco.Cms.Core.PropertyEditors.ComplexEditorValidator;

namespace TinyMCE.Umbraco.Premium.PropertyEditors;

/// <summary>
/// Based on Umbraco-CMS\src\Umbraco.Infrastructure\PropertyEditors\RichTextEditorBlockValidator.cs
/// </summary>
internal class TinyRichTextEditorBlockValidator : TinyBlockEditorValidatorBase
{
    private readonly TinyBlockEditorValues _blockEditorValues;
    private readonly IJsonSerializer _jsonSerializer;
    private readonly ILogger _logger;

    public TinyRichTextEditorBlockValidator(
        IPropertyValidationService propertyValidationService,
        TinyBlockEditorValues blockEditorValues,
        IContentTypeService contentTypeService,
        IJsonSerializer jsonSerializer,
        ILogger logger)
        : base(propertyValidationService, contentTypeService)
    {
        _blockEditorValues = blockEditorValues;
        _jsonSerializer = jsonSerializer;
        _logger = logger;
    }

    protected override IEnumerable<ElementTypeValidationModel> GetElementTypeValidation(object? value)
    {
        RichTextPropertyEditorHelper.TryParseRichTextEditorValue(value, _jsonSerializer, _logger, out RichTextEditorValue? richTextEditorValue);
        if (richTextEditorValue?.Blocks is null)
        {
            return Array.Empty<ElementTypeValidationModel>();
        }

        BlockEditorData? blockEditorData = _blockEditorValues.ConvertAndClean(richTextEditorValue.Blocks);
        return blockEditorData is not null
            ? GetBlockEditorDataValidation(blockEditorData)
            : Array.Empty<ElementTypeValidationModel>();
    }
}
