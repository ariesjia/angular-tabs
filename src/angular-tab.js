'use strict';

angular.module('quark.tab.module', [])
    .constant("quarkTabConfig", {
        locationType: ["url", "path", "hash", "search"],
        defaultSearchName: 'tab'
    })
    .factory('location', [
        '$location',
        '$route',
        '$rootScope',
        function ($location, $route, $rootScope) {
            $location.skipReload = function () {
                var lastRoute = $route.current;
                var un = $rootScope.$on('$locationChangeSuccess', function () {
                    $route.current = lastRoute;
                    un();
                });
                return $location;
            };
            return $location;
        }
    ])
    .directive('quarkTabSet', function () {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            templateUrl: 'src/tab-set.html',
            controller: ['$scope', 'quarkTabConfig', '$timeout', '$filter', '$attrs', '$parse', function ($scope, quarkTabConfig, $timeout, $filter, $attrs, $parse) {

                var self = this,
                    tabs = [],
                    getLocationType = function () {
                        var tabLocationType = ($attrs.tabLocationType || '').split(':'),
                            type = (tabLocationType[0]).toLowerCase();

                        if (type === quarkTabConfig.locationType[3]) {
                            self.tabSearchName = tabLocationType.length > 1 ? tabLocationType[1] : quarkTabConfig.defaultSearchName;
                        }
                        return quarkTabConfig.locationType.indexOf(type) >= 0 ? type : 'path';
                    };

                var parseFuction = function (funKey) {
                        if ($attrs[funKey]) {
                            var func = $parse($attrs[funKey]);
                            return function (args) {
                                return func($scope, args);
                            };
                        }
                        return null;
                    },
                    tabChange = parseFuction("tabChange");

                $scope.quarkTabSetTemplateUrl = '';

                self.tabSkipReload = $parse($attrs.tabSkipReload)($scope);

                self.tabLocationType = getLocationType();

                self.selectTab = function (tab) {
                    if (tab.selected) {
                        return true;
                    }
                    angular.forEach(tabs, function (tab) {
                        tab.selected = false;
                    });
                    tab.selected = true;

                    if(tabChange){
                        tabChange({
                            "tab" : tab
                        });
                    }

                    this.setTabUrl(tab.templateUrl);
                };

                self.setTabUrl = function (templateUrl) {
                    $scope.quarkTabSetTemplateUrl = templateUrl;
                };

                self.addTab = function (tab) {
                    tabs.push(tab);
                };

                $timeout(function () {
                    var seletedTab = $filter('filter')(tabs, {'selected': true}),
                        tabInitActive = $parse($attrs.tabInitActive)($scope) || 0;

                    if (!seletedTab.length && angular.isNumber(tabInitActive) && tabInitActive < tabs.length) {
                        tabs[tabInitActive].select();
                    }
                });

            }]
        };
    })
    .directive('quarkTab', ['location', function (location) {
        return {
            restrict: 'EA',
            replace: true,
            require: '^quarkTabSet',
            scope: {
                templateUrl: '@',
                tabMatch: '@',
                tabHref: '@'
            },
            transclude: true,
            templateUrl: 'src/tab.html',
            link: function (scope, element, attrs, tabSetController) {

                var locationMethod = tabSetController.tabLocationType,
                    locationFunc = function (value) {
                        if (locationMethod === 'search') {
                            if (value) {
                                return location[locationMethod](tabSetController.tabSearchName, value);
                            } else {
                                return location[locationMethod]()[tabSetController.tabSearchName];
                            }
                        }
                        return location[locationMethod](value)
                    },
                    curPath = locationFunc(),
                    href = (scope.tabMatch || scope.tabHref);

                tabSetController.addTab(scope);

                scope.select = function (path) {
                    var hrefPath = path || scope.tabHref;
                    tabSetController.selectTab(scope);

                    if (locationFunc() != hrefPath && !!scope.tabHref) {
                        if (!path && tabSetController.tabSkipReload) {
                            location.skipReload();
                        }
                        locationFunc(hrefPath).replace();
                    }

                };

                if (href && (new RegExp(href)).test(curPath)) {
                    scope.select(curPath);
                }

            }
        };
    }]);

