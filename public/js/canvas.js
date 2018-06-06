


;(function (window, Constructor, undefined) {

    // Constructor
    var DrawPaint = function(){
         that = this;
    };

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    // 변수를 선언합니다.

     var width = 50;
     var color = "#ffe6e6";
     var isDown = false;
     var blurColor = "#ffe6e6";
     var blurWidth = 200
     var newPoint, oldPoint;
     var socket = io.connect();
     var RANDOMPITCH,RANDOMCOLOR,RANDOMDATA,RANDOMWIDTH,RANDOMBLUR,RANDOMCOLORBLUR;

     //Socket 데이터 값 받기
      //  socket.on('line', function(data) {
      //      context.lineWidth = 50;
      //      context.strokeStyle =  "red";
      //      context.lineCap = "round";
      //      context.shadowBlur = 40;
      //      context.shadowColor = "gray";
      //      context.beginPath();
      //      context.moveTo(data.x1, data.y1);
      //      context.lineTo(data.x2, data.y2);
      //      context.stroke();
      //
       //
      //  });
       socket.on('clear', function(data) {
          console.log(data.clear);
           DRAW.CLEAR =data.clear
       });

        DrawPaint.prototype = {
         init : function() {

                      //  $(window).resize(function() {
                      //      $('canvas').css('width', $(window).width());
                      //  });
                 that.preset.touchPaint();
                 that.preset.mousePaint();
         }
         ,preset :{

           touchPaint:function(){

             $('canvas').bind('touchstart', function(e) {

                 isDown = true;
                 oldPoint = new touchPoint(event.targetTouches[0], this);
                 socket.emit('start', {
                     start:"start",

                 });
                 var ReturnData= DRAW.Framework.RandomSet();
                 //console.log(ReturnData[0],ReturnData[1],ReturnData[2],ReturnData[3],ReturnData[4],ReturnData[5]);

                 RANDOMCOLOR=ReturnData[0];
                 RANDOMPITCH=ReturnData[1];
                 RANDOMDATA=ReturnData[2];
                 RANDOMWIDTH=ReturnData[3];
                 RANDOMBLUR=ReturnData[4];
                 RANDOMCOLORBLUR=ReturnData[5];
                 e.preventDefault();

             });

             $('canvas').bind('touchend', function(e) {

                 isDown = false;
                 socket.emit('end', {
                     end:"end",

                 });
                 e.preventDefault();

             });

             $('canvas').bind('touchmove', function(e) {
                 if (isDown) {
                     var event = e.originalEvent;
                     //  moveTouchX = event.targetTouches[0].pageX;
                     newPoint = new touchPoint(event.targetTouches[0], this);
                     //console.log(newPoint.x + "/"+newPoint.y)
                     color= RANDOMCOLOR;

                     context.lineWidth = width;
                     context.strokeStyle = color;
                     context.lineCap = "round";
                     context.shadowBlur = blurWidth;
                     context.shadowColor = blurColor;
                     context.beginPath();
                     context.moveTo(oldPoint.x, oldPoint.y);
                     context.lineTo(newPoint.x, newPoint.y);
                     context.stroke();

                     // 정보 보내기
                     // 랜덤값 적용
                    color= RANDOMCOLOR;
                    width=RANDOMWIDTH;
                    blurWidth=RANDOMBLUR;
                    blurColor=RANDOMCOLORBLUR;

                     socket.emit('draw', {
                         width: width,
                         color: color,
                         blurWidth:blurWidth,
                         blurColor:blurColor,
                         x1: oldPoint.x,
                         y1: oldPoint.y,
                         x2: newPoint.x,
                         y2: newPoint.y,
                         pitch:RANDOMPITCH,
                         pitchOne:RANDOMWIDTH,
                         pitchTwo:RANDOMBLUR

                     });
                     oldPoint = newPoint;
                     e.preventDefault();
                 }
             });
           }
          ,mousePaint:function(){

              canvas.onmousedown = function(event) {
                   //랜덤 데이터 받기 , 색상, 피치, 숫자
                var ReturnData= DRAW.Framework.RandomSet();
                //console.log(ReturnData[0],ReturnData[1],ReturnData[2],ReturnData[3],ReturnData[4],ReturnData[5]);

                RANDOMCOLOR=ReturnData[0];
                RANDOMPITCH=ReturnData[1];
                RANDOMDATA=ReturnData[2];
                RANDOMWIDTH=ReturnData[3];
                RANDOMBLUR=ReturnData[4];
                RANDOMCOLORBLUR=ReturnData[5];
                 isDown = true;
                 oldPoint = new Point(event, this);

                 socket.emit('start', {
                     start:"start",

                 });

                 };
                 canvas.onmouseup = function() {
                     isDown = false;
                     socket.emit('end', {
                         end:"end",

                     });
                 };
                 canvas.onmousemove = function(event) {

                     if (isDown) {
                         newPoint = new Point(event, this);
                         console.log(newPoint.x + "/" + newPoint.y)

                             // 랜덤값 적용
                          color= RANDOMCOLOR;
                          width=RANDOMWIDTH;
                          blurWidth=RANDOMBLUR;
                          blurColor=RANDOMCOLORBLUR;

                         socket.emit('draw', {
                             width: width,
                             color: color,
                             blurWidth:blurWidth,
                             blurColor:blurColor,
                             x1: oldPoint.x,
                             y1: oldPoint.y,
                             x2: newPoint.x,
                             y2: newPoint.y,
                             pitch:RANDOMPITCH,
                             pitchOne:RANDOMWIDTH,
                             pitchTwo:RANDOMBLUR
                         });
                         oldPoint = newPoint;

                         context.lineWidth = width;
                         context.strokeStyle = color;
                         context.lineCap = "round";
                         context.shadowBlur = blurWidth;
                         context.shadowColor = blurColor;
                         context.beginPath();
                         context.moveTo(oldPoint.x, oldPoint.y);
                         context.lineTo(newPoint.x, newPoint.y);
                         context.stroke();
                     }
                 };

             } //preset.mousePaint() end

         } //preset end

    };  //DrawPaint.prototype  end

     //  jequery event start

      $('.button').click(function() {

          colorData = $(this).attr('id')
          color = colorData;
      });

      $('input').change(function(){

          width = $(this).val();
         console.log(width);
      });

      $('#clear').click(function() {
          context.clearRect(0, 0, canvas.width, canvas.height);
          socket.emit('clear', {
              clear: true
          });
      });

      //  jequery event end
     Constructor.Set = DrawPaint;
     DrawPaint();
})(window, Paint);

var loadData = new Paint.Set() // 객체필요
loadData.__proto__.init(); //초기 로드해야함
