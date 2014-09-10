CanvasDrawer = function(elementId) {
  elementId = elementId || '#happycanvas';
  this.canvas = document.querySelector(elementId);
  this.canvas.width = this.canvas.getAttribute('data-width');
  this.canvas.height = this.canvas.getAttribute('data-height');
  this.context = this.canvas.getContext("2d");
};

CanvasDrawer.prototype.getHeight = function() {
  return this.canvas.height;
}

CanvasDrawer.prototype.getWidth = function() {
  return this.canvas.width;
}


CanvasDrawer.prototype.drawCircle = function(params) {
  var ctx = this.context;
  ctx.beginPath();
  ctx.arc(params.x, params.y, params.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'green';
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#003300';
  ctx.stroke();
};


CanvasDrawer.prototype.clear = function(){
  // Use the identity matrix while clearing the canvas
  this.context.save();
  this.context.setTransform(1, 0, 0, 1, 0, 0);
  this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
  this.context.restore();
};
