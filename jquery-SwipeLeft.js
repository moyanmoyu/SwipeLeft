;(function($){
  function SwipeLeft(opts){
    var defaults = {
      degelateEl: '',
      swipeLi: '',
      swipeEl: '',
      hideEl: ''
    }
    this.settings = $.extend(defaults, opts);
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
      this.width = $(opts.hideEl).width()
      this.addTouchStartEventListener()
      this.addTouchMoveEventListener()
      this.addTouchEndEventListener()
    },
    addTouchStartEventListener: function(){
      var self = this
      this.$degelateNode.delegate(this.swipeNode,'touchstart',function(e){
        var currentItem = $(this).parents(self.swipeLi).index();
        if(self.item !== currentItem){
          self.item = currentItem;
          $(self.swipeNode).css({
            left: 0
          })
          self.deleteShow = false
        }
        var touch = e.touches[0]
        self.startX = touch.pageX;
        self.startY = touch.pageY;
      })
    },
    addTouchMoveEventListener: function(){
      var self = this
      this.$degelateNode.delegate(this.swipeNode,'touchmove',function(e){
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
          $(this).css({
            left: -self.distanceX + 'px'
          })
        }else{
          $(this).css({
            left: -(100+self.distanceX) + 'px'
          })
        }
      })
    },
    addTouchEndEventListener: function(){
      var self = this
      this.$degelateNode.delegate(this.swipeNode,'touchend',function(e){
        if(self.startMove){
          self.startMove = false
          if(self.distanceX > 50){
            self.deleteShow = true
            $(this).css({
              left: -self.width
            })
          }else{
            self.deleteShow = false
            $(this).css({
              left: 0
            })
          }
        }
      })
    }
  }
  $.fn.SwipeLeft = SwipeLeft
})(jQuery)