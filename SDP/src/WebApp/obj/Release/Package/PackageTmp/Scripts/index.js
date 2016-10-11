/// <reference path="C:\Users\timothy.TPF\Documents\GitHub\SDP\SDP\src\WebApp\content/Register.html" />
/// <reference path="C:\Users\timothy.TPF\Documents\GitHub\SDP\SDP\src\WebApp\content/Register.html" />
/// <reference path="intellisense/jquery-3.1.0.js" />
/// <reference path="intellisense/jquery-3.1.0.intellisense.js" />
/// <reference path="intellisense/angular.js" />
/// <reference path="API.js" />


//ICONS https://design.google.com/icons/
//UI https://material.angularjs.org/latest/


var app = angular.module("App", ["ngMaterial", "md.data.table", "ngRoute", "ngMessages"]);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    // Routes
    $routeProvider.when("/myinfo", {
        templateUrl: "content/myinfo.html",
        controller: "MyInfo"
    })
    $routeProvider.when("/workshops", {
        templateUrl: "content/findworkshops.html",
        controller: 'FindWorkshops'
    })


}]);

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette("red")
      .accentPalette("amber")
      .warnPalette("pink");
});


var MainController = app.controller("Main", function ($scope, $rootScope, $mdDialog, $mdToast, $location) {
    $(document).ready(function () {
        Authenticate();
    });

    var Authenticate = function () {
        API.key.load();
        if (!API.key.validKey) {
            $scope.ShowLoginDialog();
        }
        else {
            $(document).trigger("CheckAccountActive");
            $(document).trigger("Authenticated");
        }
        $scope.$apply();
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
    var CheckAccountActive = function () {
        API.student.active(API.key.ID, function (data) {
            var active = data.isStudentAccountActive;
            API.key.active = active;
            if (!active) {
                $location.path("/myinfo");
            }
            $scope.$apply();
        });
    };
    $(document).on("CheckAccountActive", CheckAccountActive);


    $rootScope.showMessage = function (message) {
        $mdToast.show(
          $mdToast.simple()
            .textContent(message)
            .position("bottom right")
            .hideDelay(3000)
        );
    };

});



var MenuController = app.controller('Menubar', function ($scope, $rootScope, $timeout, $mdSidenav) {
    $scope.toggleLeftNav = function () {
        $mdSidenav("LeftNav").toggle();
    }
    $scope.rightSidebar = {
        showBTN: function () {
            var sidebar = $("#rightSidebar");
            if (sidebar.length > 0)
                return true;
            else
                return false;
        },
        icon: function () {
            var sidebar = $("#rightSidebar");
            var text = sidebar.data("btnIcon");
            if (text != null && text != "")
                return text;
            else
                return "more_vert.svg";
        },
        show: function () {
            $mdSidenav("rightSidebar").toggle();
        }
    };

    $scope.PageName = function () {
        return $rootScope.PageName;
    };


});



var LeftNavController = app.controller('LeftNav', function ($scope, $rootScope, $mdSidenav) {
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
        { name: "My Information", URL: "#myinfo", icon: "img/icons/info.svg", enable: enableFunction },
        { name: "Workshops", URL: "#workshops", icon: "img/icons/find.svg", enable: activeFunction }
    ];
});




var ContentController = app.controller('Content', function ($scope, $rootScope) {


});



var MyInfoController = app.controller('MyInfo', function ($scope, $rootScope) {
    $rootScope.PageName = "My Information";

    $scope.infoForm = {};
    $scope.myInfo = {};
    $scope.updateInfo = new API.student.update.dataObj();
    $scope.key = API.key;

    $scope.options = {
        gender: [{ name: "Indeterminate / Unspecified / Intersex", value: "X" }, { name: "Male", value: "M" }, { name: "Female", value: "F" }],
        degree: [{ name: "None", value: "N" }, { name: "Undergraduate", value: "UG" }, { name: "Postgraduate", value: "PG" }],
        year: [{ name: "Not Set", value: "NotSet" }, { name: "1st Year", value: "Year1" }, { name: "2nd Year", value: "Year2" },
        { name: "3rd Year", value: "Year3" }, { name: "4th Year", value: "Year4" }, { name: "5th Year", value: "Year5" }],
        status: [{ name: "Permanent", value: "Permanent" }, { name: "International", value: "International" }],
        language: ["English", "Test"],
        country: ["Australia", "Test"]
    };

    $scope.updateMyInfo = function () {
        $scope.updateInfo.Map($scope.myInfo);
        var valid = !$scope.infoForm.$invalid;
        if (valid) {
            API.student.update($scope.updateInfo, function (data) {
                if (API.key.active) {
                    $rootScope.showMessage("Updating Information was SUCCESSFUL.");
                }
                else {
                    $rootScope.showMessage("Activating Account was SUCCESSFUL.");
                    $(document).trigger("CheckAccountActive");
                }
            });
        }
    };

    $scope.GetMyInfo = function () {
        if (!API.key.validKey) {
            $(document).on("Authenticated", $scope.GetMyInfo);
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
    $scope.GetMyInfo();
});



function Login_DialogController($scope, $rootScope, $mdDialog) {
    $scope.close = function () {
        $mdDialog.hide();
    };
    $scope.User = { ID: "", Password: "" };
    $scope.errorMsg = "";
    $scope.Login = function () {
        API.account.Login($scope.User.ID, $scope.User.Password, function () {
            $scope.close();
            $(document).trigger("CheckAccountActive");
            $(document).trigger("Authenticated");
            $scope.$apply();
        }, function (data) {
            data = JSON.parse(data.responseText);
            $scope.errorMsg = data.error_description;
            $scope.$apply();
        });
    };
}


app.controller("FindWorkshops", function ($scope, $rootScope, $mdSidenav) {
    $rootScope.PageName = "Find Workshops";

    $scope.workshops = [];
    $scope.filter = new API.workshop.search.dataObj();
    $scope.order = 'topic';

    $scope.moreWorkshops = function () {
        if ($scope.workshops.length == $scope.filter.PageSize) {
            return true;
        }
        else {
            return false;
        }
    };
    $scope.getPages = function () {
        var num = $scope.filter.Page;
        if ($scope.moreWorkshops()) num++;
        var pages = [];

        for (var i = 0; i < num; i++) {
            pages[i] = i + 1;
        }

        return pages;
    };
    $scope.previousPage = function () {
        $scope.filter.Page--;
        $scope.loadWorkshops()
    };
    $scope.nextPage = function () {
        $scope.filter.Page++;
        $scope.loadWorkshops()
    };
    $scope.resetPages = function () {
        $scope.filter.Page = 1;
        $scope.loadWorkshops()
    };

    $scope.closeSidebar = function () {
        $mdSidenav("rightSidebar").close();
    }



    $scope.loadWorkshops = function () {
        if (!API.key.validKey) {
            $(document).on("Authenticated", $scope.loadWorkshops);
        }
        else {
            API.workshop.search($scope.filter, function (data) {
                $scope.workshops = data.Results;
                $scope.$apply();
            }, null);
        }
    }
    $scope.loadWorkshops();

})

// Global Functions

function buildSidebarDelayedToggler($mdSidenav, navID, time) {
    if (time == null) time = 0;
    return debounce(function () {
        $mdSidenav(navID).toggle();
    }, time);
}
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

app.directive('stringToNumber', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(value) {
                return '' + value;
            });
            ngModel.$formatters.push(function(value) {
                return parseFloat(value);
            });
        }
    };
});


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