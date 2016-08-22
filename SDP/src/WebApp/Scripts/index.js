/// <reference path="jquery-3.1.0.intellisense.js" />
/// <reference path="bootstrap.js" />
/// <reference path="angular.js" />
/// <reference path="angular-ui/ui-bootstrap.js" />


var app = angular.module("App", []);


app.controller("Test", function ($scope) {
    $scope.name = "This is a Test for Angular";
});
