"use strict";

// Author: Chong Jia Chua

//declaring constants and global variables
const WIDTH = 1300;
const HEIGHT = 300;
let randomNum;
let clickable = true;
let failCounter = 0;

// Functions

function convertX(x) {
    return x * WIDTH;
}
function convertY(x) {
    return x * HEIGHT;
}

// Function to draw the captcha images
function drawShapes() {
  for (let i = 0; i < captchas.length; i++) {
    let captcha = captchas[i];
      context.beginPath();
      if (captcha.value == 1) {
        //drawing the car
        // car body
        context.fillStyle = 'rgb(30,144,255)';
        context.fillRect(captcha.x - captcha.r, captcha.y, 200, 50);
        context.fillStyle = 'rgb(135,206,250)';
        // car windows
        context.fillRect(captcha.x - 90 , captcha.y - 10, 80, 30);
        context.fillRect(captcha.x + 10, captcha.y - 10, 80, 30);
        // car tyres
        context.fillStyle = 'rgb(0,0,0)';
        context.beginPath();
        context.arc(captcha.x - 60, captcha.y + 50 , 18, 0, Math.PI * 2, true);
        context.arc(captcha.x + 60, captcha.y + 50, 18, 0, Math.PI * 2, true);
        context.fill();
        // car headlight
        context.beginPath();
        context.fillStyle = 'rgb(204,204,0)';
        context.arc(captcha.x + 100 , captcha.y + 35 , 15, Math.PI/2 , Math.PI*3/2, true);
        context.fill();
      } 
      else {
        //drawing the bus
        // bus body
        context.fillStyle = 'rgb(255,165,0)';
        context.rect(captcha.x - captcha.r, captcha.y - 50, 200, 100);
        context.fill();
        //bus tyres
        context.fillStyle = 'rgb(0,0,0)';
        context.beginPath();
        context.arc(captcha.x - 60, captcha.y + 50 , 18, 0, Math.PI * 2, true);
        context.arc(captcha.x + 60, captcha.y + 50, 18, 0, Math.PI * 2, true);
        context.fill();
        // bus windows
        context.beginPath;
        context.fillStyle = 'rgb(255,255,0)'
        context.fillRect(captcha.x-60, captcha.y-35, 30, 30);
        context.fillRect(captcha.x-15, captcha.y-35, 30, 30);
        context.fillRect(captcha.x+30, captcha.y-35, 30, 30);
        // bus door
        context.fillStyle = 'rgb(0,0,0)';
        context.fillRect(captcha.x-15, captcha.y+10, 30, 40);
      }
    }
}

/* Function that assigns each cell with 1 or 0 and ensures that no more than 4 of 
  a shape exist at an any instance */
function zeroAndOneCounter() {
  let zerosCount = 0;
  let onesCount = 0;
  for (let i = 0; i < captchas.length; i++) {
    let captcha = captchas[i];
    if (captcha.value !== null)  {
        if (captcha.value == 0) {
            zerosCount++;
        } else if (captcha.value == 1) {
            onesCount++;
        }
    }
  }
  // iterating through the array and counting the number of 1s and 0s
  for (let i = 0; i < captchas.length; i++) {
    let captcha = captchas[i];{
      if (zerosCount < 4 && onesCount < 4) {
        if (Math.random() < 0.5) {
          captcha.value = 0;
        } 
        else {
          captcha.value = 1;
        }
      } 
      else if (zerosCount < 4) {
        captcha.value = 0;
      } 
      else if (onesCount < 4) {
        captcha.value = 1; 
      } 
      else {
        if (Math.random() < 0.5) {
          captcha.value = 0;
        }
        else {
          captcha.value = 1;
        }
      }

      if (captcha.value == 0) {
        zerosCount++;
      }
      if (captcha.value == 1) {
        onesCount++;
      }
    }
  }
}

// Function that handles the drawing of the grid
function drawGrid(context) {
  context.lineWidth = "3";
  for (let x=0; x<CANVAS_WIDTH; x+=CELL_WIDTH) {
    context.beginPath();
    context.moveTo(x,0);
    context.lineTo(x,CANVAS_HEIGHT);
    context.stroke();
  }
  for (let y=0; y<CANVAS_HEIGHT; y+=CELL_HEIGHT) {
    context.beginPath();
    context.moveTo(0,y);
    context.lineTo(CANVAS_WIDTH, y);
    context.stroke();
  }
}

// Function for the reinitialise button 
function reset() {
  if (Math.random() < 0.5) {
    randomNum = 0;
  } 
  else {
    randomNum = 1;
  } 
  displayInstruction();
  let zerosCount = 0;
  let onesCount = 0;
  clickable = true;
  //implementing similar logic as before to assign 1 or 0 to a cell
  for (let i = 0; i < captchas.length; i++) {
    let captcha = captchas[i];
      captcha.isSelected = false; 
        if (zerosCount < 4 && onesCount < 4) {
          if (Math.random() < 0.5) {
            captcha.value = 0;
          } 
          else {
            captcha.value = 1;
          }
        } 
        else if (zerosCount < 4) {
          captcha.value = 0;
        } 
        else if (onesCount < 4) {
          captcha.value = 1;
        } 
        else {
          if (Math.random() < 0.5) {
            captcha.value = 0;
          }
          else {
            captcha.value = 1;
          }
        }
        if (captcha.value == 0) {
          zerosCount++;
        } 
        if (captcha.value == 1) {
           onesCount++;
        }
      }

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(context);
    drawShapes();
    failCounter = 0; 
    document.getElementById("verify").disabled = false; // enabling the verify button 
    messageContext.clearRect(0, 0, messageCanvas.width, messageCanvas.height);
    
}

