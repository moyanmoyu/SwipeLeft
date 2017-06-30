;(function(){
  function SwipeLeft(opts){
    var defaults = {
      degelateEl: '',
      swipeLi: '',
      swipeEl: '',
      hideEl: ''
    }
    this.settings = Object.assign({},defaults,opts)
    this.init(this.settings)
  }
  SwipeLeft.prototype = {
    init: function(opts){
      this.$degelateNode = $(opts.degelateEl)
      this.swipeLi = opts.swipeLi
      this.swipeNode = opts.swipeEl
      this.startX = 0
      this.startY = 0
      this.distanceX = 0
      this.distanceY = 0
      this.startMove = false
      this.deleteShow = false
      this.item = -1
      this.width = $(opts.hideEl)[0].clientWidth
      this.addTouchStartEventListener()
      this.addTouchMoveEventListener()
      this.addTouchEndEventListener()
    },
    addTouchStartEventListener: function(){
      var self = this
      for (var i = 0; i < this.$degelateNode.length; i++) {
        var node = this.$degelateNode[i];
        node.addEventListener('touchstart',function(e){
          var parentNode = parent(e.target,$(self.swipeLi)[0].className)
          var currentItem = index(parentNode)
          if(self.item !== currentItem){
            self.item = currentItem;
            var swipeNodes = $(self.swipeNode)
            for (var i = 0; i < swipeNodes.length; i++) {
              swipeNodes[i].style.left = 0
            }
            self.deleteShow = false
          }
          var touch = e.touches[0]
          self.startX = touch.pageX;
          self.startY = touch.pageY;
        })
      }
    },
    addTouchMoveEventListener: function(){
      var self = this
      for (var i = 0; i < this.$degelateNode.length; i++) {
        var node = this.$degelateNode[i];
        node.addEventListener('touchmove',function(e){
          var touch = e.touches[0]
          self.distanceX = self.startX - touch.pageX;
          self.distanceY = self.startY - touch.pageY;
          if (Math.abs(self.distanceX)<Math.abs(self.distanceY)*2) {
            return
          }
          if (self.deleteShow && self.distanceX > 0) {
            return
          }
          self.startMove = true
          if(!self.deleteShow && self.distanceX < 0){
            return
          }else if(!self.deleteShow){
            e.target.style.left = -self.distanceX + 'px'
          }else{
            e.target.style.left = -(100+self.distanceX) + 'px'
          }
        })
      }
    },
    addTouchEndEventListener: function(){
      var self = this
      for (var i = 0; i < this.$degelateNode.length; i++) {
        var node = this.$degelateNode[i];
        node.addEventListener('touchend',function(e){
          if(self.startMove){
            self.startMove = false
            if(self.distanceX > self.width/2){
              self.deleteShow = true
              e.target.style.left = -self.width + 'px'
            }else{
              e.target.style.left = 0
            }
            self.item = -1
          }
        })
      }
    }
  }
  window.SwipeLeft = SwipeLeft
  function $(el){
    var elFirstCode = el[0];
    switch (elFirstCode) {
      case '.':{
        var elNode = el.substr(1);
        return document.getElementsByClassName(elNode)
      }
      case '#':{
        var elNode = el.substr(1);
        return [document.getElementById(elNode)]
      }
      default:
        return document.getElementsByTagName(elNode)
    }
  }
  function index(el){
    var slibings = el.parentNode.children
    for (var i = 0; i < slibings.length; i++) {
      if (el === slibings[i]) {
        return i
      }
    }
    return -1
  }
  function parent(el,parentName){
    var parentNode = el.parentNode
    if (parentNode.className && parentNode.className !== parentName) {
      parent(parentNode,parentName)
    }else if(parentNode.className === parentName){
      return parentNode
    }
  }
})()