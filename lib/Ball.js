dt = 0.02;
Ball = function(params){
  this.init(params);
  this.radius = params.radius;
  this.canvasDrawer = params.canvasDrawer;
  this.damping = -1;
};

Ball.prototype = Particle.prototype;
Ball.constructor = Ball;


Ball.prototype.render = function() {
  this.canvasDrawer.drawBall(this);
};


Ball.prototype.applyFriction = function(){
  this.velocity.scale(this.friction);
};


Ball.prototype.updateVelocity = function(force) {
  // end of velocity verlet
  var new_acceleration = force.scale(this.mass);
  var dv = this.acceleration.add(new_acceleration).scale(0.5 * dt);
  this.velocity = this.velocity.add(dv);
}
Ball.prototype.addDamping = function(force) {
  return force.add( this.velocity.scale(this.damping) );
}

Ball.prototype.updatePosition = function(){
  // start of velocity verlet
  var dr = this.velocity.scale(dt).add(this.acceleration.scale(0.5 * dt * dt));
  this.move(dr.scale(100));
}

Ball.prototype.move = function(displacement) {
  this.position = this.position.add(displacement);
}

Ball.prototype.handleWallCollision = function(){
  var collision = Board.checkWallCollision(this);
  if(collision.horizontal) this.velocity.x *= -1;
  if(collision.vertical) this.velocity.y *= -1;
}

Ball.prototype.tick = function(image){
  var force = new Vector(0,0);
  this.updatePosition();
  // this.updateVelocity(force);

  // DAMPING
  // force = this.addDamping(force);

  this.handleWallCollision();

  // this.render(image);
};
