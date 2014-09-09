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

Ball.prototype.tick = function(){
  var angle = this.velocity.angle;

  var newSpeed = this.velocity.speed * this.friction;
  this.velocity.speed = newSpeed;


  var angleRadians = angle * 360 / Math.PI * 2;
  var deltaX = Math.cos(angleRadians) * newSpeed;
  var deltaY = Math.sin(angleRadians) * newSpeed;

  this.x += deltaX;
  this.y += deltaY;
};