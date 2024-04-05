# TinyMCE Premium package for Umbraco CMS project
This is an [Umbraco CMS](https://umbraco.com/) package that enables the TinyMCE-based Rich Text Editor (RTE) in Umbraco versions 12+ to be licensed to access the paid Premium features in TinyMCE.  In addition, it adds a new TinyMCE Premium property editor which additional settings that allows for a more targeted configuration setup for RTE Data Types in Umbraco.  Finally, it adds additional configuration that supports JSON directly in the configuration for .Net (appsettings.config).

The TinyMCE Umbraco Premium package Works with Umbraco Versions 12, and 13

## Releases

Avvailable via the [Releases page](https://github.com/ProWorksCorporation/TinyMCE-Umbraco-Premium/releases)

## Installation:

* v12.x Supports Umbraco CMS version 12+
* v13.x Supports Umbraco CMS version 13+

The recommended installation is via [Nuget](https://www.nuget.org/packages/tinymce.umbraco.premium/)

### Nuget Package Repository

To install from the [Nuget Package Repository](https://www.nuget.org/packages/tinymce.umbraco.premium/) you can run the following from the command line:

    dotnet add package tinymce.umbraco.premium

In addtion, you can install packages via the Visual Studio Nuget Package Manager.  This can be found in the Tools menu of Visual Studio.

# Documentation

To get started with the TinyMCE Umbraco Premium property editor and use it with your projects, you wil need to add some basic configuration and may choose create a new Data Type for the TinyMCE Premium Rich Text Editor.

## Configuration

The following options are available for configuration in the appsettings.config or through other environment level configuration settings (web.config, Azure environment variables, etc).  This is using standard .Net configuration and you can learn more about [.Net Configuration here](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-8.0).

    {
        "TinyMceConfig": {
            "apikey": "STRING",
            "openAiApikey": "STRING",
            "pluginsToExclude": ["STRING LIST"],
            "customConfig": {JSON}
        }
    }

The details on each configuration value are described below:

| Setting     | Values      |Default  | Note |
| ----------- | ----------- |---------|------|
| apikey      | key string  | None    | The TinyMCE API Key found in [your account](https://www.tiny.cloud/my-account/integrate/#html).  Works for both the Umbraco Rich Text Editor and the TinyMCE Premium Rich Text Editor. |
| openAiApikey | key string | None    | The ChatGPT API Key found in [your account](https://platform.openai.com/api-keys). Only used by the TinyMCE Premium Rich Text Editor. |
| pluginsToExclude | Array of TinyMCE plugins names to exclude | [] | This excludes these plugins from being selected or used by the Umbraco Rich Text Editor or the TinyMCE Premium Rich Text Editor |
| customConfig | JSON TinyMCE Configuration | {} | See the [Tiny Documentation](https://www.tiny.cloud/docs/tinymce/6/plugins/) for the plugin configuration.  Only used by the TinyMCE Premium Rich Text Editor. | 
 
## Data Types

### Umbraco's Rich Text Editor

The Umbraco CMS has TinyMCE Core installed by default to support its Rich Text Editor property editor.  This package extends the out-of-the-box Rich Text Editor to allow for Premuim TinyMCE packages to be enabled.  

If the configuration has a valid Tiny apiKey set, then the following additional packages are available to the base Umbraco Rich Text Editor:

#### Open Source Plugins
* Accordion (accordion)
* Code Sample (codesample)
* Emoticons (emoticons)
* Help for Editors (help)
* Insert Date/Time (insertdatetime)
* Search and Replace (searchreplace)
* Word Count (wordcount)

#### Premium Plugins
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

Most of these have a Command / Toolbar associated with them and are disabled by default.  To enable them, go to the Data Type in the Settings section of Umbraco to edit the toolbars available.  The default datatype is called "Richtext editor" on initial install and setup of Umbraco.

### TinyMCE Premium Rich Text Editor

This package includes a new Umbraco Property Editor that can but used to access some of the additional TinyMCE packages that may require more configuration to be used effectively.  

In addition to the packages listed above, below are the additions TinyMCE Packages that are available via the TinyMCE Premium Rich Text Editor:

#### Premium Plugins
* Advanced Code Editor (advcode)
* Advanced Table Editor (advtable)
* Advanced Templates (advtemplate)
* AI Assistant Shortcuts (ai)
* Enhanced Media Embed (mediaembed)
* Link Checker (linkchecker)
* PowerPaste (powerpaste)
* Spelling Autocorrect (autocorrect)

#### Usage / Setup
In order to use the TinyMCE Premium Rich Text Editor, you will need to create at least one Umbraco Data Type that uses this property editor.  Learn more about Umbraco Data Types and how to create them in the [Umbraco Documentation here](https://docs.umbraco.com/umbraco-cms/fundamentals/data/data-types).

#### Additional Features

The TinyMCE Premium Rich Text property editor adds a few new configuration options for each Data Type that you create:

1. Plugin Selection: Similar to the Toolbar items, you can select which Plugins are enabled / available for this Data Type.
2. CustomConfig: Each Data Type that implements this editor has its own TinyMCE Configuration JSON that can be used for a custom configuration specific to this Data Type.

Both of these new Data Type configuration options are managed via the Data Type editing interface in the back-office of Umbraco.

# Support

If you have questions about TinyMCE Plugins, please contact TinyMCE Support directly.

If something specific to the Property Editors in this package or the Configuration isn't working as you would expect, please submit a question via the [Github Issues](https://github.com/ProWorksCorporation/TinyMCE-Umbraco-Premium/issues) for this project.  We will do our best to monitor and respond, but please be patient with us.

In addition, you may find that the community is very helpful and you can ask questions of them on the [Umbraco Forums](https://our.umbraco.com/) or the [Umbraco Discord Server](https://community.umbraco.com/get-involved/community-discord-server/).

# Contributions

If you are interested in contributing, please create an issue and I will reach out.

# Acknowledgements

## Developers

* Jason Prothero, [ProWorks Corporation](https://www.proworks.com) - ([X / Twitter](https://twitter.com/protherj))

## Special thanks

Thank you to [ProWorks Corporation](https://www.proworks.com) and the ProWorks Team, [Tiny](https://www.tiny.cloud/), and [Umbraco](https://umbraco.com/) for helping with resources, testing, feedback, time, and advice when needed.