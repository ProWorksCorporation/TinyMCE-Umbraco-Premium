using Microsoft.Extensions.Options;
using Umbraco.Cms.Core.Configuration.Models;
using Umbraco.Cms.Core.DeliveryApi;
using Umbraco.Cms.Core.Macros;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core.PropertyEditors.ValueConverters;
using Umbraco.Cms.Core.Strings;
using Umbraco.Cms.Core.Templates;
using Umbraco.Cms.Core.Web;

namespace TinyMCE.Umbraco.Premium.ValueConverters
{
	/// <summary>
	///     Value converter for the TinyMCE Umbraco Premium RTE so that it always returns IHtmlString so that Html.Raw doesn't have to be used.
	///     
	///		NOTE: extending the normal RTE ValueConverter so that locallinks and other key items are converted.
	/// </summary>
	public class TinyMceUmbracoPremiumValueConverter : RteMacroRenderingValueConverter
	{
		public TinyMceUmbracoPremiumValueConverter(IUmbracoContextAccessor umbracoContextAccessor, IMacroRenderer macroRenderer,
		HtmlLocalLinkParser linkParser, HtmlUrlParser urlParser, HtmlImageSourceParser imageSourceParser,
		IApiRichTextElementParser apiRichTextElementParser, IApiRichTextMarkupParser apiRichTextMarkupParser, IOptionsMonitor<DeliveryApiSettings> deliveryApiSettingsMonitor) 
			: base(umbracoContextAccessor, macroRenderer, linkParser, urlParser, imageSourceParser, apiRichTextElementParser, apiRichTextMarkupParser, deliveryApiSettingsMonitor)
		{
		}

		public override bool IsConverter(IPublishedPropertyType propertyType)
			=> propertyType.EditorAlias == Constants.PropertyEditors.Aliases.TinyMceUmbracoPremiumRte;
	}
}
