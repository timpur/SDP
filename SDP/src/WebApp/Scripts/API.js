﻿/// <reference path="intellisense/jquery-3.1.0.js" />
/// <reference path="intellisense/jquery-3.1.0.intellisense.js" />
/// <reference path="intellisense/angular.js" />



var API = new function () {
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

    this.key = { validKey: false, user: "" };
    this.key.set = function (key) {
        this.validKey = true;
        API.header.Authorization = key;
    }
    this.key.load = function () {
        var keyobj = JSON.parse(localStorage.getItem("AuthKey"));
        if (keyobj != null) {
            var now = new Date();
            var time = new Date(keyobj.time);
            if (now < time) {
                if (keyobj.key != null && keyobj.key != "") {
                    this.set(keyobj.key);
                    this.user = keyobj.user;
                }
            }
        }
    }
    this.key.save = function (key, time, user) {
        var exspireTime = new Date()
        exspireTime.setSeconds(exspireTime.getSeconds() + time);
        exspireTime = exspireTime.getTime();
        var keyobj = { key: key, time: exspireTime, user: user };
        localStorage.setItem("AuthKey", JSON.stringify(keyobj));
        this.set(key);
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
        var url = this.url + "/" + JSON.parse(ID);
        API.callAPIGet(url, null, success, error);
    };
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



    this.account = { url: this.baseUrl + "/account" };
    this.account.Reg = function (ID, Password, Password2, success, error) {
        var data = {
            userName: "test",
            password: "PassPass",
            confirmPassword: "PassPass"
        };
        var url = this.url + "/register";
        API.callAPIPost(url, data, success, error);
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
                API.key.save(key, time, ID);
                success();
            }
        });
    };

}