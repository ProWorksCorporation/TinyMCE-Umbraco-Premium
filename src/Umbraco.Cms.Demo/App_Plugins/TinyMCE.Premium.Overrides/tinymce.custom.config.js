!(function () {

    function init() {

        window.tinymcepremium.Config.custom_user_config = {
            mentions_fetch: (query, success) => {
                // Fetch your full user list from the server and cache locally
                var users = [
                    {
                        id: "1",
                        name: 'John Smith'
                    },
                    {
                        id: "2",
                        name: 'Joe Cool'
                    },
                    {
                        id: "3",
                        name: 'Zander Geulph'
                    }

                ];

                // query.term is the text the user typed after the '@'
                var filteredUsers = _.filter(users, function (user) {
                    return user.name.toLowerCase().indexOf(query.term.toLowerCase()) !== -1;
                });

                filteredUsers = filteredUsers.slice(0, 10);

                // Where the user object must contain the properties `id` and `name`
                // but you could additionally include anything else you deem useful.
                success(filteredUsers);

            }//,
            //advtemplate_list: () => new Promise((resolve, reject) => {
            //    setTimeout(() => {
            //        console.log("promise worked");
            //        resolve([{
            //            id: '1',
            //            title: 'Resolving tickets (promise)'
            //        },
            //        {
            //            id: '2',
            //            title: 'Quick replies (promise)',
            //            items: [{
            //                id: '3',
            //                title: 'Message received (promise)',
            //            },
            //            {
            //                id: '4',
            //                title: 'Progress update (promise)',
            //            }
            //            ]
            //        }
            //        ]);
            //    }, 300);
            //})
        };
    }

    /**
     * Initialize after the app.ready event where we have access 
     * to the Umbraco.Sys.ServerVariables variables as well as any AngularJS services.
     */
    angular.module("umbraco").run(function ($rootScope) {
        $rootScope.$on('app.ready', init)
    })

})()