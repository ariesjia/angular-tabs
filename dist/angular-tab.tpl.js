/**
 * angular-tab
 * @version v0.0.8 - 2014-04-06
 * @link https://github.com/ariesjia/angular-tab
 * @author Chenjia <ariesjia00@hotmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module("quark.tab", ["quark.tab.template","quark.tab.module"]);angular.module('quark.tab.template', ['src/tab-set.html', 'src/tab.html']);

angular.module("src/tab-set.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/tab-set.html",
    "<div class=\"md-quark-tab\">\n" +
    "    <ul class=\"tab-hd\" ng-transclude>\n" +
    "    </ul>\n" +
    "    <div class=\"tab-bd\" nf-if=\"tabNeedUrl\" ng-include=\"templateUrl\">\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("src/tab.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/tab.html",
    "<li ng-class=\"{active: selected}\">\n" +
    "    <a ng-click=\"select()\" ng-transclude></a>\n" +
    "</li>");
}]);

'use strict';

angular.module('quark.tab.module', [])
    .constant("quarkTabConfig", {
        locationType : ["url","path","hash","search"]
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
                tabInitActive : "=",
                tabLocationType: '@'
            },
            controller: ['$scope','quarkTabConfig','$timeout','$filter', function ($scope,quarkTabConfig,$timeout,$filter) {

                $scope.templateUrl = '';
                var self = this;

                var tabs = $scope.tabs = [];

                self.tabSkipReload = $scope.tabSkipReload;

                self.tabLocationType = getLocationType();

                function getLocationType() {
                    var tabLocationType = ($scope.tabLocationType || '').split(':');
                    var type = (tabLocationType[0]).toLowerCase();
                    if(type === quarkTabConfig.locationType[3]){
                        try{
                            self.tabSearchName = tabLocationType[1];
                        }catch(e){
                            console.error("[error]:use 'search' should set search name , eg : tab-location-type=\"search:tab\" ");
                        }
                    }
                    return quarkTabConfig.locationType.indexOf(type) >= 0 ? type : 'path';
                }

                self.selectTab = function (tab) {
                    if (tab.selected) {
                        return true;
                    }
                    angular.forEach(tabs, function (tab) {
                        tab.selected = false;
                    });
                    tab.selected = true;
                    this.setTabUrl(tab.templateUrl);
                };

                self.setTabUrl = function (templateUrl) {
                    $scope.templateUrl = templateUrl;
                };

                self.addTab = function (tab) {
                    tabs.push(tab);
                };

                $timeout(function(){
                    var seletedTab = $filter('filter')(tabs, {'selected': true});

                    if(!seletedTab.length && angular.isNumber($scope.tabInitActive) && $scope.tabInitActive < tabs.length){
                        tabs[$scope.tabInitActive].select();
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
                        if(locationMethod == 'search'){
                            if(value){
                                return location[locationMethod](tabSetController.tabSearchName,value);
                            }else{
                                return location[locationMethod]()[tabSetController.tabSearchName];
                            }
                        }
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

