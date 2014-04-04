'use strict';

angular.module('quarkTabApp')
    .service('clearLocation', ["$location", function ($location) {

        this.hash = function () {
            if ($location.hash()) {
                $location.hash("");
            }
            return this;
        };

        this.search = function(searchName){

            var searchList = $location.search();

            if(searchName && searchList[searchName]){
                $location.search(searchName,null);
            }else{
                angular.forEach(searchList,function(value,name){
                    $location.search(name,null);
                });
            }

            return this;
        }

    }]);
