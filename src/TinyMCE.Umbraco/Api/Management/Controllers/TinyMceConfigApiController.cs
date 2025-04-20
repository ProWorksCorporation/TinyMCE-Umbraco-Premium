using Asp.Versioning;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace TinyMCE.Umbraco.Api.Management;

[ApiExplorerSettings(GroupName = Constants.ProjectName)]
[ApiVersion("1.0")]
[TinyMceVersionedApiBackOfficeRoute("/")]
public sealed class TinyMceConfigApiController : TinyMceManagementApiControllerBase
{
    private readonly RichTextEditorSettings _richTextEditorSettings;
    private readonly TinyMceSettings _tinyMceSettings;

    public TinyMceConfigApiController(
        IOptions<RichTextEditorSettings> richTextEditorSettings,
        IOptions<TinyMceSettings> tinyMceSettings)
    {
        _richTextEditorSettings = richTextEditorSettings.Value;
        _tinyMceSettings = tinyMceSettings.Value;
    }

    [HttpGet("config", Name = "GetConfig")]
    [MapToApiVersion("1.0")]
    [ProducesResponseType(typeof(TinyMceConfigResponseModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    public IActionResult GetConfig()
    {
        var result = new TinyMceConfigResponseModel
        {
            RichTextEditor = this._richTextEditorSettings,
            Config = this._tinyMceSettings,
        };

        return Ok(result);
    }
}
