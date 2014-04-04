'use strict';

angular.module('quarkTabApp')
    .service('count', function () {
        var obj = {},
            countId = null;

        this.setId = function (id) {
            if (!obj[id]) {
                obj[id] = 0;
            }
            countId = id;
            return this;
        };

        this.get = function () {
            if (!countId) {
                return null
            }
            return obj[countId];
        };

        this.add = function () {
            if (!countId) {
                return null
            }
            obj[countId]++;
            return this;
        };

    });
