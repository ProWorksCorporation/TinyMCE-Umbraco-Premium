import type { ManifestDashboard } from "@umbraco-cms/backoffice/extension-registry";

const dashboards: Array<ManifestDashboard> = [
    {
        type: 'dashboard',
        name: 'TinyMCE.Umbraco.Premium Dashboard',
        alias: 'TinyMCE.Umbraco.Premium.dashboard',
        elementName: 'tinymce_umbraco_premium-dashboard',
        js: ()=> import('./dashboard.element.js'),
        weight: -10,
        meta: {
            label: 'TinyMCE.Umbraco.Premium Dashboard',
            pathname: 'TinyMCE.Umbraco.Premium Dashboard'
        },
        conditions: [
            {
                alias: 'Umb.Condition.SectionAlias',
                match: 'Umb.Section.Settings'
            }
        ]
    }
]

export const manifests = [...dashboards];