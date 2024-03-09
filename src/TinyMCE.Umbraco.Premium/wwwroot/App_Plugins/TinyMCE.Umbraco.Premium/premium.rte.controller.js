angular.module("umbraco")
    .controller("TinyMce.Umbraco.Premium.PropertyEditors.RTEController",
        function ($scope, $q, assetsService, $timeout, tinyMceService, angularHelper, tinyMceAssets, $element) {

            // Copied and modified from the Umbraco rte.controller.js

            var unsubscribe = [];
            $scope.isLoading = true;

            //To id the html textarea we need to use the datetime ticks because we can have multiple rte's per a single property alias
            // because now we have to support having 2x (maybe more at some stage) content editors being displayed at once. This is because
            // we have this mini content editor panel that can be launched with MNTP.
            $scope.textAreaHtmlId = $scope.model.alias + "_" + String.CreateGuid();

            var editorConfig = $scope.model.config ? $scope.model.config.editor : null;
            if (!editorConfig || Utilities.isString(editorConfig)) {
                editorConfig = tinyMceService.defaultPrevalues();
            }

            var width = editorConfig.dimensions ? parseInt(editorConfig.dimensions.width, 10) || null : null;
            var height = editorConfig.dimensions ? parseInt(editorConfig.dimensions.height, 10) || null : null;

            $scope.containerWidth = "auto";
            $scope.containerHeight = "auto";
            $scope.containerOverflow = "inherit";

            var promises = [];

            // we need to make sure that the element is initialized before we can init TinyMCE, because we find the placeholder by ID, so it needs to be appended to document before.
            var initPromise = $q((resolve, reject) => {
                this.$onInit = resolve;
            });

            promises.push(initPromise);

            //queue file loading
            tinyMceAssets.forEach(function (tinyJsAsset) {
                promises.push(assetsService.loadJs(tinyJsAsset, $scope));
            });

            //stores a reference to the editor
            var tinyMceEditor = null;

            promises.push(tinyMceService.getTinyMceEditorConfig({
                htmlId: $scope.textAreaHtmlId,
                stylesheets: editorConfig.stylesheets,
                toolbar: editorConfig.toolbar,
                mode: editorConfig.mode
            }));

            //wait for queue to end
            $q.all(promises).then(function (result) {

                var standardConfig = result[promises.length - 1];
                var standardConfigKeys = _.keys(standardConfig);

                // Override with prevalue custom config if present
                if (editorConfig.customConfig) {
                    Utilities.extend(standardConfig, editorConfig.customConfig);
                }

                // Override with prevalue plugins if present
                if (editorConfig.plugins) {
                    standardConfig.plugins = _.union(standardConfig.plugins, editorConfig.plugins);
                    _.each(editorConfig.pluginsToExclude, function (alias) {
                        standardConfig.plugins = _.without(standardConfig.plugins, alias);
                    });
                }

                ///////////////////
                // Insert custom config for each plugin with default configuration so something shows up after adding it
                if (standardConfig.plugins.indexOf("advtemplate")) {
                    if (_.indexOf(standardConfigKeys, "advtemplate_templates") < 0) {
                        if (window.tinymcepremium.Config.advtemplate_templates != null) {
                            Utilities.extend(standardConfig, window.tinymcepremium.Config.advtemplate_templates);
                        }
                    }
                }
                if (standardConfig.plugins.indexOf("mergetags")) {
                    if (_.indexOf(standardConfigKeys, "mergetags_list") < 0) {
                        if (window.tinymcepremium.Config.mergetags_list != null) {
                            Utilities.extend(standardConfig, window.tinymcepremium.Config.mergetags_list);
                        }
                    }
                }
                if (standardConfig.plugins.indexOf("powerpaste")) {
                    // remove the "paste" plugin per TinyMCE docs
                    standardConfig.plugins = _.without(standardConfig.plugins, "paste");
                }
                if (standardConfig.plugins.indexOf("editimage")) {
                    // add the  the "image" plugin per TinyMCE docs
                    standardConfig.plugins = _.union(standardConfig.plugins,["image"]);
                }
                if (standardConfig.plugins.indexOf("mediaembed")) {
                    // add the "media" plugin per TinyMCE docs
                    standardConfig.plugins = _.union(standardConfig.plugins, ["media"]);
                }
                ///////////////////

                if (height !== null) {
                    standardConfig.plugins.splice(standardConfig.plugins.indexOf("autoresize"), 1);
                }

                //create a baseline Config to extend upon
                var baseLineConfigObj = {
                    maxImageSize: editorConfig.maxImageSize,
                    width: width,
                    height: height
                };

                baseLineConfigObj.setup = function (editor) {

                    //set the reference
                    tinyMceEditor = editor;

                    tinyMceEditor.on('init', function (e) {
                        $timeout(function () {
                            $scope.isLoading = false;
                        });
                    });
                    tinyMceEditor.on("focus", function () {
                        $element[0].dispatchEvent(new CustomEvent('umb-rte-focus', { composed: true, bubbles: true }));
                    });
                    tinyMceEditor.on("blur", function () {
                        $element[0].dispatchEvent(new CustomEvent('umb-rte-blur', { composed: true, bubbles: true }));
                    });

                    //initialize the standard editor functionality for Umbraco
                    tinyMceService.initializeEditor({
                        editor: editor,
                        toolbar: editorConfig.toolbar,
                        model: $scope.model,
                        currentFormInput: $scope.rteForm.modelValue
                    });

                };

                Utilities.extend(baseLineConfigObj, standardConfig);

                // Readonly mode
                baseLineConfigObj.toolbar = $scope.readonly ? false : baseLineConfigObj.toolbar;
                baseLineConfigObj.readonly = $scope.readonly ? 1 : baseLineConfigObj.readonly;

                // We need to wait for DOM to have rendered before we can find the element by ID.
                $timeout(function () {
                    tinymce.init(baseLineConfigObj);
                }, 150);

                //listen for formSubmitting event (the result is callback used to remove the event subscription)
                unsubscribe.push($scope.$on("formSubmitting", function () {
                    if (tinyMceEditor !== undefined && tinyMceEditor != null && !$scope.isLoading) {
                        $scope.model.value = tinyMceEditor.getContent();
                    }
                }));

                $scope.focus = function () {
                    tinyMceEditor.focus();
                }

                //when the element is disposed we need to unsubscribe!
                // NOTE: this is very important otherwise if this is part of a modal, the listener still exists because the dom
                // element might still be there even after the modal has been hidden.
                $scope.$on('$destroy', function () {
                    for (var i = 0; i < unsubscribe.length; i++) {
                        unsubscribe[i]();
                    }
                    if (tinyMceEditor !== undefined && tinyMceEditor != null) {
                        if ($element) {
                            $element[0]?.dispatchEvent(new CustomEvent('blur', { composed: true, bubbles: true }));
                        }
                        tinyMceEditor.destroy()
                    }
                });

            });

        });
