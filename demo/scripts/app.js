'use strict';

angular.module('quarkTabApp', ['ngRoute', 'quark.tab'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'views/home.html',
                controller: "MainCtrl"
            })
            .when('/urltab/:tab', {
                templateUrl: 'views/url-tab.html',
                controller: "UrlTabCtrl"
            })
            .when('/hashtab', {
                templateUrl: 'views/hash-tab.html',
                controller: "HashTabCtrl",
                reloadOnSearch : false
            })
            .otherwise({
                redirectTo: '/home'
            });
    });
