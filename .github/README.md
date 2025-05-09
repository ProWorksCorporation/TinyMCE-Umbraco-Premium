## TinyMCE for Umbraco CMS

[![Downloads](https://img.shields.io/nuget/dt/TinyMCE.Umbraco?color=cc9900)](https://www.nuget.org/packages/TinyMCE.Umbraco/)
[![NuGet](https://img.shields.io/nuget/vpre/TinyMCE.Umbraco?color=0273B3)](https://www.nuget.org/packages/TinyMCE.Umbraco)
[![GitHub license](https://img.shields.io/github/license/ProWorksCorporation/TinyMCE-Umbraco?color=8AB803)](../LICENSE)

This package brings the [TinyMCE](https://www.tiny.cloud/) Rich Text Editor (RTE) back to [Umbraco CMS](https://umbraco.com/), (version 16+).

It also supports the use of TinyMCE Premium plugins with a valid subscription. Additional features include streamlined configuration for RTE Data Types in Umbraco and enhanced settings that support direct JSON-based configuration via .NET (appsettings.config).

## Releases

Available via the [Releases page](https://github.com/ProWorksCorporation/TinyMCE-Umbraco/releases)


### Installation

To [install from NuGet](https://www.nuget.org/packages/TinyMCE.Umbraco), you can run the following command from the `dotnet` CLI:

    dotnet add package TinyMCE.Umbraco

In addtion, you can install packages via the Visual Studio Nuget Package Manager.  This can be found in the Tools menu of Visual Studio.

### Upgrading from v15

If you are upgrading from Umbraco version 15, install this package before beginning the migration / upgrade process to version 16.  If installed before the upgrade migration, this package will prevent the conversion to the TipTap editor and keep the TinyMCE RTE in place.

# Documentation

To get started with the TinyMCE Umbraco property editor and use it with your projects, you will need to add some basic configuration and may choose to create a new Data Type for the TinyMCE Rich Text Editor.

## Configuration

The following options are available for configuration in the appsettings.config or through other environment level configuration settings (web.config, Azure environment variables, etc).  This is using standard .Net configuration and you can learn more about [.Net Configuration here](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-8.0).

    {
        "TinyMceConfig": {
            "tinyMceUrl": STRING,
            "tinyMceVersion": STRING
            "apikey": "STRING",
            "openAiApikey": "STRING",
            "pluginsToExclude": ["STRING LIST"],
            "customConfig": {JSON}
        }
    }

The details on each configuration value are described below:

| Setting     | Values      |Default  | Note |
| ----------- | ----------- |---------|------|
| tinyMceUrl  | key string  | None    | The URL location of the TinyMCE library. This allows for specific cloud URL access or self-hosted options. |
| tinyMceVersion  | key string  | 6    | The version of the TinyMCE library. |
| apikey      | key string  | None    | The TinyMCE API Key found in [your account](https://www.tiny.cloud/my-account/integrate/#html). If applied, this will load the TinyMCE library from the Tiny Cloud URL unless the "tinyMceUrl" is specified. |
| openAiApikey | key string | None    | The ChatGPT API Key found in [your account](https://platform.openai.com/api-keys). This will enable a default implementation of the AI functionality using ChatGPT. |
| pluginsToExclude | Array of TinyMCE plugins names to exclude | [] | This excludes these plugins from being selected or used by the TinyMCE Rich Text Editor |
| customConfig | JSON TinyMCE Configuration | {} | See the [Tiny Documentation](https://www.tiny.cloud/docs/tinymce/6/plugins/) for the plugin configuration. | 


## Data Types

### Rich Text Editor

#### Open Source Plugins

The following plugins are available to add to the default RTE editor tools:

* Accordion (accordion)
* Code Sample (codesample)
* Emoticons (emoticons)
* Help for Editors (help)
* Insert Date/Time (insertdatetime)
* Search and Replace (searchreplace)
* Word Count (wordcount)

#### Premium Plugins

If the configuration has a valid Tiny apiKey set, then the following additional packages are available to the base Umbraco Rich Text Editor:

* Accessibility Checker (a11ychecker)
* Advanced Typography (typography)
* Case Change (casechange)
* Checklist (checklist)
* Export (export)
* Footnotes (footnotes)
* Format Painter (formatpainter)
* Merge Tags (mergetags)
* Page Embed (pageembed)
* Permanent Pen (permanentpen)
* Spell Checker Pro (tinymcespellchecker)
* Table of Contents (tableofcontents)

Most of these have a Command / Toolbar associated with them and are disabled by default.  To enable them, go to the Data Type in the Settings section of Umbraco to edit the toolbars available.

#### Additional Premium Plugins

This package can be used to access some of the additional TinyMCE packages that may require more configuration to be used effectively.  

In addition to the packages listed above, below are the additions TinyMCE Packages that are available via the TinyMCE Rich Text Editor:

* Advanced Code Editor (advcode)
* Advanced Table Editor (advtable)
* Advanced Templates (advtemplate)
* AI Assistant Shortcuts (ai)
* Enhanced Media Embed (mediaembed)
* Link Checker (linkchecker)
* PowerPaste (powerpaste)
* Spelling Autocorrect (autocorrect)

#### Usage / Setup
In order to use the TinyMCE Rich Text Editor, you will need to create at least one Umbraco Data Type that uses this property editor.  Learn more about Umbraco Data Types and how to create them in the [Umbraco Documentation here](https://docs.umbraco.com/umbraco-cms/fundamentals/data/data-types).

#### Additional Features

The TinyMCE Rich Text property editor adds a few new configuration options (from the v15 TinyMCE Property Editor) for each Data Type that you create:

1. Plugin Selection: Similar to the Toolbar items, you can select which plugins are enabled / available for this Data Type.
2. CustomConfig: Each Data Type that implements this editor has its own TinyMCE Configuration JSON that can be used for a custom configuration specific to this Data Type.

Both of these Data Type configuration options are managed via the Data Type editing interface in the back-office of Umbraco.


# Support and More

If you have questions about TinyMCE plugins, please contact TinyMCE Support directly.

If something specific to the Property Editors in this package or the Configuration isn't working as you would expect, please submit a question via the [Github Issues](https://github.com/ProWorksCorporation/TinyMCE-Umbraco/issues) for this project.  We will do our best to monitor and respond, but please be patient with us.

In addition, you may find that the community is very helpful and you can ask questions of them on the [Umbraco Forums](https://forum.umbraco.com/) or the [Umbraco Discord Server](https://community.umbraco.com/get-involved/community-discord-server/).


## Contributing

Contributions to this package are most welcome! Please read the [contributing guidelines](CONTRIBUTING.md).


## License

Copyright &copy; [ProWorks Corporation](https://proworks.com).

All source code is licensed under the [MIT License](../LICENSE).

The initial source code has been derived from [Umbraco CMS](https://github.com/umbraco/Umbraco-CMS), originally licensed under the MIT License.


## Acknowledgments

Thanks to [TinyMCE](https://www.tiny.cloud/) and [Umbraco](https://umbraco.com/) for their support during the package development.  Special thanks to Lee Kelleher and Jacob Overgaard for their help getting started and for giving valuable feedback along the way.
