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
  var angle = this.velocity.angle,
      speed = this.velocity.speed;


};