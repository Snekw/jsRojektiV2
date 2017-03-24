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

function modalAdd() {
  //Set the object
  var s = {
    //Name the object
    name: document.getElementById("name").value,
    //Put it in group
    group: document.getElementById("group").value,
    //Get the unit
    retUnit: document.getElementById("unit").value,
    //Set up inputs object
    inputs: {},
    //Get the form
    function: document.getElementById("form").value
  }

  //Get div elements
  var child = document.getElementById("minputs").getElementsByTagName("DIV");
  //Loop trough every div
  for (var i = 0; i < child.length; i++) {
    //input name
    var name = null;
    //Default value
    var defValue = 0;
    //Unit
    var unit = null;
    //Get input elements
    var inputs = child[i].getElementsByTagName("INPUT");
    //Loop trough every input
    for (var j = 0; j < inputs.length; j++) {
      //Switch statement for data types and setting them
      switch (inputs[j].dataset.type) {
        case "name":
          name = inputs[j].value;
          break;

        case "defVal":
          defValue = inputs[j].value;
          break;

        case "unit":
          unit = inputs[j].value;
          break;
      }
    }

    //Make object inside inputs object from one divW
    s.inputs[name] = {
      defVal: defValue,
      unit: unit
    }

  }

  console.log(s);
	addFunc(s);

}