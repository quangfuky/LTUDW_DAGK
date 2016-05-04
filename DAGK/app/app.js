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