'use strict';

var messageBox;
var inputUsername;
var inputPassword;
var inputPasswordConfirm;
var inputEmail;

 // A string queue where all error messages are collected to be printed
var errorMessageQueue = [];
// An error boolean flag, cleared when ClearErrorMessages is called
var errorFlag = false;

/* Regular Expression Definitions */
var usernameRegExp = new RegExp(/^[a-z0-9]+$/i);
var passwordRegExp = new RegExp(/^(?=.{8,})/i);
var emailRegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

/* Error Handling Functions */
function ClearErrorMessages() {
    // Reset the error flag and clear the error message queue
    errorFlag = false;
    errorMessageQueue = [];
    messageBox.innerHTML = "";
}
function AddErrorMessage(x) {
    // Set the error flag, print the error message and add it to the queue
    errorFlag = true;
    errorMessageQueue.push(x);
}
function DisplayErrorMessages() {
    messageBox.innerHTML = "";
    if (!errorFlag) {
        return;
    }
    for (let i = 0; i < errorMessageQueue.length; i++) {
        messageBox.innerHTML += "<p>" + errorMessageQueue[i] + "</p>";
    }
}
function DisplayMessage(x) {
    messageBox.innerHTML = x;
}

/* Validation Functions */
function ValidateAll() {
    ClearErrorMessages();
    ValidateUsername();
    ValidatePassword();
    ValidateEmail();
    DisplayErrorMessages();
    if (!errorFlag) {
        SaveAccount();
    }
}

// Checks if username is not empty and matches the regexp
function ValidateUsername() {
    if (inputUsername.value.length === 0) {
        AddErrorMessage("Username field must not be empty");
    }
    if (!usernameRegExp.test(inputUsername.value)) {
        AddErrorMessage("Username must only be alpha-numerical characters");
    }
}

// Checks if password is not empty, is confirmed, and matches the regexp
function ValidatePassword() {
    if (inputPassword.value.length === 0) {
        AddErrorMessage("Password field must not be empty");
    }
    if (inputPasswordConfirm.value.length === 0) {
        AddErrorMessage("Password confirmation field must not be empty");
    }
    if (!passwordRegExp.test(inputPassword.value) && !passwordRegExp.test(inputPasswordConfirm.value)) {
        AddErrorMessage("Password must be longer than 8 characters");
    }
    if (inputPassword.value !== inputPasswordConfirm.value) {
        AddErrorMessage("Password and password confirmation do not match");
    }
}

// Checks if email is not empty and matches the regexp
function ValidateEmail() {
    if (inputEmail.value.length === 0) {
        AddErrorMessage("Email field must not be empty");
    }
    if (!emailRegExp.test(inputEmail.value)) {
        AddErrorMessage("Email entered was not a valid address");
    }
}

/* Save and Load Functions */
function SaveAccount() {
    Cookies.set("username", inputUsername.value);
    Cookies.set("password", inputPassword.value);
    Cookies.set("email",    inputEmail.value);
    DisplayMessage("Account successfully saved");
}
function LoadAccount() {
    if (Cookies.get("username")!= undefined) {
        inputUsername.value = Cookies.get("username");
    }
    if (Cookies.get("password") != undefined) {
        inputPassword.value = Cookies.get("password");
        inputPasswordConfirm.value = Cookies.get("password");
    }
    if (Cookies.get("email") != undefined) {
        inputEmail.value = Cookies.get("email");
    }
    DisplayMessage("Account successfully loaded");
}
function ResetAccount() {
    Cookies.remove("username");
    Cookies.remove("password");
    Cookies.remove("email");
    inputUsername.value = "";
    inputPassword.value = "";
    inputPasswordConfirm.value = "";
    inputEmail.value = "";
    DisplayMessage("Account successfully reset");
}

/* Initialisation */
$(document).ready(() => {
    messageBox           = $("#messageBox")[0];
    inputUsername        = $("#inputUsername")[0];
    inputPassword        = $("#inputPassword")[0];
    inputPasswordConfirm = $("#inputPasswordConfirm")[0];
    inputEmail           = $("#inputEmail")[0];
    LoadAccount();
});
