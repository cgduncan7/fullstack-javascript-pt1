// index.js

// global variables
let uploaded = false;
let exported = false;
let infections = 0;

// get all buttons by id
const uploadBtn = document.getElementById('upload');
const exportBtn = document.getElementById('export');
const addBtn = document.getElementById('add');
const removeBtn = document.getElementById('remove');
const clearBtn = document.getElementById('clear');

// for each button; add event listener
uploadBtn.addEventListener('click', uploadBtnHandler);
exportBtn.addEventListener('click', exportBtnHandler);
addBtn.addEventListener('click', addBtnHandler);
removeBtn.addEventListener('click', removeBtnHandler);
clearBtn.addEventListener('click', clearBtnHandler);

// handler functions
function genericHandler(ev, message) {
  console.info(ev);
  window.alert(message);
}

function uploadBtnHandler(ev) {
  genericHandler(ev, 'Upload Button was clicked');
}

function exportBtnHandler(ev) {
  genericHandler(ev, 'Export Button was clicked');
}

function addBtnHandler(ev) {
  // increase infections and let us know current amount
  genericHandler(ev, `Add Button was clicked, ${++infections} current infections`);
  
  // handle enabling buttons
  if (infections > 0) {
    removeBtn.removeAttribute('disabled');
    clearBtn.removeAttribute('disabled');
  }
}

function removeBtnHandler(ev) {
  // decrease infections and let us know amount
  genericHandler(ev, `Remove Button was clicked, ${--infections} current infections`);
  
  // handle disabling buttons
  if (infections === 0) {
    removeBtn.setAttribute('disabled', 'true');
    clearBtn.setAttribute('disabled', 'true');
  }
}

function clearBtnHandler(ev) {
  // reset infections
  infections = 0;
  
  // handle disabling buttons
  removeBtn.setAttribute('disabled', 'true');
  clearBtn.setAttribute('disabled', 'true');
  genericHandler(ev, 'Clear Button was clicked');
}