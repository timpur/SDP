/// <reference path="intellisense/jquery-3.1.0.js" />
/// <reference path="intellisense/jquery-3.1.0.intellisense.js" />
/// <reference path="intellisense/angular.js" />


// API for Web Service
var API = new function () {
    // API Stuff
    this.header = { AppKey: "123456", Authorization: "" };

    this.baseUrl = "/webapi/api";
    this.callAPIGet = function (url, data, success, error) {
        var apiSuccess = function (data) {
            if (!data.IsSuccess) {
                if (error)
                    error(data);
            }
            else {
                if (success)
                    success(data);
            }
        };
        var apiError = function (data) {
            if (error) error(data);
        };

        jQuery.ajax({
            dataType: "json",
            method: "GET",
            url: url,
            data: data,
            success: apiSuccess,
            error: apiError,
            headers: this.header
        });
    };
    this.callAPIPost = function (url, data, success, error) {
        var apiSuccess = function (data) {
            if (!data.IsSuccess) {
                if (error)
                    error(data);
            }
            else {
                if (success)
                    success(data);
            }
        };
        var apiError = function (data) {
            if (error) error(data);
        };

        jQuery.ajax({
            dataType: "json",
            method: "POST",
            contentType: "application/json",
            url: url,
            data: JSON.stringify(data),
            success: apiSuccess,
            error: apiError,
            headers: this.header
        });
    };

    this.key = { validKey: false, active: null, ID: "", FirstName: "", LastName: "" };
    this.key.set = function (key, ID, FirstName, LastName) {
        this.validKey = true;
        API.header.Authorization = key;
        this.ID = ID;
        this.FirstName = FirstName;
        this.LastName = LastName
    }
    this.key.load = function () {
        var keyobj = JSON.parse(localStorage.getItem("AuthKey"));
        if (keyobj != null) {
            var now = new Date();
            var time = new Date(keyobj.time);
            if (now < time) {
                if (keyobj.key != null && keyobj.key != "") {
                    this.set(keyobj.key, keyobj.ID, keyobj.FirstName, keyobj.LastName);
                }
            }
        }
    }
    this.key.save = function (key, time, ID, FirstName, LastName) {
        var exspireTime = new Date()
        exspireTime.setSeconds(exspireTime.getSeconds() + time);
        exspireTime = exspireTime.getTime();
        var keyobj = { key: key, time: exspireTime, ID: ID, FirstName: FirstName, LastName: LastName };
        localStorage.setItem("AuthKey", JSON.stringify(keyobj));
        this.set(key, ID, FirstName, LastName);
    }
    this.key.remove = function () {
        localStorage.removeItem("AuthKey");
        this.validKey = false;
        this.active = null;
        this.ID = "";
        this.FirstName = "";
        this.LastName = "";
    }


    //Session API

    this.session = { url: this.baseUrl + "/session" };
    this.session.sessionTypes = function (active, success, error) {
        var url = this.url + "/sessionTypes/" + JSON.parse(active);
        API.callAPIGet(url, null, success, error);
    };

    this.session.booking = { url: this.session.url + "/booking" };
    this.session.booking.search = function (data, success, error) {
        var url = this.url + "/search";
        API.callAPIGet(url, data, success, error);
    };
    this.session.booking.search.dataObj = function () {
        this.StudentId = null;
        this.StartingDtBegin = null;
        this.StartingDtEnd
        this.EndingDtBegin
        this.EndingDtEnd
        this.Campus
        this.LecturerId
        this.SessionTypeId
        this.Active
        this.Page
        this.PageSize
    };

    //Student API

    this.student = { url: this.baseUrl + "/student" };
    this.student.getStudent = function (ID, success, error) {
        var url = this.url + "/" + ID;
        API.callAPIGet(url, null, success, error);
    };
    this.student.update = function (data, success, error) {
        var url = this.url + "/update";
        API.callAPIPost(url, data, success, error);
    };
    this.student.update.dataObj = function () {
        this.StudentID = null;
        this.PreferredName = null;
        this.AltContact = null;
        this.Gender = null;
        this.Degree = null;
        this.Year = null;
        this.Status = null;
        this.FirstLanguage = null;
        this.CountryOrigin = null;
        this.ModifierID = null;
        this.Background = null;
        this.HSC = null;
        this.HSCMark = null;
        this.IELTS = null;
        this.IELTSMark = null;
        this.TOEFL = null;
        this.TOEFLMark = null;
        this.TAFE = null;
        this.TAFEMark = null;
        this.CULT = null;
        this.CULTMark = null;
        this.InsearchDEEP = null;
        this.InsearchDEEPMark = null;
        this.InsearchDiploma = null;
        this.InsearchDiplomaMark = null;
        this.FoundationCourse = null;
        this.FoundationCourseMark = null;

        this.Map = function (obj) {
            this.StudentID = obj.studentID;
            this.PreferredName = obj.preferred_name;
            this.AltContact = obj.alternative_contact;
            this.Gender = obj.gender;
            this.Degree = obj.degree;
            this.Year = obj.year;
            this.Status = obj.status;
            this.FirstLanguage = obj.first_language;
            this.CountryOrigin = obj.country_origin;
            this.ModifierID = this.StudentID;
            this.Background = obj.background;
            this.HSC = obj.HSC;
            this.HSCMark = obj.HSC_mark;
            this.IELTS = obj.IELTS;
            this.IELTSMark = obj.IELTS_mark;
            this.TOEFL = obj.TOEFL;
            this.TOEFLMark = obj.TOEFL_mark;
            this.TAFE = obj.TAFE;
            this.TAFEMark = obj.TAFE_mark;
            this.CULT = obj.CULT;
            this.CULTMark = obj.CULT_mark;
            this.InsearchDEEP = obj.InsearchDEEP;
            this.InsearchDEEPMark = obj.InsearchDEEP_mark;
            this.InsearchDiploma = obj.InsearchDiploma;
            this.InsearchDiplomaMark = obj.InsearchDiploma_mark;
            this.FoundationCourse = obj.FoundationCourse;
            this.FoundationCourseMark = obj.FoundationCourse_mark;
        };
    }
    this.student.register = function (data, success, error) {
        var url = this.url + "/register";
        API.callAPIPost(url, data, success, error);
    };
    this.student.register.dataObj = function () {
        this.StudentId = null;
        this.DateOfBirth = null;
        this.Gender = null;
        this.Degree = null;
        this.Status = null;
        this.FirstLanguage = null;
        this.CountryOrigin = null;
        this.Background = null;
        this.DegreeDetails = null;
        this.AltContact = null;
        this.PreferredName = null;
        this.HSC = null;
        this.HSCMark = null;
        this.IELTS = null;
        this.IELTSMark = null;
        this.TOEFLmark = null;
        this.Tafe = null;
        this.TafeMark = null;
        this.Cult = null;
        this.CultMark = null;
        this.InsearchDEEP = null;
        this.InsearchDEEPMark = null;
        this.InsearchDiploma = null;
        this.InsearchDiplomaMark = null;
        this.FoundationCourse = null;
        this.FoundationCourseMark = null;
        this.CreatorId = null;
    };
    this.student.active = function (ID, success, error) {
        var url = this.url + "/active/" + ID;
        API.callAPIGet(url, null, success, error);
    };

    //Workshop API

    this.workshop = { url: this.baseUrl + "/workshop" };
    this.workshop.get = function (ID, success, error) {
        var url = this.url + "/" + JSON.stringify(ID);
        API.callAPIGet(url, null, success, error);
    }
    this.workshop.getSets = function (active, success, error) {
        var url = this.url + "/workshopSets/" + JSON.stringify(active);
        API.callAPIGet(url, null, success, error);
    }
    this.workshop.search = function (data, success, error) {
        var url = this.url + "/search";
        API.callAPIGet(url, data, success, error);
    };
    this.workshop.search.dataObj = function () {
        var ss = new Date();
        var se = new Date(ss.valueOf());
        se.setDate(new Date().getDate() + 14);

        this.WorkshopSetId = null;
        this.Topic = null;
        this.StartingDtBegin = ss.toJSON();
        this.StartingDtEnd = se.toJSON();
        this.EndingDtBegin = null;
        this.EndingDtEnd = null;
        this.CampusId = null;
        this.Active = true;
        this.Page = 1;
        this.PageSize = 10;
    };
    this.workshop.booking = { url: this.workshop.url + "/booking" }
    this.workshop.booking.create = function (workshopID, success, error) {
        var url = this.url + "/create";
        var data = {
            workshopId: workshopID,
            studentId: API.key.ID,
            userId: API.key.ID
        }
        API.callAPIGet(url, data, success, error);
    };
    this.workshop.booking.search = function (data, success, error) {
        var url = this.url + "/search";
        API.callAPIGet(url, data, success, error);
    };
    this.workshop.booking.search.dataObj = function () {
        this.StudentId = null;
        this.StartingDtBegin = null
        this.StartingDtEnd = null
        this.EndingDtBegin = null;
        this.EndingDtEnd = null;
        this.CampusId = null;
        this.Active = true;
        this.Page = 1;
        this.PageSize = 10;
    };
    this.workshop.booking.cancel = function (workshopID, success, error) {
        var url = this.url + "/cancel";
        var data = {
            workshopId: workshopID,
            studentId: API.key.ID,
            userId: API.key.ID
        }
        API.callAPIGet(url, data, success, error);
    };
    this.workshop.booking.attendance = function (bookingID, key, success, error) {
        var url = this.url + "/attendance";
        var data = {
            BookingID: bookingID,
            AttendanceKey: key,
            StudentID: API.key.ID
        }
        API.callAPIGet(url, data, success, error);
    };
    this.workshop.booking.notification = { url: this.workshop.booking.url + "/notification" }
    this.workshop.booking.notification.get = function (bookingID, success, error) {
        var url = this.url;
        var data = {
            bookingID: bookingID
        }
        API.callAPIGet(url, data, success, error);
    };
    this.workshop.booking.notification.set = function (bookingID, notifications, success, error) {
        var url = this.url;
        var data = {
            bookingID: bookingID,
            Notifications: notifications
        }
        API.callAPIPost(url, data, success, error);
    };
    this.workshop.waiting = { url: this.workshop.url + "/wait" };
    this.workshop.waiting.create = function (workshopID, success, error) {
        var url = this.url + "/create";
        var data = {
            workshopId: workshopID,
            studentId: API.key.ID,
            userId: API.key.ID,
            priority: null
        }
        API.callAPIGet(url, data, success, error);
    };

    //Account OAUTH

    this.account = { url: this.baseUrl + "/account" };
    this.account.Register = function (data, success, error) {
        var url = this.url + "/register";
        API.callAPIPost(url, data, success, error);
    }
    this.account.Register.dataObj = function () {
        this.UserName = null;
        this.Password = null;
        this.ConfirmPassword = null;
        this.FirstName = null;
        this.LastName = null;
        this.Degree = null;
        this.Year = null;
        this.Status = null;
        this.FirstLanguage = null;
        this.CountryOrigin = null;
    }
    this.account.Login = function (ID, Password, success, error) {
        var url = "/webapi/account/login"
        var data = {
            grant_type: "password",
            username: ID,
            password: Password
        }

        jQuery.ajax({
            dataType: "json",
            method: "post",
            url: url,
            data: data,
            error: error,
            success: function (data) {
                var key = data.token_type + " " + data.access_token;
                var time = data.expires_in;
                API.key.save(key, time, data.UserName, data.FirstName, data.LastName);
                success();
            }
        });
    };

    this.util = {};
    this.util.copyObjectPrams = function (srcObj, destObj) {
        for (var key in destObj) {
            if (destObj.hasOwnProperty(key) && srcObj.hasOwnProperty(key)) {
                destObj[key] = srcObj[key];
            }
        }
    };
}