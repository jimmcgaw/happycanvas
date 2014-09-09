Particle = function(params){
  this.init(params);
};

Particle.prototype.init = function(params) {
  this.x = params.x || 100;
  this.y = params.y || 100;
  this.velocity = params.velocity || {angle: 45, speed: 1};
  this.mass = params.mass || 1;
  this.friction = params.friction || 0.5;
};
