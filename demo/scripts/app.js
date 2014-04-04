'use strict';

angular.module('quarkTabApp', ['ngRoute', 'quark.tab'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'views/home.html',
                controller: "MainCtrl",
                reloadOnSearch : false
            })
            .when('/urltab/:tab', {
                templateUrl: 'views/url-tab.html',
                controller: "UrlTabCtrl",
                reloadOnSearch : false
            })
            .when('/hashtab', {
                templateUrl: 'views/hash-tab.html',
                controller: "HashTabCtrl",
                reloadOnSearch : false
            })
            .when('/searchtab', {
                templateUrl: 'views/search-tab.html',
                controller: "SearchTabCtrl",
                reloadOnSearch : false
            })
            .otherwise({
                redirectTo: '/home'
            });
    });
