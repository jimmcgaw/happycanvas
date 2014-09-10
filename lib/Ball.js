Ball = function(params){
  this.init(params);
  this.radius = params.radius;
  this.canvasDrawer = params.canvasDrawer;
};

Ball.prototype = Particle.prototype;
Ball.constructor = Ball;

Ball.prototype.render = function() {
  this.canvasDrawer.drawCircle({
    x: this.x,
    y: this.y,
    radius: this.radius
  });
};

Ball.prototype.computeVelocity = function(){
  this.applyFriction();
  // this.applyGravity();
}
Ball.prototype.applyFriction = function(){
  this.velocity.speed *= this.friction;
};

Ball.prototype.handleCollisions = function(){
  var collision = Board.checkWallCollision(this); // "horizontal" / "vertical" / ""
  if (collision.horizontal) {
    this.velocity.angle = 360 - this.velocity.angle;
  }
  if (collision.vertical) {
    this.velocity.angle = 180 - this.velocity.angle;
  }
};

Ball.prototype.updatePosition = function(){
  var radians = this.velocity.angle * 360 / Math.PI * 2;
  var deltaX = Math.cos(radians) * this.velocity.speed;
  var deltaY = Math.sin(radians) * this.velocity.speed;
  this.x += deltaX;
  this.y += deltaY;
}

Ball.prototype.tick = function(){
  this.computeVelocity();
  this.handleCollisions();
  this.updatePosition();
};
