gravity = new Vector(0, 9.81);
dt = 0.02;
Ball = function(params){
  this.init(params);
  this.radius = params.radius;
  this.canvasDrawer = params.canvasDrawer;
  this.damping = -1;
  this.restitutionCoeff = -0.7;
};

Ball.prototype = new Particle();
Ball.constructor = Ball;

Ball.prototype.render = function() {
  this.canvasDrawer.drawBall(this);
};
