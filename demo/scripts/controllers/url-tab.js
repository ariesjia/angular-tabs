'use strict';

angular.module('quarkTabApp')
    .controller('UrlTabCtrl', ["$scope","count", function ($scope,count) {

        $scope.count = count.add().get();

    }]);
