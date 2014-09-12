gravity = new Vector(0, 9.81);
dt = 0.02;
Ball = function(params){
  this.init(params);
  this.radius = params.radius;
  this.canvasDrawer = params.canvasDrawer;
  this.damping = -1;
  this.restitutionCoeff = -0.7;
  this.resting = false;
};

Ball.prototype = Particle.prototype;
Ball.constructor = Ball;

Ball.prototype.render = function() {
  this.canvasDrawer.drawBall(this);
};

Ball.prototype.move = function(displacement) {
  this.position = this.position.add(displacement);
}

Ball.prototype.tick = function(image){
  var force = new Vector(0,0);
  this.updatePosition();

  // GRAVITY + DAMPING
  force = force.add( gravity.scale(this.mass) );
  force = force.add( this.velocity.scale(this.damping) );

  this.updateVelocity(force);
  this.handleWallCollision();
};
