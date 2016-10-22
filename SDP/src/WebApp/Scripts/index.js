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
    // Set up Routes
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
    $routeProvider.when("/code/:bookingID", {
        templateUrl: "content/barcode.html",
        controller: "Barcode"
    });
    $routeProvider.when("/booking/settings/:bookingID", {
        templateUrl: "content/bookingsettings.html",
        controller: "BookingSettings"
    });


}]);

// Theaming Configeration
app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette("red")
      .accentPalette("amber")
      .warnPalette("pink");
});

// Main Controller of app
// Authtication
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


// Controller for Nav Bar
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

// Controller for Register / Update info
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
        language: ["English", "..."],
        country: ["Australia", "USA", "..."]
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


// Login Controller to authenticate
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

// Controller for Finding workshops
app.controller("FindWorkshops", function ($scope, $rootScope, $mdSidenav) {
    $rootScope.PageName = "Find Workshops";

    $scope.workshops = [];
    $scope.filter = new API.workshop.search.dataObj();
    $scope.order = 'topic';
    $scope.workshopSets = [];

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
            if ($scope.workshopSets.length == 0) {
                API.workshop.getSets(true, function (data) {
                    $scope.workshopSets = data.Results;
                }, null);
            }
        }
    }
    $scope.loadWorkshops();

})

// Controller for details / Booking workshop
app.controller("Workshop", function ($scope, $rootScope, $routeParams, $mdDialog) {
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

    $scope.bookWorkshop = function (ev) {
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
                    var message = data.DisplayMessage;
                    if (message.includes("cut-off")) {
                        $scope.bookWaiting(ev);
                    }
                    else {
                        $rootScope.showMessage(message);
                    }
                }
            });
    }

    $scope.bookWaiting = function (ev) {
        var confirm = $mdDialog.confirm()
              .title('The Workshop is Full')
              .textContent(' Would you like to add the booking request to the waiting list?')
              .ariaLabel('Waiting Request')
              .targetEvent(ev)
              .ok('Add To Waiting')
              .cancel('Cancel Request');

        $mdDialog.show(confirm).then(function () {
            API.workshop.waiting.create($scope.workshopID,
                function (data) {
                    //Success
                    $rootScope.showMessage("Booking was added to waiting list SUCCESSFULL");
                },
                function (data) {
                    //Error
                    if (data.IsSuccess == false)
                        tScope.showMessage(data.DisplayMessage);
                });
        });
    };

});

// Controller for the dashboard
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

// Controller for past bookings
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


// Conttroller for Attendance
app.controller("Barcode", function ($scope, $rootScope, $routeParams) {
    $rootScope.PageName = "Submit Attendance";

    $scope.bookingID = Number.parseInt($routeParams.bookingID);

    $scope.barcodeReady = false;
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
            locate: true,
            locator: {
                halfSample: true,
                patchSize: "medium"
            }
        }, function (err) {
            $scope.barcodeReady = true;
            $scope.$apply();
        });
        Quagga.onProcessed(function (result) {
            var drawingCtx = Quagga.canvas.ctx.overlay,
                drawingCanvas = Quagga.canvas.dom.overlay;

            if (result) {
                if (result.boxes) {
                    drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                    result.boxes.filter(function (box) {
                        return box !== result.box;
                    }).forEach(function (box) {
                        Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
                    });
                }

                if (result.box) {
                    Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
                }

                if (result.codeResult && result.codeResult.code) {
                    Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
                }
            }
        });
        Quagga.onDetected($scope.onCode);
    }
    $scope.onCode = function (data) {
        var code = data.codeResult.code;

        if ($scope.code.val != code) {
            $scope.code.count = 0;
            $scope.code.val = code;
        }
        else if ($scope.code.count != 10) {
            $scope.code.count++;
        }

        if ($scope.code.count == 10) {
            $scope.code.valid = true;
            $scope.stop();
        }

        $scope.$apply();
    };
    $scope.start = function () {
        Quagga.start();
    }
    $scope.stop = function () {
        Quagga.stop();
    }
    $scope.code = {
        val: "",
        count: 0,
        valid: false
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

    $scope.submit = function () {
        API.workshop.booking.attendance($scope.bookingID, $scope.code.val, function () {
            $rootScope.showMessage("Attendance Submitted SUCCESSFULLY");
        }, function () {
            $rootScope.showMessage("Attendance Submitted FAILD");
        });
    }

    $scope.$on("$destroy", function () {
        Quagga.stop();
    });
});

// Controller for booking settings - notification
app.controller("BookingSettings", function ($scope, $rootScope, $routeParams) {
    $rootScope.PageName = "Booking Settings";

    $scope.bookingID = Number.parseInt($routeParams.bookingID);

    $scope.notifications = [];
    $scope.times = [
        { val: 1, text: "30 Min" }, { val: 2, text: "1 HR" }, { val: 4, text: "2 HR" }, { val: 4, text: "4 HR" }, { val: 5, text: "6 HR" },
        { val: 6, text: "12 HR" }, { val: 7, text: "1 Day" }, { val: 8, text: "2 Day" }, { val: 9, text: "3 Day" }, { val: 10, text: "4 Day" }
    ];


    $scope.loadNotifications = function () {
        if (!API.key.validKey) {
            $(document).on("Authenticated", $scope.loadNotifications);
        }
        else {
            API.workshop.booking.notification.get($scope.bookingID, function (data) {
                $scope.notifications = data.Results;
                $scope.$apply();
            }, null);
        }
    }
    $scope.loadNotifications();

    $scope.add = function () {
        $scope.notifications.push({ time: 1 });
    };
    $scope.remove = function (index) {
        $scope.notifications.splice(index, 1);
    }

    $scope.save = function () {
        API.workshop.booking.notification.set($scope.bookingID, $scope.notifications, function (data) {
            $rootScope.showMessage("Notifications Set SUCCESSFULLY");
        }, null);
    }

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

//Vibrate function for mobile
navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
function vibrate() {
    vibrateTime(50);
}
function vibrateTime(num) {
    if (navigator.vibrate != null)
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
// Create user to simulate UTS Single sign on
function createUser() {
    var dataObj = new API.account.Register.dataObj();
    dataObj.UserName = "98077175";
    //dataObj.UserName = "98077176";
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