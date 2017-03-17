function addInputs() {
	var m = document.getElementById('minputs');


}

function removeInputs(e) {
	var parent = e.parentElement;

	parent.parentElement.removeChild(parent);
}

function createModal() {
  //Clear minputs and add a new one
  $("#myModal").modal();
}