using Microsoft.Extensions.DependencyInjection;
using TinyMCE.Umbraco.Api.Management;
using Umbraco.Cms.Api.Common.OpenApi;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.Configuration.Models;
using Umbraco.Cms.Core.DependencyInjection;

namespace TinyMCE.Umbraco.Composing;

internal sealed class TinyMceComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder
            .Services
                .AddSingleton<IOperationIdHandler, TinyMceOperationIdHandler>()
                .ConfigureOptions<TinyMceConfigureSwaggerGenOptions>()
                .Configure<RichTextEditorSettings>(builder.Config.GetSection("Umbraco:CMS:RichTextEditor"))
                .Configure<TinyMceSettings>(builder.Config.GetSection("TinyMceConfig"))

                // NOTE: The follow line prevents the TinyMCE to Tiptap RTE migration in Umbraco v16.
                // https://github.com/umbraco/Umbraco-CMS/pull/18843
                .Configure<TinyMceToTiptapMigrationSettings>(settings => settings.DisableMigration = true)
        ;
    }
}
