GameCanvas = function(canvasElementSelector){
  EventGenerator.apply(this, arguments);
  this.canvas = document.querySelector(canvasElementSelector);
  this.dragging = false;
  this.attachClickHandler();
};

GameCanvas.prototype.attachClickHandler = function(){
  var gameCanvas = this;
  this.canvas.onmousedown = function(event){
    this.dragging = true;
    gameCanvas.fire("click", event);
  };

  this.canvas.onmouseup = function(event){
    this.dragging = false;
  }

  this.canvas.onmousemove = function(event){
    this.dragging && gameCanvas.fire("click", event);
  }

  this.canvas.onmouseout = function(event){
    this.dragging = false;
  }

}
