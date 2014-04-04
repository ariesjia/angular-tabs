'use strict';

angular.module('quarkTabApp')
    .controller('SearchTabCtrl', ["$scope","count","clearLocation", function ($scope,count,clearLocation){

        $scope.count = count.setId("search").add().get();

        clearLocation.hash();

    }]);
