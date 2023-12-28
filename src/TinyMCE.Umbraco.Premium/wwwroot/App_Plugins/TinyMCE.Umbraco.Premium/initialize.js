!(function () {
    //console.log('Hello')

    /** 
     * Initialize after the app.ready event where we have access 
     * to the Umbraco.Sys.ServerVariables variables as well as any AngularJS services.
     */
    function init() {
        const plugins = document.createElement('script')
        plugins.referrerPolicy = 'origin'

        //console.log(Umbraco.Sys.ServerVariables.tinymce.apiKey)

        // Compose the URL to the TinyMCE plugins.min.js file using the Umbraco.Sys.ServerVariables.tinymce.apiKey variable. 
        plugins.src = 'https://cdn.tiny.cloud/1/' + Umbraco.Sys.ServerVariables.tinymce.apiKey + '/tinymce/' + tinymce.majorVersion + '.' + tinymce.minorVersion + '/plugins.min.js'

        document.head.appendChild(plugins)
    }

    /**
     * Listen for the app.ready event by using the $rootScope in a simple AngularJS module. 
    */
    angular.module("umbraco").run(function ($rootScope) {
        $rootScope.$on('app.ready', init)
    })
})()