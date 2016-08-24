/// <reference path="intellisense/angular.js" />
/// <reference path="intellisense/bootstrap.js" />
/// <reference path="intellisense/jquery-3.1.0.intellisense.js" />
/// <reference path="intellisense/jquery-3.1.0.js" />
/// <reference path="intellisense/ui-bootstrap.js" />



var API = new function () {
    this.baseUrl = "/webapi/api";

    this.callAPIGet = function (url, data, success, error) {
        this.callAPI(url, data, success, error, "GET");
    }

    this.callAPIPost = function (url, data, success, error) {
        this.callAPI(url, data, success, error, "POST");
    }

    this.callAPI = function (url, data, success, error, method) {
        jQuery.ajax({
            dataType: "json",
            method: method,
            url: url,
            data: data,
            success: success,
            headers: { "AppKey": "123456" }
        });
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
    };

    //Student API

    this.student = { url: this.baseUrl + "/student" };
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

    

}