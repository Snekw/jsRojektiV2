function addInputs() {
	var m = document.getElementById('minputs');
	var div = document.getElementById('inputs-template');

	clone = div.cloneNode(true);
	clone.classList.remove('hide');
	m.appendChild(clone);
}

function removeInputs(e) {
	var parent = e.parentElement;

	parent.parentElement.removeChild(parent);
}

function createModal() {
  //Clear minputs and add a new one
  $("#myModal").modal();
}