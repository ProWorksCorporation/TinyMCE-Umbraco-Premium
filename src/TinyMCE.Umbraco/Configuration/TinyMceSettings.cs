namespace TinyMCE.Umbraco;

public class TinyMceSettings
{
    public string apikey { get; set; } = "";

    public string openAiApikey { get; set; } = "";

    public string[] pluginsToExclude { get; set; } = [];

    public Dictionary<string, object> customConfig { get; set; } = new Dictionary<string, object>();
}
