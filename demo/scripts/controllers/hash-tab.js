'use strict';

angular.module('quarkTabApp')
    .controller('HashTabCtrl', ["$scope","count", function ($scope,count) {

            $scope.count = count.setId("hash").add().get();

    }]);
