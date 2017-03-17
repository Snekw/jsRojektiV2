function addInputs() {
	var m = document.getElementById('minputs');


}

function removeInputs(e) {
	var parent = e.target.parentElement();

	parent.parentElement.removeChild(parent);
}