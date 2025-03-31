using Microsoft.Extensions.DependencyInjection;
using TinyMCE.Umbraco.Api.Management;
using Umbraco.Cms.Api.Common.OpenApi;
using Umbraco.Cms.Core.Composing;
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

                // Once Umbraco 16 nightly has been updated, uncomment this code,
                // to disable the TinyMCE to Tiptap data-type migration. [LK]
                //.Configure<TinyMceToTiptapMigrationSettings>(settings =>
                //{
                //    settings.DisableMigration = true;
                //})
        ;
    }
}
