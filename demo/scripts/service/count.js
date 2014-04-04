'use strict';

angular.module('quarkTabApp')
    .service('count',function(){

        var count = 0;

        this.get = function(){
            return count;
        }
        this.add = function(){
            count ++;
            return this;
        }

    });
