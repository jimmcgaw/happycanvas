dt = 0.02;
Ball = function(params){
  this.init(params);
  this.radius = params.radius;
  this.canvasDrawer = params.canvasDrawer;
  this.damping = -0.5;
};

Ball.prototype = Particle.prototype;
Ball.constructor = Ball;

Ball.prototype.render = function() {
  this.canvasDrawer.drawCircle({
    x: this.position.x,
    y: this.position.y,
    radius: this.radius
  });
};


Ball.prototype.applyFriction = function(){
  this.velocity.scale(this.friction);
};

Ball.prototype.updatePosition = function(){
  var dr = this.velocity.scale(dt).add(this.acceleration.scale(0.5 * dt * dt));
  this.move(dr.scale(100));
}

Ball.prototype.updateVelocity = function(force) {
  var new_acceleration = force.scale(this.mass);
  var dv = this.acceleration.add(new_acceleration).scale(0.5 * dt);
  this.velocity = this.velocity.add(dv);
}

Ball.prototype.move = function(displacement) {
  this.position = this.position.add(displacement);
}

Ball.prototype.addDamping = function(force) {
  return force.add( this.velocity.scale(this.damping));
}

Ball.prototype.handleWallCollision = function(){
  var collision = Board.checkWallCollision(this);
  if(collision.horizontal) this.velocity.x *= -1;
  if(collision.vertical) this.velocity.y *= -1;
}

Ball.prototype.tick = function(){
  var force = new Vector(0,0);
  this.updatePosition();
  // DAMPING
  force = this.addDamping(force);
  this.updateVelocity(force);

  this.handleWallCollision();

  this.render();
};
