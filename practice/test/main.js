var CANVASWIDTH = 200,CANVASHEIGHT = 200;
var canelement,context;
window.onload = function () {
    createCanvas();
    draw();
}
function createCanvas() {
    document.body.innerHTML = "<canvas id = 'mycanvas' width='"+CANVASWIDTH+"' height='"+CANVASHEIGHT+"'></canvas>";
    canelement = document.getElementById("mycanvas");
    context = canelement.getContext("2d");
}
function draw() {
    context.fillStyle = "#ff0";
    context.fillRect(0,0,200,200);
}