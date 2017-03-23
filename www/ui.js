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
	var s = {
		name: document.getElementById("name").value,
		group: document.getElementById("group").value,
		retUnit: document.getElementById("unit").value,
		inputs: {},	
		function: document.getElementById("form").value
	}
	
	var child = document.getElementById("minputs").getElementsByTagName("DIV");
	
	for(var i = 0; i < child.length; i++){
		var name = null;
		var defValue = 0;
		var unit = null;
		var inputs = child[i].getElementsByTagName("INPUT");
		
		for(var j = 0; j < inputs.length; j++){
			switch(inputs[j].dataset.type){
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
		
		s.inputs[name] = {
			defVal: defValue,
			unit: unit
		}
		
	}
	
	console.log(s);
	
}