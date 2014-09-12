EventGenerator = function() {
  var _listeners = {}, self = this;

  this.bind = function(event, listener) {
    Utils.addToList(_listeners, event, listener);
    return self;
  };

  this.fire = function(event, value, originalEvent) {
    if (_listeners[event]) {
      for ( var i = 0; _listeners[event] && i < _listeners[event].length; i++) {
          try {
            _listeners[event][i].apply(this, [value, originalEvent]);
          } catch (e) {
            console.log("fire failed for event " + event + " : " + e);
          }
      }
    }
    return self;
  };

  this.unbind = function(event, listener) {
    if (event){
      if(listener) Utils.removeFromList(_listeners[event], listener);
      else delete _listeners[event];
    }
    else {
      _listeners = {};
    }
    return self;
  };

  this.getListener = function(forEvent) {
    return _listeners[forEvent];
  };


};


var Utils = {
  addToList: function(map, key, value) {
    var l = map[key];
    if (l == null) {
      l = [], map[key] = l;
    }
    l.push(value);
    return l;
  },
  removeWithFunction: function(list, fn) {
    var idx = -1;
    if (list != null && list.length != 0) {
      for (var i = 0, j = list.length; i < j; i++) {
        if (fn(list[i])) {
          idx = i;
          break;
        }
      }
      if (idx != -1) {
        list.splice(idx, 1);
      }
    }
    return idx != -1;
  },
  removeFromList: function(list, n) {
    return Utils.removeWithFunction(list, function(_n) { return _n === n; });
  }
}
