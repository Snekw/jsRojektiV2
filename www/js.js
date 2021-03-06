var funcs = [
  //Teho
  {
    name: 'P=U*I',
    group: 'Teho',
    inputs: {U: {unit: 'V', defVal: 0}, I: {unit: 'A', defVal: 0}},
    retUnit: 'W',
    func: function (inputs) {
      return inputs.U * inputs.I;
    }
  }
  // }, {
  //   name: 'U=P/I',
  //   numVar: 2,
  //   group: 'Teho',
  //   inputs: [{name: 'P', unit: 'W'}, {name: 'I', unit: 'A'}],
  //   retUnit: 'V',
  //   func: function (inputs) {
  //     return parseFloat(inputs[0]) / parseFloat(inputs[1]);
  //   }
  // }, {
  //   name: 'I=P/U',
  //   numVar: 2,
  //   group: 'Teho',
  //   inputs: [{name: 'P', unit: 'W'}, {name: 'U', unit: 'V'}],
  //   retUnit: 'A',
  //   func: function (inputs) {
  //     return parseFloat(inputs[0]) / parseFloat(inputs[1]);
  //   }
  // },
  // //Ohmin laki
  // {
  //   name: 'U=R*I',
  //   numVar: 2,
  //   group: 'Ohmin laki',
  //   inputs: [{name: 'R', unit: 'Ω'}, {name: 'I', unit: 'A'}],
  //   retUnit: 'V',
  //   func: function (inputs) {
  //     return parseFloat(inputs[0]) * parseFloat(inputs[1]);
  //   }
  // }, {
  //   name: 'R=U/I',
  //   numVar: 2,
  //   group: 'Ohmin laki',
  //   inputs: [{name: 'U', unit: 'V'}, {name: 'I', unit: 'A'}],
  //   retUnit: 'V',
  //   func: function (inputs) {
  //     return parseFloat(inputs[0]) / parseFloat(inputs[1]);
  //   }
  // }, {
  //   name: 'I=U/R',
  //   numVar: 2,
  //   group: 'Ohmin laki',
  //   inputs: [{name: 'U', unit: 'V'}, {name: 'R', unit: 'Ω'}],
  //   retUnit: 'A',
  //   func: function (inputs) {
  //     return parseFloat(inputs[0]) / parseFloat(inputs[1]);
  //   }
  // },
  // //Magneettivuon tiheys,
  // {
  //   name: 'Suora virtajohdin B=(μ0/2*π*r)*I',
  //   numVar: 2,
  //   group: 'Magneettivuon tiheys',
  //   inputs: [{name: 'r', unit: 'M'}, {name: 'I', unit: 'A'}],
  //   retUnit: 'T',
  //   func: function (inputs) {
  //     var r = parseFloat(inputs[0]);
  //     var i = parseFloat(inputs[1]);
  //     var u = 1.2566371;
  //     return (u / (2 * Math.PI * r) * i);
  //   }
  // }
];

//The selction box
var seleBox = document.getElementById('seleBox');
//Input div
var inputs = document.getElementById('inputs');
//Output textarea
var output = document.getElementById('output');
//Last seleBox index
var lastIndex = 0;

//Group array used for creation of inputs
var groups = [];

function setupFuncs(f) {
  funcs = [];
  groups = [];
  for (var i = 0; i < f.length; i++) {
    funcs[i] = f[i];
  }
//Loop through all of the functions and categorize them
  for (var i = 0; i < funcs.length; i++) {
    var found = false;
    //Look for exisiting group
    for (var d = 0; d < groups.length; d++) {
      if (groups[d].name == funcs[i].group) {
        found = true;
        break;
      }
    }
    if (!found) {
      //Group not found create a new group
      var t = {
        name: funcs[i].group,
        funcs: [funcs[i]]
      };
      groups.push(t);
    } else {
      //Group found add function to the groups functions
      for (var x = 0; x < groups.length; x++) {
        if (groups[x].name == funcs[i].group) {
          groups[x].funcs.push(funcs[i]);
          break;
        }
      }
    }
  }

//Create option groups and options for the selection box
  seleBox.innerHTML = '';
  for (var i = 0; i < groups.length; i++) {
    //Create a new group
    var nGroup = document.createElement("optgroup");
    nGroup.label = groups[i].name;
    //Create options inside the group
    for (var d = 0; d < groups[i].funcs.length; d++) {
      var nOpt = document.createElement("option");
      nOpt.value = groups[i].funcs[d].name;
      nOpt.innerHTML = groups[i].funcs[d].name;
      nGroup.appendChild(nOpt);
    }

    //Add
    seleBox.appendChild(nGroup);
  }

//Create last option which is add function
  var nOpt = document.createElement("option");
  nOpt.value = "Lisää kaava";
  nOpt.innerHTML = "Lisää kaava";
  seleBox.appendChild(nOpt);


  selectChanged();
}

//Get the function object associated with the selected function
function getSelectedFunction() {
  var f = {};
  var ele = seleBox;
  //Go trough the available functions and 
  for (var i = 0; i < funcs.length; i++) {
    if (funcs[i].name == ele[ele.selectedIndex].text) {
      f = funcs[i];
      break;
    }
  }
  return f;
}

function selectChanged() {
  if (seleBox[seleBox.selectedIndex].text == "Lisää kaava") {
    createModal(lastIndex);
    return;
  }

  var f = getSelectedFunction();
  //Delete old input boxes
  inputs.innerHTML = "";
  //Generate new input boxes
  for (var key in f.inputs) {
    if (!f.inputs.hasOwnProperty(key)) {
      break;
    }
    //The elements we need to show the inputs
    var nLabel = document.createElement('label');
    var nInput = document.createElement('input');
    var nLabelUnit = document.createElement('label');
    var nDiv = document.createElement('div');
    var nDiv2 = document.createElement('div');

    nDiv.className += 'form-group';

    nDiv2.className += 'col-sm-8';

    nLabel.innerHTML = key + ':';
    nLabel.className += 'col-sm-2 control-label';

    nLabelUnit.innerHTML = f.inputs[key].unit || 'NA';
    nLabelUnit.className += 'col-sm-2 control-label';

    nInput.value = f.inputs[key].defVal || 0;
    nInput.className += 'form-control';
    nInput.id = 'n' + key;

    //Add the elements in correct order
    nDiv.appendChild(nLabel);
    nDiv2.appendChild(nInput);
    nDiv.appendChild(nDiv2);
    nDiv.appendChild(nDiv2);
    nDiv.appendChild(nLabelUnit);

    //Add the div into the view
    inputs.appendChild(nDiv);

    var br = document.createElement('br');
    inputs.appendChild(br);
  }
  //Last index set
  lastIndex = seleBox.selectedIndex;
}

function eval() {
  var f = getSelectedFunction();

  var inputs = [];
  //Loop trough the inputs we have and place the value to object
  for (var key in f.inputs) {
    if (!f.inputs.hasOwnProperty(key)) {
      break;
    }
    var v = document.getElementById('n' + key);
    inputs[key] = parseFloat(v.value.replace(',', '.'));
  }

  //Call the function that actually calculates our value
  var res = f.func(inputs);

  //Display value
  output.value += '\n' + res.toString() + ' ' + f.retUnit;
  output.scrollTop = output.scrollHeight;
}

//Clear the output box
function sclear() {
  document.getElementById('output').value = '';
}

//Add event listener to do the calculation
document.addEventListener('keyup', function (e) {
  if (e.key == 'Enter') {
    eval();
  }
});

getFuncs();
// setupFuncs(funcs);