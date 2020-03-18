// index.js
// global variables
let infections = [];
let adding = false;
let removing = false;

// get all buttons by id
const uploadBtn = document.getElementById('upload');
const addBtn = document.getElementById('add');
const removeBtn = document.getElementById('remove');
const clearBtn = document.getElementById('clear');

// get canvas; set some stuff up
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';
ctx.strokeStyle = 'red';
let canvasBackground;

// for each button; add event listener
uploadBtn.addEventListener('click', uploadBtnHandler);
addBtn.addEventListener('click', addBtnHandler);
removeBtn.addEventListener('click', removeBtnHandler);
clearBtn.addEventListener('click', clearBtnHandler);

// add canvas click listener
canvas.addEventListener('click', canvasClickHandler);

// handler functions
function canvasClickHandler(ev) {
  const { offsetX: x, offsetY: y } = ev;

  function distanceTo(a, b) {
    return Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2));
  }

  if (adding) {
    adding = false;
    canvas.style.cursor = 'not-allowed';
    drawInfection(x, y);

    infections.push({ x, y })
  } else if (removing) {
    removing = false;
    canvas.style.cursor = 'not-allowed';
    let indexToRemove = 0;
    let previousDistance = Number.POSITIVE_INFINITY; // it's big
    
    // iterates over enumerable properties (can be object, array, etc.)
    // in array case is this the index
    for (let i in infections) {
      const inf = infections[i];
      const currentDistance = distanceTo({ x, y }, inf);
      if (currentDistance < previousDistance) {
        indexToRemove = i;
        previousDistance = currentDistance;
      }
    }

    infections.splice(indexToRemove, 1);
    clearCanvas();

    // iterates over iterable objects (object, array, etc.)
    for (let i of infections) {
      const { x: ix, y: iy } = i;
      drawInfection(ix, iy);
    }
  }

  if (infections.length === 0) {
    removeBtn.setAttribute('disabled', 'true');
    clearBtn.setAttribute('disabled', 'true');
  } else {
    removeBtn.removeAttribute('disabled');
    clearBtn.removeAttribute('disabled');
  }
}

function uploadBtnHandler() {
  // get file
  const uploadedFile = document.getElementById('uploadFile').files[0];
  const objURL = URL.createObjectURL(uploadedFile);
  canvasBackground = new Image(600, 400);
  canvasBackground.src = objURL;
  canvasBackground.onload = () => {
    ctx.drawImage(canvasBackground, 0, 0, canvas.width, canvas.height);
  };
}

function exportCanvas(el) {
  const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
  el.href = image;
}

function addBtnHandler() {
  adding = true;
  canvas.style.cursor = 'pointer';
}

function removeBtnHandler() {
  removing = true;
  canvas.style.cursor = 'pointer';
}

function clearBtnHandler(ev) {
  // reset infections
  infections = [];
  
  // handle disabling buttons
  removeBtn.setAttribute('disabled', 'true');
  clearBtn.setAttribute('disabled', 'true');
  clearCanvas();
}

// canvas functions
function drawInfection(x, y, r = 3) {
  ctx.beginPath();
  ctx.ellipse(x, y, r, r, Math.PI / 2.0, 0, Math.PI * 2.0);
  ctx.fill();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (canvasBackground) ctx.drawImage(canvasBackground, 0, 0, canvas.width, canvas.height);
}