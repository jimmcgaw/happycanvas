
GamePhysics = function(dimensions){
  this.dimensions = dimensions;
};


GamePhysics.prototype.update = function(balls, magnets){
  var self = this;
  balls.forEach(function(ball){
    self.computeBallState(ball, magnets);
  });
  this.checkBallCollisions(balls);
}

GamePhysics.prototype.computeBallState = function(ball, magnets){
  var force = new Vector(0,0);
  this.updatePosition(ball);

  var magnet = magnets[0];

  // MAGNET FORCES
  var magneticForceVector = magnet.position.substract(ball.position);
  var magnetUnitVector = magneticForceVector.unitVector();
  var G = 100;
  var magneticForce = G * (ball.mass * magnet.mass) / magneticForceVector.norm();
  force = force.add( magnetUnitVector.scale(magneticForce) );

  // GRAVITY
  // force = force.add( gravity.scale(ball.mass) );

  // DAMPING
  force = force.add( ball.velocity.scale(ball.damping) );

  this.updateVelocity(ball, force);
  this.handleWallCollision(ball);
}


GamePhysics.prototype.checkWallCollision = function(ball){
  var collision = {};
  collision.maxX = this.dimensions.width - ball.radius;
  collision.maxY = this.dimensions.height - ball.radius;
  if ( (ball.position.x < ball.radius && ball.velocity.x < 0) || (ball.position.x > collision.maxX && ball.velocity.x > 0) ) collision.horizontal = true;
  if ( (ball.position.y < ball.radius && ball.velocity.y < 0) || (ball.position.y > collision.maxY && ball.velocity.y > 0) ) collision.vertical = true;
  return collision;
};

GamePhysics.prototype.checkBallCollision = function(a, b) {
  var distance = b.position.substract(a.position);
  var radiiSquared = Math.pow(a.radius + b.radius, 2);
  if( distance.squaredNorm() <= radiiSquared ){
    return true;
  }
  return false;
}

GamePhysics.prototype.checkBallCollisions = function(balls) {
  for (var i = 0; i < balls.length; i++) {
    var a = balls[i]
    for (var j = i+1; j < balls.length; j++) {
      var b = balls[j];
      if(this.checkBallCollision(a, b)) {
        this.resolveCollision(a, b);
      }
    }
  };
};

GamePhysics.prototype.resolveCollision = function(a,b) {
  // get UNIT normal/tangent vectors
  var normalVector = b.position.substract(a.position);
  var unitNormalVector = normalVector.scale( 1 / normalVector.norm() );
  var unitTangentVector = new Vector(-unitNormalVector.y, unitNormalVector.x);

  // tangent velocity will remain the same
  var tangentVelocityA = a.velocity.dot(unitTangentVector);
  var tangentVelocityB = b.velocity.dot(unitTangentVector);
  var tangentVelocityAVector = unitTangentVector.scale(tangentVelocityA);
  var tangentVelocityBVector = unitTangentVector.scale(tangentVelocityB);

  // normal velocity along the normal
  var normalVelocityA = a.velocity.dot(unitNormalVector);
  var notmalVelocityB = b.velocity.dot(unitNormalVector);

  // collision in 1D (along the normal)
  // using conservation of momentum and kinetic energy
  var newNormalVelocityA = ( normalVelocityA * (a.mass - b.mass) + 2 * b.mass * notmalVelocityB ) / ( a.mass + b.mass);
  var newNormalVelocityB = ( notmalVelocityB * (b.mass - a.mass) + 2 * a.mass * normalVelocityA ) / ( a.mass + b.mass);

  // multiply by unit normal vector
  var newNormalVelocityAVector = unitNormalVector.scale(newNormalVelocityA);
  var newNormalVelocityBVector = unitNormalVector.scale(newNormalVelocityB);

  // update velocity by adding the tangentVelocity + normalVelocity
  a.velocity = newNormalVelocityAVector.add(tangentVelocityAVector);
  b.velocity = newNormalVelocityBVector.add(tangentVelocityBVector);
}


GamePhysics.prototype.updateVelocity = function(ball, force) {
  // end of velocity verlet
  var new_acceleration = force.scale(ball.mass);
  ball.acceleration = ball.acceleration.add(new_acceleration).scale(0.5 * dt);
  ball.velocity = ball.velocity.add(ball.acceleration);
}

GamePhysics.prototype.updatePosition = function(ball){
  // start of velocity verlet
  var dr = ball.velocity.scale(dt).add(ball.acceleration.scale(0.5 * dt * dt));
  ball.move(dr.scale(100));
}

GamePhysics.prototype.handleWallCollision = function(ball){
  var collision = this.checkWallCollision(ball);
  if(collision.horizontal) ball.velocity.x *= ball.restitutionCoeff;
  if(collision.vertical)   ball.velocity.y *= ball.restitutionCoeff;
}
