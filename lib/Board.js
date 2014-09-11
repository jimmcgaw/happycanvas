var MAX_BALLS = 20;
BOARD_WIDTH = 1000;
BOARD_HEIGHT = 550;

Board = function(canvasDrawer){
  this._balls = [];
  this.canvasDrawer = canvasDrawer;
  this.init();
};

Board.checkWallCollision = function(ball){
  var collision = {};
  var maxW = BOARD_WIDTH - ball.radius;
  var maxH = BOARD_HEIGHT - ball.radius;

  if ( ball.position.x < ball.radius || ball.position.x > maxW ) collision.horizontal = true;
  if ( ball.position.y < ball.radius || ball.position.y > maxH ) collision.vertical = true;

  return collision;
};

Board.prototype.init = function(){
  for (var i = 0; i < MAX_BALLS; i++) {
    var ball = this.createRandomBall();
    this.addBall(ball);
  }
};


Board.prototype.createRandomBall = function(){
  var radius = 14;
  var ball = {
    position: new Vector(
      Math.random() * (this.canvasDrawer.getWidth()  - 2 * radius) + radius,
      Math.random() * (this.canvasDrawer.getHeight() - 2 * radius) + radius
    ),
    mass: 1,//Math.random() * 10,
    friction: 0.95,
    radius: radius,
    velocity: new Vector(
      Math.random() * 1,
      Math.random() * 1
    )
  };
  console.log(">>",ball.velocity);
  ball.canvasDrawer = this.canvasDrawer;
  return new Ball(ball);
};


Board.prototype.addBall = function(ball){
  if (this._balls.length >= MAX_BALLS){
    console.log('This board is at capacity, not adding ball');
  }
  this._balls.push(ball);
};

Board.prototype.removeBall = function(ball){
  console.log('removeBall not yet implemented');
};

Board.prototype.checkBallCollision = function(a,b) {
  var distance = b.position.substract(a.position);
  var radiiSquared = Math.pow(a.radius + b.radius, 2);
  if( distance.squaredNorm() <= radiiSquared ){
    return true;
  }
  return false;
}

Board.prototype.checkBallCollisions = function() {
  for (var i = 0; i < this._balls.length; i++) {
    var a = this._balls[i]
    for (var j = i+1; j < this._balls.length; j++) {
      var b = this._balls[j];
      if(this.checkBallCollision(a,b)) {
        this.resolveCollision(a,b);
      }
    }
  };
};

Board.prototype.resolveCollision = function(a,b) {
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

Board.prototype.tick = function(){
  // PHYSICS HERE

  this._balls.forEach( function(ball){
    ball.tick();
  });
  this.checkBallCollisions();
  // RENDER HERE
  this.render();
};

Board.prototype.render = function(context){

  this.canvasDrawer.beginDraw();
  this._balls.forEach( function(ball){
    ball.render();
  });
  this.canvasDrawer.endDraw();
};
