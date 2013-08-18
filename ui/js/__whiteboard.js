/* Variables */
var paint = false;
	
var prevX;
var prevY;	
var currentX;
var currentY;


/* Functions */
function loadCanvas() {
	//console.log("inside loadCanvas()()", $("#my_canvas"));
	var canvas = document.getElementById('my_canvas');
	
	//Events for Drawing
	canvas.addEventListener("mousedown", mouseDownHandler, false);
	canvas.addEventListener("mousemove", mouseMoveHandler, false);
	canvas.addEventListener("mouseup", mouseUpHandler, false);
	canvas.addEventListener("mouseleave", mouseLeaveHandler, false);
	
}

function getMouseX(e) {
	var x;
	if (e.pageX != undefined) {
		x = e.pageX;
	}
	else {
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	}		
	return x;
}

function getMouseY(e) {
	var y;
	if (e.pageY != undefined) {
		y = e.pageY;
	}
	else {
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	return y;
}

function mouseDownHandler(e) {
	paint = true;
	
	currentX = getMouseX(e);
	currentY = getMouseY(e);
}

function mouseMoveHandler(e) {
	if(paint) {
		//alert("Dragging...");
		
		prevX = currentX;
		prevY = currentY;
		
		currentX = getMouseX(e);
		currentY = getMouseY(e);
		
		drawLine();
	}
	else {
		//alert("Not Dragging...");
	}
}

function mouseUpHandler(e) {
	paint = false;
}

function mouseLeaveHandler(e) {
	paint = false;
}


function drawLine() {
	//alert("Drawing from (" + prevX + ", " + prevY + ") to (" + currentX + ", " + currentY + ")");

	var cxt=document.getElementById('my_canvas').getContext("2d");
	
	cxt.lineJoin = "round";
	
	cxt.moveTo(prevX, prevY);
	cxt.lineTo(currentX, currentY);
	
	cxt.strokeStyle = "#123456";
	cxt.lineWidth = 3;
	
	cxt.stroke();
	
}

function clearCanvas() {
	var canvas = document.getElementById('my_canvas');
	//var canvas = $("#my_canvas");
	canvas.width = canvas.width;
}