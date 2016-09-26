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

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('red')
      .accentPalette('orange');
});


var MainController = app.controller("Main", function ($scope, $rootScope, $mdDialog, $location) {
    $(document).ready(function () {
        Authenticate();
    });

    var Authenticate = function () {
        API.key.load();
        if (!API.key.validKey) {
            $scope.ShowLoginDialog();
        }
        else {
            CheckAccountActive();
            $(document).trigger("Authenticated");
        }
        $scope.$apply();
    };
    var CheckAccountActive = function () {
        API.student.active(API.key.ID, function (data) {
            var active = data.isStudentAccountActive;
            API.key.active = active;
            if (!active) {
                $location.path("/myinfo");
                $scope.$apply();
            }
        });
    };

    $scope.ShowLoginDialog = function () {
        $mdDialog.show({
            templateUrl: 'content/logindialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            escapeToClose: false,
            fullscreen: true,
            controller: Login_DialogController
        });
    };
});



var MenuController = app.controller('Menubar', function ($scope, $timeout, $mdSidenav) {
    $scope.toggleLeftNav = buildDelayedToggler('LeftNav');

    $scope.location = "loc";

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

    $scope.User = function () { return API.key; };
    $scope.logout = function () {
        API.key.remove();
        location.reload();
    }

    var activeFunction = function () {
        return API.key.active;
    }
    var enableFunction = function () {
        return true;
    }
    var disableFunction = function () {
        return false;
    }

    $scope.Pages = [
        { name: "Dashboard", URL: "#", icon: "img/icons/dashboard.svg", enable: activeFunction },
        { name: "My Information", URL: "#myinfo", icon: "img/icons/info.svg", enable: enableFunction},
        { name: "WorkShops", URL: "#workshops", icon: "img/icons/find.svg", enable: activeFunction }
    ];    
});




var ContentController = app.controller('Content', function ($scope) {

});



var MyInfoController = app.controller('MyInfo', function ($scope, $rootScope) {
    $scope.myInfo = {};

    $scope.options = {
        gender: [{ name: "Indeterminate / Unspecified / Intersex", value: "X" }, { name: "Male", value: "M" }, { name: "Female", value: "F" }],
        degree: [{ name: "None", value: "N" }, { name: "UG", value: "UG" }, { name: "PG", value: "PG" }],
        year: [{ name: "Not Set", value: "NotSet" }, { name: "1st Year", value: "Year1" }, { name: "2nd Year", value: "Year2" },
        { name: "3rd Year", value: "Year3" }, { name: "4th Year", value: "Year4" }, { name: "5th Year", value: "Year5" }],
        status: [{ name: "Permanent", value: "Permanent" }, { name: "International", value: "International" }],
        language: ["English", "Test"],
        country: ["Australia", "Test"]
    };

    $scope.updateMyInfo = function () {
        alert('reg');
    };

    function GetMyInfo() {
        if (!API.key.validKey) {
            $(document).on("Authenticated", GetMyInfo);
        }
        else {

            API.student.getStudent(API.key.ID, function (data) {
                $scope.myInfo = data.Result;
                $scope.myInfo.firstName = API.key.FirstName;
                $scope.myInfo.lastName = API.key.LastName;
                $scope.$apply();
            }, null);
        }
    }
    GetMyInfo();
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
            $(document).trigger("Authenticated");
            $scope.$apply();
        }, function (data) {
            data = JSON.parse(data.responseText);
            $scope.errorMsg = data.error_description;
            $scope.$apply();
        });
    };
}


// Admin only

function createUser() {
    var dataObj = new API.account.Register.dataObj();
    dataObj.UserName = "98077175";
    dataObj.Password = "testtest";
    dataObj.ConfirmPassword = "testtest";
    dataObj.FirstName = "Timothy"
    dataObj.LastName = "Purchas";
    dataObj.Degree = 1;
    dataObj.Year = 2;
    dataObj.Status = 0;
    dataObj.FirstLanguage = "English";
    dataObj.CountryOrigin = "Australia";
    API.account.Register(dataObj, null, null);
}