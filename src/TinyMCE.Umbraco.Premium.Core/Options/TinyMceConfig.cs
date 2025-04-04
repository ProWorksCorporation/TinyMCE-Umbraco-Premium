using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;

namespace TinyMCE.Umbraco.Premium.Options
{
	/// <summary>
	/// Custom configuration model used in the appSettings.config or anywhere the 
	/// environment variables are defined.
	/// </summary>
	public class TinyMceConfig
	{
		public string apikey { get; set; } = "";
		public string openAiApikey { get; set; } = "";
		public string[] pluginsToExclude { get; set; } = new string[] { };
		//public Dictionary<string, object> customConfig { get; set; } = new Dictionary<string, object>();
	}
}
