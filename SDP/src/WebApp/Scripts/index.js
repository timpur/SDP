/// <reference path="intellisense/jquery-3.1.0.js" />
/// <reference path="intellisense/jquery-3.1.0.intellisense.js" />
/// <reference path="intellisense/angular.js" />
/// <reference path="API.js" />


//ICONS https://design.google.com/icons/


var app = angular.module("App", ["ngMaterial"]);


var Menu = app.controller('Menu', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.toggleLeft = buildDelayedToggler('left');



    function debounce(func, wait, context) {
        var timer;
        return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function () {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }
    function buildDelayedToggler(navID) {
        return debounce(function () {
            $mdSidenav(navID).toggle();
        }, 200);
    }
});

var LeftSideBar = app.controller('LeftSideBar', function ($scope, $mdSidenav) {
    $scope.close = function () {
        $mdSidenav('left').close();
    };
});