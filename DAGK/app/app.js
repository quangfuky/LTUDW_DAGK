'use strict';

// Get the modal
var modal = document.getElementsByClassName("editModal");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  for (var i = 0; i < modal.length; i++) {
    if (event.target == modal[i]) {
      modal[i].style.display = "none";
    }
  }
}

function showEditButton() {
  var buttonEdit = document.getElementsByClassName("editButton");
  for (var i = 0; i < buttonEdit.length; i++) {
    if (buttonEdit[i].style.display == "block") {
      buttonEdit[i].style.display = "none";
    } else {
      buttonEdit[i].style.display = "block";
    }
  }
}

var app = angular.module("sampleApp", ["firebase"]);

app.controller("SampleCtrl", function($scope, $firebaseObject) {
  var ref = new Firebase("https://cv1312455.firebaseio.com/user/0");
  // download the data into a local object
  var syncObject = $firebaseObject(ref);
  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  syncObject.$bindTo($scope, "data");
});
var ref = new Firebase("https://cv1312455.firebaseio.com");
var isLogging = false;

function authDataCallback(authData) {
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
    isLogging = true;
    document.getElementById("loginBtn").style.display = 'none';
    document.getElementById("logOutBtn").style.display = 'block';
  } else {
    console.log("User is logged out");
    isLogging = false;
    document.getElementById("loginBtn").style.display = 'block';
    document.getElementById("logOutBtn").style.display = 'none';
  }
}

function checkAuth() {
  ref.onAuth(authDataCallback);
}

function Login() {
  if (!isLogging) {
    ref.authWithOAuthPopup("google", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);

      }

      if (authData) {
        ref.child("users").child(authData.uid).set({
          provider: authData.provider,
          name: getName(authData)
        });
      }
    });
  }
}

function getName(authData) {
  switch (authData.provider) {
    case 'password':
      return authData.password.email.replace(/@.*/, '');
    case 'twitter':
      return authData.twitter.displayName;
    case 'facebook':
      return authData.facebook.displayName;
    case 'google':
      return authData.google.displayName;
  }
}

function LogOut() {
  ref.unauth();
}