/// <reference path="C:\Users\timothy.TPF\Documents\GitHub\SDP\SDP\src\WebApp\content/Register.html" />
/// <reference path="C:\Users\timothy.TPF\Documents\GitHub\SDP\SDP\src\WebApp\content/Register.html" />
/// <reference path="intellisense/jquery-3.1.0.js" />
/// <reference path="intellisense/jquery-3.1.0.intellisense.js" />
/// <reference path="intellisense/angular.js" />
/// <reference path="jQuery/quagga.min.js" />
/// <reference path="API.js" />


//ICONS https://design.google.com/icons/
//UI https://material.angularjs.org/latest/


var app = angular.module("App", ["ngMaterial", "md.data.table", "ngRoute", "ngMessages"]);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    // Routes
    $routeProvider.when("/", {
        templateUrl: "content/dashboard.html",
        controller: "Dashboard"
    });
    $routeProvider.when("/myinfo", {
        templateUrl: "content/myinfo.html",
        controller: "MyInfo"
    });
    $routeProvider.when("/workshops", {
        templateUrl: "content/findworkshops.html",
        controller: "FindWorkshops"
    });
    $routeProvider.when("/workshop/:workshopID", {
        templateUrl: "content/workshop.html",
        controller: "Workshop"
    });
    $routeProvider.when("/past", {
        templateUrl: "content/past.html",
        controller: "PastBookings"
    });
    $routeProvider.when("/help", {
        templateUrl: "content/help.html"
    });
    $routeProvider.when("/code", {
        templateUrl: "content/barcode.html",
        controller: "Barcode"
    });


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
    $scope.pos = pos;

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
        { name: "Dashboard", URL: "#/", icon: "img/icons/dashboard.svg", enable: activeFunction },
        { name: "My Information", URL: "#myinfo", icon: "img/icons/info.svg", enable: enableFunction },
        { name: "Workshops", URL: "#workshops", icon: "img/icons/find.svg", enable: activeFunction },
        { name: "PastBookings", URL: "#past", icon: "img/icons/history.svg", enable: activeFunction },
        { name: "Help", URL: "#help", icon: "img/icons/help.svg", enable: activeFunction }
    ];
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
        vibrate();
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

app.controller("Workshop", function ($scope, $rootScope, $routeParams) {
    $rootScope.PageName = "Workshop Details";

    $scope.workshopID = Number.parseInt($routeParams.workshopID);
    $scope.workshop = {};

    $scope.loadWorkshop = function () {
        if (!API.key.validKey) {
            $(document).on("Authenticated", $scope.loadWorkshop);
        }
        else {
            API.workshop.get($scope.workshopID, function (data) {
                $scope.workshop = data.Result;
                $scope.$apply();
            }, null);
        }
    }
    $scope.loadWorkshop();

    $scope.bookWorkshop = function () {
        vibrate();
        API.workshop.booking.create($scope.workshopID,
        function (data) {
            //Success
            if (data.IsSuccess == true)
                $rootScope.showMessage("Booking was SUCCESSFULL");
        },
        function (data) {
            //Error
            if (data.IsSuccess == false) {
                alert(data.DisplayMessage);
            }
        });
    }

});

app.controller("Dashboard", function ($scope, $rootScope, $mdDialog) {
    $rootScope.PageName = "DashBoard";

    $scope.workshopBooking = {};

    $scope.loadWorkshops = function () {
        if (!API.key.validKey) {
            $(document).on("Authenticated", $scope.loadWorkshops);
        }
        else {
            var data = new API.workshop.booking.search.dataObj();
            data.StudentId = API.key.ID;
            API.workshop.booking.search(data, function (data) {
                $scope.workshopBooking = data.Results;
                $scope.$apply();
            }, null);
        }
    }
    $scope.loadWorkshops();

    $scope.cancelBooking = function (ev, index) {
        vibrate();
        var confirm = $mdDialog.confirm()
              .title('Would you like to cancel this Booking?')
              .textContent('This will remove your booking from the system')
              .ariaLabel('Cancel Booking')
              .targetEvent(ev)
              .ok('Okay')
              .cancel('Cancel');

        $mdDialog.show(confirm).then(function () {
            API.workshop.booking.cancel($scope.workshopBooking[index].workshopID, function (data) {
                $rootScope.showMessage("Cancele Booking was SUCCESSFULL");
                $scope.loadWorkshops();
            }, null);
        });
    };

});

app.controller("PastBookings", function ($scope, $rootScope, $mdDialog) {
    $rootScope.PageName = "Past Bookings";

    $scope.workshopBooking = {};

    $scope.loadWorkshops = function () {
        if (!API.key.validKey) {
            $(document).on("Authenticated", $scope.loadWorkshops);
        }
        else {
            var data = new API.workshop.booking.search.dataObj();
            data.StudentId = API.key.ID;
            data.Active = false;
            API.workshop.booking.search(data, function (data) {
                $scope.workshopBooking = data.Results;
                $scope.$apply();
            }, null);
        }
    }
    $scope.loadWorkshops();
});


app.controller("Barcode", function ($scope, $rootScope) {   

    $scope.loadConfig = function () {
        var obj = $("#barcodelive")[0];
        var cores = navigator.hardwareConcurrency | 1;
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: obj
            },
            decoder: {
                readers: ["code_128_reader"]
            },
            numOfWorkers: cores,
        }, function (err) {
            if (err) {
                console.log(err);
                return
            }
            console.log("Initialization finished. Ready to start");
            Quagga.start();
        });
        Quagga.onDetected($scope.onCode);
    }

    $scope.onCode = function (data) {
        var code = data.codeResult.code;
        Quagga.stop();
        alert(code);
    };



    $scope.loadBarcode = function () {
        if (!API.key.validKey) {
            $(document).on("Authenticated", $scope.loadBarcode);
        }
        else {
            $scope.loadConfig();
        }
    }
    $scope.loadBarcode();

    $scope.$on("$destroy", function () {
        Quagga.stop();
    });
});

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

function pos(num1, num2) {
    var num = num1 - num2;
    if (num < 0)
        return 0;
    else
        return num;
}

navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
function vibrate() {
    vibrateTime(50);
}
function vibrateTime(num) {
    navigator.vibrate(num);
}

app.directive('stringToNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (value) {
                return '' + value;
            });
            ngModel.$formatters.push(function (value) {
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