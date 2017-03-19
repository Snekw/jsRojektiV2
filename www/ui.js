//Minputs Div
var m = document.getElementById('minputs');
//Template div
var div = document.getElementById('inputs-template');
//To be sure selection box
var seleBox = document.getElementById('seleBox');
//LastIndex var
var li = 0;


function addInputs() {
  //Clone node
  var clone = div.cloneNode(true);
  //Remove the "Hide" class
  clone.classList.remove('hide');
  //Remove id from node
  clone.removeAttribute('id');
  //Put the clone to Minputs
  m.appendChild(clone);
}

function removeInputs(e) {
  //get the parent element
  var parent = e.parentElement;
  //And remove it
  parent.parentElement.removeChild(parent);
}

function createModal(lastIndex) {
  //Set the lastIndex 
  li = lastIndex;
  //Open Modal
  $("#myModal").modal();
  //Clear minputs and add a new one the same way as we did before
  m.innerHTML = "";
  var clone = div.cloneNode(true);
  clone.classList.remove('hide');
  clone.removeAttribute('id');
  m.appendChild(clone);
}

function modalClose() {
  //seleBox changed to last index
  seleBox.selectedIndex = li;
}

