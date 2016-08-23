/// <reference path="intellisense/angular.js" />
/// <reference path="intellisense/bootstrap.js" />
/// <reference path="intellisense/jquery-3.1.0.intellisense.js" />
/// <reference path="intellisense/jquery-3.1.0.js" />
/// <reference path="intellisense/ui-bootstrap.js" />
/// <reference path="API.js" />


var app = angular.module("App", []);


app.controller("Test", function ($scope) {
    $scope.name = "This is a Test for Angular";



});