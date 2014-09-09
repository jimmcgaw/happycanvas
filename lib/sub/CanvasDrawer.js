CanvasDrawer = function(elementId) {
  elementId = elementId || '#happycanvas';
  this.canvas = document.querySelector(elementId);
  this.context = this.canvas.getContext("2d");
  this.width = this.canvas.width;
  this.height = this.canvas.height;
};

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
