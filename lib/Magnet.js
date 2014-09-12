Magnet = function(params){
  this.position = params.position;
  this.mass = params.mass;
};

Magnet.prototype = new Particle();
Magnet.constructor = Magnet;

Magnet.prototype.render = function() {
  // this.canvasDrawer.renderMagnet(this);
};
