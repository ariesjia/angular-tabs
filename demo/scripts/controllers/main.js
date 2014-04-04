'use strict';

angular.module('quarkTabApp')
    .controller('MainCtrl', ["$scope","clearLocation", function ($scope,clearLocation) {

        clearLocation.hash();

        clearLocation.search();

    }]);
