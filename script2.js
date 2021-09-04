let board = document.querySelector(".board");

let numOfRows = 16;
let counter;
let penColor = "#000"

const blackPen = document.querySelector("#black-pen");
const rainbowPen = document.querySelector("#rainbow-pen");
const eraserPen = document.querySelector("#eraser-pen");
const pencilPen = document.querySelector("#pencil-pen");
const clearButton = document.querySelector(".clear-button")
const resizeButton = document.querySelector(".resize-button")

function makeBoard(){
    //Making squares (sizexsize)
    for(i=0; i< (parseInt(numOfRows) * parseInt(numOfRows)); i++){
        //setting squares
        const square = document.createElement("div");
        square.className = "square";
        square.setAttribute("data-counter", 10);
        //appending div to board
        board.appendChild(square);
        //setting the rows and columns
        board.style.gridTemplateColumns = `repeat(${parseInt(numOfRows)}, 1fr)`;
        board.style.gridTemplateRows = `repeat(${parseInt(numOfRows)}, 1fr)`;
    }
}

function clearGrid(){
    removeActive();
    let list = document.querySelectorAll(".square");
    list.forEach(function(item){
        item.style.backgroundColor = "#FFF";
        item.style.filter = `brightness(100%)`
    });
        
    clearButton.removeAttribute("id", "clear")

    //This line makes the page refresh after adding the id
    void clearButton.offsetWidth;

    clearButton.setAttribute("id", "clear");
}

function resizeGrid(){
    removeActive();
    do {
        numOfRows = prompt("Enter the canvas size in pixels (example: 16) The max is: 100");
    }
   while(isNaN(numOfRows) == true || numOfRows < 0 || numOfRows > 100)
   while(board.hasChildNodes()){
       board.removeChild(board.firstChild);
   }
   resizeButton.removeAttribute("id", "clear")

   //This line makes the page refresh after adding the id
   void resizeButton.offsetWidth;

   resizeButton.setAttribute("id", "clear");
   makeBoard();
   penColor  = "black";
   draw();
}

function draw() {

    let list = document.querySelectorAll(".square");
    list.forEach(function(item){
        item.addEventListener("mouseover", function(){
            item.style.backgroundColor = penColor;
        });
    });
}

function getRandomColor(){

    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);

    penColor = "rgb("+r+","+g+","+b+")";
}

function shadeColor() {
    counter = this.getAttribute("data-counter");
    counter -= 1;
    this.style.filter = `brightness(${counter*10}%)`
    this.setAttribute("data-counter", counter)
}

function eraser(){
    counter = this.getAttribute("data-counter");
    counter = 10;
    this.style.filter = `brightness(${counter*10}%)`
    this.setAttribute("data-counter", counter)
    penColor = "#fff";
}

blackPen.addEventListener("click", function(){
    removeActive();
    blackPen.setAttribute("id", "active");
    let list = document.querySelectorAll(".square");
    list.forEach(function(item){
        item.removeEventListener("mouseover", shadeColor);
        item.removeEventListener("mouseover", getRandomColor);
        item.removeEventListener("mouseover", eraser);
    });
    penColor = '#000';
    draw();
});

rainbowPen.addEventListener("click", function(){
    removeActive();
    rainbowPen.setAttribute("id", "active");
    let list = document.querySelectorAll(".square");
    list.forEach(function(item){
        item.removeEventListener("mouseover", shadeColor);
        item.addEventListener("mouseover", getRandomColor);
        item.removeEventListener("mouseover", eraser);
    });
    getRandomColor();
    draw();
});

pencilPen.addEventListener("click", function(){
    removeActive();
    pencilPen.setAttribute("id", "active");
    counter = 0;
    penColor = "rgba(250, 250, 250, 1)";
    let list = document.querySelectorAll(".square");
    list.forEach(function(item){
        item.addEventListener("mouseover", shadeColor);
        item.removeEventListener("mouseover", getRandomColor);
        item.removeEventListener("mouseover", eraser);
    });
    draw();
});

eraserPen.addEventListener("click", function(){
    removeActive();
    eraserPen.setAttribute("id", "active");
    let list = document.querySelectorAll(".square");
    list.forEach(function(item){
        item.removeEventListener("mouseover", shadeColor);
        item.removeEventListener("mouseover", getRandomColor);
        item.addEventListener("mouseover", eraser);
    });
    draw();
});

function removeActive(){
    
    const buttonList = Array.from(document.querySelectorAll("button"));
    buttonList.forEach(function(button){
        button.removeAttribute("id")
    });
}

makeBoard();
draw();