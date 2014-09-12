CanvasDrawer = function(elementSelector, dimensions) {
  this.canvas = document.querySelector(elementSelector);

  this.dimensions = dimensions;
  this.canvas.width = this.dimensions.width;
  this.canvas.height = this.dimensions.height;

  this.context = this.canvas.getContext("2d");

  this.ballImage = new Image();
  this.ballImage.src = "images/ball.gif";

  this.init();

};

CanvasDrawer.prototype.init = function() {
  this.createPreRenderCanvas();
};

CanvasDrawer.prototype.createPreRenderCanvas = function() {
  this.preRenderCanvas = document.createElement("canvas");
  this.preRenderCanvas.width = this.dimensions.width;
  this.preRenderCanvas.height = this.dimensions.height;
  this.preRenderContext = this.preRenderCanvas.getContext("2d");
}

// GENERIC DRAWING UTILITIES
CanvasDrawer.prototype.clear = function() {
  this._clear(this.context);
}

CanvasDrawer.prototype._clear = function(ctx){
  if(ctx === undefined) return;
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
  ctx.restore();
};

// PRERENDER UTILITIES
CanvasDrawer.prototype.beginDraw = function() {
  this._clear(this.preRenderContext);
}

CanvasDrawer.prototype.endDraw = function() {
  this.context.drawImage(this.preRenderCanvas, 0,0);
}

// OBJECT SPECIFIC RENDERING

CanvasDrawer.prototype.drawBall = function(ball) {
  var x = ball.position.x - ball.radius;
  var y = ball.position.y - ball.radius;
  this.preRenderContext.drawImage(this.ballImage, x, y)
}
CanvasDrawer.prototype.drawBalls = function(balls) {
  this.beginDraw();
  var canvasDrawer = this;
  balls.forEach(function(ball){
    canvasDrawer.drawBall(ball);
  });
  this.endDraw();
}

CanvasDrawer.prototype.draw = function(balls, magets) {
  this.clear();
  this.drawBalls(balls);
  // this.drawMagnets(magnets);
}
