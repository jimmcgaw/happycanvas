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
    // gameCanvas.fire("click", event);
  }

  this.canvas.onmousemove = function(event){
    this.dragging && gameCanvas.fire("click", event);
  }


  this.canvas.onmouseout = function(event){
    this.dragging = false;
    // gameCanvas.fire("click", event);
  }



  // this.canvsonmousedown", function(e){
  //     zoneCanvas.handleMouseDown(e);
  //   }).on("mouseup", function(e){
  //     zoneCanvas.handleMouseUp(e);
  //   }).on("mousemove", function(e){
  //     zoneCanvas.handleMouseMove(e);
  //   });

}
