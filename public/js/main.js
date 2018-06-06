
 var DSX = new DSX;
;(function (window, Constructor, undefined) {

    // Constructor
    var mainDrawPaint = function(){
         that = this;
    };
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    // 변수를 선언합니다.

    // Make sure the image is loaded first otherwise nothing will draw.

    //  var width = 30;
    //  var color = color;
    //  var isDown = false;
    //  var blurColor = "#ffe6e6";
    //  var blurWidth = 150
    var newPoint, oldPoint;
    var socket = io.connect();

    // Socket 데이터 값 받기
    socket.on('line', function(data) {

           context.lineWidth = data.width;
           context.strokeStyle = data.color;
           context.shadowBlur = data.blurWidth;
           context.shadowColor = data.blurColor;
           context.lineCap = "round";

           context.beginPath();
           context.moveTo(data.x1, data.y1);
           context.lineTo(data.x2, data.y2);
           context.stroke();


       });
    socket.on('clear', function(data) {
          //console.log(data.clear);
           DRAW.CLEAR =data.clear
       });

    mainDrawPaint.prototype = {
        init : function() {

            //  $(window).resize(function() {
            //      $('canvas').css('width', $(window).width());
            //  });
            that.preset.soundControl();
            DRAW.Framework.BackGroundSet(); //배경화면 자동변경
        }

       ,preset :{
            soundControl:function(){
                var fm = new  DSX.FM({
                        carrier_type:"sine"
                        ,carrier:500
                        ,mod_type :"sine"
                        ,modfreq:700
                        ,depth:800
                        ,gain:0.5
                  });
                 //var osc = new DSX.Osc({type:"sawtooth",freq: 400});
                 var gain = new DSX.Amp({ gain: 0.0});

                 fm.connect(gain);
                 gain.connect(DAC);


                  //화면 지우기
                  socket.on('clear', function(data) {
                      //console.log(data.clear);
                      DRAW.CLEAR =data.clear
                      context.clearRect(0, 0, canvas.width, canvas.height);
                      DRAW.Framework.BackGroundSet(); //배경화면 자동 변경
                  });
                // 좌표값에 따라 피치 바꾸기
                socket.on('line', function (data) {

                    //osc.freq =data.pitch;
                    fm.carrier=data.pitch;
                    fm.modfreq=data.pitchOne*400;
                    fm.depth=data.pitchTwo*100;
                    //osc.freq =data.pitchOne; // 붓 사이즈
                    //osc.freq =data.pitchTwo; // 블러 크기

                    // 캐리어 데이터 변경
                    var CarrierDate =DRAW.Framework.FmCarrierType()
                    fm.carrier_type=CarrierDate;
                    fm.mod_type=CarrierDate;

                      // carrier_type:"sine"
                      // ,carrier:500
                      // ,mod_type :"sine"
                      // ,modfreq:700
                      // ,depth:800
                      // ,gain:0.5
                      console.log("color" ,data.color);
                      console.log("width",data.width);
                      console.log("blurWidth" ,data.blurWidth);
                      console.log("carrier_type",fm.carrier_type.type);
                      console.log("carrier" ,fm.carrier.value);
                      console.log("mod_type" ,fm.mod_type.type);
                      console.log("modfreq",fm.modfreq.value);
                      console.log("depth" ,fm.depth.value);


                });

                // 그리기시작하면 엠프값설정
                socket.on('start', function (data) {
                    gain.gain =0.5;
                });
                // 그리기시작하면 엠프값설정
                socket.on('end', function (data) {
                  gain.gain =0.0;
                });
            }
        }

    };  //DrawPaint.prototype  end

    Constructor.Set = mainDrawPaint;
    mainDrawPaint();

})(window, mainPaint);

    var mainData = new mainPaint.Set() // 객체필요
    mainData.__proto__.init(); //초기 로드해야함
