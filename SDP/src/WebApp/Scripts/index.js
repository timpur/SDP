/// <reference path="C:\Users\timothy.TPF\Documents\GitHub\SDP\SDP\src\WebApp\content/Register.html" />
/// <reference path="C:\Users\timothy.TPF\Documents\GitHub\SDP\SDP\src\WebApp\content/Register.html" />
/// <reference path="intellisense/jquery-3.1.0.js" />
/// <reference path="intellisense/jquery-3.1.0.intellisense.js" />
/// <reference path="intellisense/angular.js" />
/// <reference path="API.js" />


//ICONS https://design.google.com/icons/
//UI https://material.angularjs.org/latest/


var app = angular.module("App", ["ngMaterial", "ngRoute"]);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider.when("/myinfo", {
        templateUrl: "content/myinfo.html"
    })
}]);


var MainController = app.controller("Main", function ($scope, $rootScope, $mdDialog) {

    angular.element(document).ready(function () {
        API.key.load();
        if (!API.key.validKey) $scope.ShowLoginDialog();
        $scope.$apply();
    });


    $scope.ShowLoginDialog = function () {
        $mdDialog.show({
            templateUrl: 'content/LoginDialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            escapeToClose: false,
            fullscreen: true,
            controller: Login_DialogController
        });
    };

    $rootScope.myInfo = new API.student.register.dataObj();
});



var MenuController = app.controller('Menu', function ($scope, $timeout, $mdSidenav) {
    $scope.toggleLeftNav = buildDelayedToggler('LeftNav');

    $scope.user = function () { return API.key.user };


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

    $scope.Pages = [
        { name: "Dashboard", URL: "#", icon: "img/icons/account.svg" },
        { name: "My Information", URL: "#myinfo", icon: "img/icons/account.svg" },
        { name: "WorkShops", URL: "#workshops", icon: "img/icons/account.svg" }
    ];

});




var ContentController = app.controller('Content', function ($scope) {

});



var MyInfoController = app.controller('MyInfo', function ($scope, $rootScope) {
    $scope.myInfo = $rootScope.myInfo;

    $scope.updateMyInfo = function () {
        alert('reg');
    };
});



function Login_DialogController($scope, $mdDialog) {
    $scope.close = function () {
        $mdDialog.hide();
    };

    $scope.User = { ID: "", Password: "" };

    $scope.errorMsg = "";

    $scope.Login = function () {
        API.account.Login($scope.User.ID, $scope.User.Password, function () {
            $scope.close();
        }, function (data) {
            data = JSON.parse(data.responseText);
            $scope.errorMsg = data.error_description;
            $scope.$apply();
        });
    };
}