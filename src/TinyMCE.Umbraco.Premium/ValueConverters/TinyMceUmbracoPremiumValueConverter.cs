using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core.Blocks;
using Umbraco.Cms.Core.Configuration.Models;
using Umbraco.Cms.Core.DeliveryApi;
using Umbraco.Cms.Core.Macros;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core.PropertyEditors.ValueConverters;
using Umbraco.Cms.Core.Serialization;
using Umbraco.Cms.Core.Strings;
using Umbraco.Cms.Core.Templates;
using Umbraco.Cms.Core.Web;

namespace TinyMCE.UmbracoCms.Premium.ValueConverters
{
	/// <summary>
	///     Value converter for the TinyMCE Umbraco Premium RTE so that it always returns IHtmlString so that Html.Raw doesn't have to be used.
	///     
	///		NOTE: extending the normal RTE ValueConverter so that locallinks and other key items are converted.
	/// </summary>
	public class TinyMceUmbracoPremiumValueConverter : RteMacroRenderingValueConverter, IPropertyValueConverter
	{
		public TinyMceUmbracoPremiumValueConverter(IUmbracoContextAccessor umbracoContextAccessor, IMacroRenderer macroRenderer,
		HtmlLocalLinkParser linkParser, HtmlUrlParser urlParser, HtmlImageSourceParser imageSourceParser,
		IApiRichTextElementParser apiRichTextElementParser, IApiRichTextMarkupParser apiRichTextMarkupParser,
		IPartialViewBlockEngine partialViewBlockEngine, BlockEditorConverter blockEditorConverter, IJsonSerializer jsonSerializer,
		IApiElementBuilder apiElementBuilder, RichTextBlockPropertyValueConstructorCache constructorCache, ILogger<RteMacroRenderingValueConverter> logger,
		IOptionsMonitor<DeliveryApiSettings> deliveryApiSettingsMonitor) 
			: base(umbracoContextAccessor, macroRenderer, linkParser, urlParser, imageSourceParser, apiRichTextElementParser, apiRichTextMarkupParser,
				  partialViewBlockEngine, blockEditorConverter, jsonSerializer, apiElementBuilder, constructorCache, logger, deliveryApiSettingsMonitor)
		{
		}

		public override bool IsConverter(IPublishedPropertyType propertyType)
			=> propertyType.EditorAlias == Constants.PropertyEditors.Aliases.TinyMceUmbracoPremiumRte;


		public override object? ConvertSourceToIntermediate(IPublishedElement owner, IPublishedPropertyType propertyType, object? source, bool preview)
		{
			return base.ConvertSourceToIntermediate(owner, propertyType, source, preview);	
		}
	}
}
