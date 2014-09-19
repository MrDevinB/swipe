(function($){
  $.fn.swipe = function(callback){
    var startX,
        startY,
        dist,
        threshold = 100, //required min distance traveled to be considered swipe
        allowedTime = 200, // maximum time allowed to travel that distance
        elapsedTime,
        startTime;

    return this.on('touchstart touchmove touchend', function(e){
      var ev = e.originalEvent;
      switch(ev.type) {
        case 'touchstart':
          startX = ev.touches[0].pageX;
          startY = ev.touches[0].pageY;
          startTime = ev.timeStamp;
          dist=0;
        break;
        case 'touchmove':
          if(Math.abs(startX-ev.touches[0].pageX)>4) ev.preventDefault();
          dist = startX-ev.touches[0].pageX;
          elapsedTime = ev.timeStamp - startTime;
        break
        case 'touchend':
          if(Math.abs(dist)>=threshold && elapsedTime<=allowedTime)
            callback(dist>0?'left':'right');
        break;
      }
    });
  };
})(jQuery);