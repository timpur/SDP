/// <reference path="intellisense/jquery-3.1.0.js" />
/// <reference path="intellisense/jquery-3.1.0.intellisense.js" />
/// <reference path="intellisense/angular.js" />
/// <reference path="API.js" />


//ICONS https://design.google.com/icons/
//UI https://material.angularjs.org/latest/


var app = angular.module("App", ["ngMaterial"]);


var MainController = app.controller("Main", function ($scope, $mdDialog) {

    angular.element(document).ready(function () {
        $scope.ShowLoginDialog()
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




var LeftNavController = app.controller('LeftNav', function ($scope, $rootScope, $mdSidenav) {
    $scope.close = function () {
        $mdSidenav('LeftNav').close();
    };

    $scope.Pages = [
        { name: "Test Page", URL: "content/Register.html", icon: "img/icons/more_vert.svg" },
        { name: "Test Page", URL: "content/test2.html" }
    ];

    $scope.changePage = function (index) {
        $rootScope.contentURL = $scope.Pages[index].URL;
    };

    function LoadPage() {
        $rootScope.contentURL = $scope.Pages[0].URL;
    };
    //LoadPage();

});




var ContentController = app.controller('Content', function ($scope, $rootScope) {
    $scope.ContentURL = function () {
        return $rootScope.contentURL;
    };

});




var RegisterController = app.controller('Register', function ($scope) {
    $scope.RegisterData = new API.student.register.dataObj();

    $scope.Register = function () {
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
        API.Account.Login($scope.User.ID, $scope.User.Password, function () {
            $scope.close();
        }, function (data) {
            data = JSON.parse(data.responseText);
            $scope.errorMsg = data.error_description;
        });
    };
}