/// <reference path="intellisense/jquery-3.1.0.js" />
/// <reference path="intellisense/jquery-3.1.0.intellisense.js" />
/// <reference path="intellisense/angular.js" />
/// <reference path="API.js" />


//ICONS https://design.google.com/icons/
//UI https://material.angularjs.org/latest/


var app = angular.module("App", ["ngMaterial"]);


var MainController = app.controller("Main", function ($scope, $mdDialog) {

    angular.element(document).ready(function () {
        $scope.ShowLogin_RegDialog()
    });


    $scope.ShowLogin_RegDialog = function () {
        $mdDialog.show({
            templateUrl: 'content/Login_Reg_Dialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            escapeToClose: false,
            fullscreen:true,
            controller: Login_Reg_DialogController
        });
    };
});





var MenuController = app.controller('Menu', function ($scope, $timeout, $mdSidenav) {
    $scope.toggleLeftNav = buildDelayedToggler('LeftNav');


    function buildDelayedToggler(navID) {
        return debounce(function () {
            $mdSidenav(navID).toggle();
        }, 200);
    }
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
});

var LeftNavController = app.controller('LeftNav', function ($scope, $mdSidenav) {
    $scope.close = function () {
        $mdSidenav('LeftNav').close();
    };
});

var ContentController = app.controller('Content', function ($scope) {

});

function Login_Reg_DialogController($scope, $mdDialog) {
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.User = {
        ID: "",
        Password: ""
    };
    $scope.RegisterData = new API.student.register.dataObj();

    $scope.Login = function () {
        alert('log');
    };

    $scope.Register = function () {
        alert('reg');
    };
}