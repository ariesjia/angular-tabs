'use strict';

describe('quark.tab unit test', function () {

    beforeEach(module('ngRoute'));
    beforeEach(module('quark.tab'));

    var $scope, $compile, elm, $location , $timeout;

    beforeEach(inject(function ($rootScope, _$compile_,_$location_,_$timeout_) {
        $scope = $rootScope.$new();
        $compile = _$compile_;
        $location = _$location_;
        $timeout = _$timeout_;
    }));

    describe('sfTabSet', function () {

        beforeEach(function () {
            var html = '<div><div quark-tab-set></div></div>';
            elm = $compile(angular.element(html))($scope).appendTo('body');
            $scope.$digest();
        });

        afterEach(function () {
            elm.remove();
        });

        it('should init sf-tab-set', function () {
            expect(elm.find(".tab-hd li").length).toEqual(0);
        });

    });

    describe('path location', function () {

        describe('default setting', function () {

            beforeEach(function () {

                var html = '<div><div quark-tab-set>' +
                    '<div quark-tab tab-href="a" template-url="">tab1</div>' +
                    '<div quark-tab tab-href="b" template-url="">tab2</div>' +
                    '<div quark-tab tab-href="c" template-url="">tab3</div>' +
                    '</div></div>';

                elm = $compile(angular.element(html))($scope).appendTo('body');
                $scope.$digest();
            });

            afterEach(function () {
                elm.remove();
            });

            it('should init sf-tab-set and sf-tab', function () {
                expect(elm.find(".tab-hd li").length).toEqual(3);
            });

            it('should active tab when initialize', function () {
                $timeout.flush();
                expect(elm.find(".tab-hd li.active").index()).toEqual(0);
            });

            it('should set active when click tab', function () {
                var firstTab = elm.find(".tab-hd li:eq(0)");
                firstTab.find("a").click();
                expect(firstTab.hasClass('active')).toBeTruthy();
                expect($location.path()).toEqual('/'+firstTab.attr('tab-href'));
            });

        });


        describe('test tab-init-active', function () {
            beforeEach(function () {
                var html = '<div><div quark-tab-set tab-init-active="1">' +
                    '<div quark-tab tab-href="a" template-url="">tab1</div>' +
                    '<div quark-tab tab-href="b" template-url="">tab2</div>' +
                    '<div quark-tab tab-href="c" template-url="">tab3</div>' +
                    '</div></div>';

                elm = $compile(angular.element(html))($scope).appendTo('body');
                $scope.$digest();
            });

            afterEach(function () {
                elm.remove();
            });

            it('should active tab-init-active index tab when initialize', function () {
                $timeout.flush();
                expect(elm.find(".tab-hd li.active").index()).toEqual(1);
            });
        });

        describe('test match location', function () {
            beforeEach(function () {
                $location.path('c');
                var html = '<div><div quark-tab-set>' +
                    '<div quark-tab tab-href="a" template-url="">tab1</div>' +
                    '<div quark-tab tab-href="b" template-url="">tab2</div>' +
                    '<div quark-tab tab-href="c" template-url="">tab3</div>' +
                    '</div></div>';

                elm = $compile(angular.element(html))($scope).appendTo('body');
                $scope.$digest();
            });
            afterEach(function () {
                elm.remove();
            });
            it('should active tab-init-active index tab when initialize', function () {
                $timeout.flush();
                expect(elm.find(".tab-hd li.active").index()).toEqual(2);
            });
        });

    });

    describe('hash location', function () {

        describe('default setting', function () {

            beforeEach(function () {
                var html = '<div><div quark-tab-set tab-location-type="HASH">' +
                    '<div quark-tab tab-href="a" template-url="">tab1</div>' +
                    '<div quark-tab tab-href="b" template-url="">tab2</div>' +
                    '<div quark-tab tab-href="c" template-url="">tab3</div>' +
                    '</div></div>';

                elm = $compile(angular.element(html))($scope).appendTo('body');
                $scope.$digest();
            });

            afterEach(function () {
                elm.remove();
            });

            it('should set active when click tab', function () {
                var firstTab = elm.find(".tab-hd li:eq(2)");
                firstTab.find("a").click();
                expect(firstTab.hasClass('active')).toBeTruthy();
                expect($location.hash()).toEqual(firstTab.attr('tab-href'));
            });

        });
    });


});
