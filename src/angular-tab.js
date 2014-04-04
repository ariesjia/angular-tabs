'use strict';

angular.module('quark.tab.module', [])
    .constant("quarkTabConfig", {

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
            scope: {
                tabSkipReload: "=",
                tabLocationType: '@'
            },
            controller: ['$scope', function ($scope) {

                $scope.templateUrl = '';

                var tabs = $scope.tabs = [];

                this.tabSkipReload = $scope.tabSkipReload;
                this.tabLocationType = $scope.tabLocationType;

                this.selectTab = function (tab) {
                    if (tab.selected) {
                        return true;
                    }
                    angular.forEach(tabs, function (tab) {
                        tab.selected = false;
                    });
                    tab.selected = true;
                    this.setTabUrl(tab.templateUrl);
                };

                this.setTabUrl = function (templateUrl) {
                    $scope.templateUrl = templateUrl;
                };

                this.addTab = function (tab) {
                    tabs.push(tab);
                };
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

                var locationMethod = tabSetController.tabLocationType || 'path',
                    locationFunc = function (value) {
                        return location[locationMethod](value)
                    },
                    curPath = locationFunc(),
                    regExp = new RegExp(scope.tabMatch);


                tabSetController.addTab(scope);

                scope.select = function (path) {
                    var hrefPath = path || scope.tabHref;
                    tabSetController.selectTab(scope);

                    if(locationFunc() != hrefPath){

                        if (!path && tabSetController.tabSkipReload) {
                            location.skipReload();
                        }

                        locationFunc(hrefPath).replace();
                    }
                };

                if (regExp.test(curPath)) {
                    scope.select(curPath);
                }

            }
        };
    }]);

