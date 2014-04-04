'use strict';

angular.module('quarkTabApp')
    .controller('UrlTabCtrl', ["$scope","count","clearLocation", function ($scope,count,clearLocation){

        $scope.count = count.setId("url").add().get();

        clearLocation.hash().search();

    }]);
