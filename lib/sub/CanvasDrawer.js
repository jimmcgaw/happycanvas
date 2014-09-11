CanvasDrawer = function(elementId) {
  elementId = elementId || '#happycanvas';
  this.canvas = document.querySelector(elementId);
  this.canvas.width = this.canvas.getAttribute('data-width');
  this.canvas.height = this.canvas.getAttribute('data-height');
  this.context = this.canvas.getContext("2d");

  this.image = new Image();
  this.image.src = "images/ball.gif";

  this.createPreRenderCanvas();

};

CanvasDrawer.prototype.getHeight = function() {
  return this.canvas.height;
}

CanvasDrawer.prototype.getWidth = function() {
  return this.canvas.width;
}

CanvasDrawer.prototype.drawCircle = function(params) {
  var ctx = this.preRenderContext;
  ctx.arc(params.x, params.y, params.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'green';
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#003300';
  ctx.fill();
  ctx.stroke();
};

CanvasDrawer.prototype.createPreRenderCanvas = function() {
  this.preRenderCanvas = document.createElement("canvas");
  this.preRenderCanvas.width = this.getWidth();
  this.preRenderCanvas.height = this.getHeight();
  this.preRenderContext = this.preRenderCanvas.getContext("2d");
}

CanvasDrawer.prototype.beginDraw = function() {
  this.clear(this.preRenderContext);
  this.clear(this.context);
}

CanvasDrawer.prototype.endDraw = function() {
  this.context.drawImage(this.preRenderCanvas, 0,0);
}

CanvasDrawer.prototype.drawBall = function(ball) {
  var x = ball.position.x - ball.radius;
  var y = ball.position.y - ball.radius;
  this.preRenderContext.drawImage(this.image, x, y)
}

CanvasDrawer.prototype.clear = function(ctx){
  if(ctx === undefined) return;
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
  ctx.restore();
};