// Function to handle the clicking of cells
function arrayCellClicking(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  let redraw = false;
  if (!clickable) {
    return;
  }

  for (let i = 0; i < captchas.length; i++) {
    let captcha = captchas[i];
    if ((captcha.r * captcha.r) >= ((x - captcha.x) * (x - captcha.x) + (y - captcha.y) * (y - captcha.y))) {
      captcha.isSelected = !captcha.isSelected;

        if (captcha.isSelected) {
          redrawCanvas();
        }
        redraw = true;
    }
}

  if (redraw) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid(context);
      drawShapes();
      redrawCanvas();
  }
}

// Function to indicate when a cell is being selected
function selectionEffect() {
  for (let i = 0; i < captchas.length; i++) {
    let captcha = captchas[i];
    if (captcha.isSelected) {
        context.fillStyle = 'green';
        context.fillRect(captcha.x - CELL_WIDTH / 2, captcha.y - CELL_HEIGHT / 2, CELL_WIDTH, CELL_HEIGHT);
    }
  }
}

// Function for redrawing the canvas so that the shape is drawn after the background during selection
function redrawCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  selectionEffect();
  drawShapes();
  drawGrid(context);
}

// Function for displaying a instruction
function displayInstruction() {
  let instruction = document.getElementById("instructions");
  if (randomNum == 1) {
    instruction.textContent = "Select all the grid cells that contain a car.";
  } else {
    instruction.textContent = "Select all the grid cells that contain a bus.";
  }
}


//Creating a function for the verify button
function verifySelected() {
  let allMatch = true;
  let allRequiredSelected = true;
  clickable = false; 
  //locating the center of the message canvas
  let centerXCoor = messageCanvas.width / 2; 
  let centerYCoor = messageCanvas.height / 2;
  // iterating through the array to check whether all the selected cells match the randomNum
  for (let i = 0; i < captchas.length; i++) {
    let captcha = captchas[i];
      if (captcha.value == randomNum && !captcha.isSelected) {
        allRequiredSelected = false;
      }
      if (captcha.isSelected && captcha.value != randomNum) {
        allMatch = false;
      }
  }

  // clearing the canvases and redrawing it
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid(context);
  drawShapes();
  redrawCanvas();
  messageContext.clearRect(0, 0, messageCanvas.width, messageCanvas.height);
  messageContext.font = "30px Arial";
  
  // Success, Fail and Try again logic and drawing
  if (allMatch && allRequiredSelected) {
    messageContext.clearRect(0, 0, canvas.width, canvas.height);
    messageContext.textAlign = "center";
    messageContext.textBaseline = "middle";
    messageContext.fillStyle = "green";
    messageContext.fillText("SUCCESS", centerXCoor, centerYCoor);
    messageContext.strokeStyle = "green";
    messageContext.lineWidth = 3;
    messageContext.beginPath();
    messageContext.moveTo(730, 45);
    messageContext.lineTo(740, 60);
    messageContext.lineTo(780, 30);
    messageContext.stroke();
    document.getElementById("verify").disabled = true; //disabling the verify button
    failCounter = 0;
  } 
  else {
    failCounter++;
    if (failCounter < 2) {
      messageContext.clearRect(0, 0, canvas.width, canvas.height);
      reset();
      messageContext.textAlign = "center";
      messageContext.textBaseline = "middle";
      messageContext.fillStyle = "red";
      messageContext.fillText("Try again. Select all the grid cells that matches the requirement.", centerXCoor, centerYCoor);
      failCounter++; 
    } 
    else {
      messageContext.clearRect(0, 0, canvas.width, canvas.height);
      messageContext.textAlign = "center";
      messageContext.textBaseline = "middle";
      messageContext.fillText("FAILED", centerXCoor-30, centerYCoor);
      messageContext.strokeStyle = "red";
      messageContext.beginPath();
      messageContext.moveTo(710, 30);
      messageContext.lineTo(670, 60);
      messageContext.moveTo(670, 30);
      messageContext.lineTo(710, 60);
      messageContext.stroke();
      document.getElementById("verify").disabled = true; //disabling the verify button
      failCounter = 0; 
    }
  }
}

// main program

// main canvas
let canvas = document.getElementById('canvas_example');
let context = canvas.getContext('2d');

// secondary canvas for messages
let messageCanvas = document.getElementById("canvas_message");
let messageContext = messageCanvas.getContext("2d");
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

// divide canvas 5 cells
const NUM_CELLS = 5;
const CELL_WIDTH = CANVAS_WIDTH/NUM_CELLS;
const CELL_HEIGHT = CANVAS_HEIGHT

//creating an array to store to store the captcha images and to store values for comparison
let captchas = new Array(5);
captchas[0] = {x: convertX(0.1), y: convertY(0.5), r: 100};
captchas[1] = {x: convertX(0.3), y: convertY(0.5), r: 100};
captchas[2] = {x: convertX(0.5), y: convertY(0.5), r: 100};
captchas[3] = {x: convertX(0.7), y: convertY(0.5), r: 100};
captchas[4] = {x: convertX(0.9), y: convertY(0.5), r: 100};
for (let i = 0; i < captchas.length; i++) {
    let captcha = captchas[i];
    captcha.isSelected = false; 
}

//calling the necessary functions
drawGrid(context);
zeroAndOneCounter();
drawShapes();
displayInstruction();
reset();

// Assigning the reset function to the Reinitialise button
const reinitialiseButton = document.getElementById("Reinitialise");
if (reinitialiseButton){reinitialiseButton.addEventListener("click", reset)};
// Assigning the verifySelected function to the verify button
const verifyButton = document.getElementById("verify"); 
if (verifyButton) {verifyButton.addEventListener("click", verifySelected)};

canvas.addEventListener('click', arrayCellClicking);
document.addEventListener("DOMContentLoaded", displayInstruction);

  


  


