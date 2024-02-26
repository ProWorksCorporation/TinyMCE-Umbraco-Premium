

namespace TinyMCE.Umbraco.Premium
{
	public static partial class Constants
	{
		/// <summary>
		///     Defines property editors constants.
		/// </summary>
		public static class PropertyEditors
		{
			/// <summary>
			///     Defines property editor aliases.
			/// </summary>
			public static class Aliases
			{
				/// <summary>
				///      TinyMCE Umbraco Premium RTE
				/// </summary>
				public const string TinyMceUmbracoPremiumRte = "TinyMCE.Umbraco.Premium.RTE";

			}
		}

		public static class Security
		{
			/// <summary>
			///     Gets the identifier of the 'super' user.
			///     NOTE: Copied from the Umbraco Source because we needed access and its internal:
			///			Contants-Security.cs in the Umbraco.Cms.Core
			/// </summary>
			public const int SuperUserId = -1;
		}
	}
}
