'use strict';

angular.module('quarkTabApp')
    .controller('HashTabCtrl', ["$scope", "count", "clearLocation", function ($scope, count, clearLocation) {

        $scope.count = count.setId("hash").add().get();

        clearLocation.search();

    }]);
