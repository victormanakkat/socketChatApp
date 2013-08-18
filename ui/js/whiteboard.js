/* Variables */
var paint = false;
	
var prevX;
var prevY;	
var currentX;
var currentY;


/* Functions */
function loadCanvas() {	
	$("#my_canvas").hammer({}).bind("drag", function(ev) {
		//console.log("drag", ev);
		//console.log("drag", ev.position.x, ev.position.y);
		if(paint) {
			prevX = currentX;
			prevY = currentY;
			
			currentX = ev.position.x;
			currentY = ev.position.y;
			
			drawLine();
		}
		else {
		}
	});
	$("#my_canvas").hammer({}).bind("dragstart", function(ev) {
		//console.log("dragstart", ev);
		paint = true;
		currentX = ev.position.x;
		currentY = ev.position.y;
	});
	$("#my_canvas").hammer({}).bind("dragend", function(ev) {
		//console.log("dragend", ev);
		paint = false;
	});
	
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