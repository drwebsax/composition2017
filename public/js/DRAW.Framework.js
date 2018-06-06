

// Point 생성자 함수를 생성합니다.
function Point(event, target) {
    this.x = event.pageX - $(target).position().left;
    this.y = event.pageY - $(target).position().top;
}

function touchPoint(event, target) {
    this.x = event.pageX*2.8 - $(target).position().left;
    this.y = event.pageY*2  - $(target).position().top;
}

// DRAW.Framework 시작

DRAW.Framework =new function(){

    //DRAW.Framework.RandomSet();
    this.RandomSet = function() {
        //color pitch 랜덤
        var RandomValue =Math.floor(Math.random() * 13)
           ,ColorList=["#57009f","#740000","#b30000","#ed0000","#ff6300",
                        "#ffeb00","#9dff00","#29ff00","#00ffe3","#007dff","#4700e4","#4400eb"]
           ,PitchList=[349,370,392,415,440,466,493,523,554,587,622,659];

        var RandomPitchSetValue =Math.floor(Math.random() * 4)
        var ExtendPitchData;

        switch(RandomPitchSetValue) {
            case 0:
                ExtendPitchData=PitchList[RandomValue]/2
               break;
            case 1:
                ExtendPitchData=PitchList[RandomValue]*1
               break;
            case 2:
               ExtendPitchData=PitchList[RandomValue]*2
               break;
            case 3:
               cExtendPitchData=PitchList[RandomValue]*3
               break;
         }

            // width 랜덤
        var RandomColorBlur =Math.floor(Math.random() * 13)
        var RandomWidth =Math.floor(Math.random() * 45)+5;
        var RandomBlur =Math.floor(Math.random() * 200)

        console.log(RandomWidth);
        console.log(RandomBlur);

        return (
            [ColorList[RandomValue],ExtendPitchData
            ,RandomValue,RandomWidth,RandomBlur,ColorList[RandomColorBlur]]
        )
    }

    //DRAW.Framework.BackGroundSet();
    this.BackGroundSet = function() {

        var RandomValue =Math.floor(Math.random() * 13)
        var RandomValueOne =Math.floor(Math.random() * 13)
        var RandomValueTwo=Math.floor(Math.random() * 13)
            ,ColorList=["#57009f","#740000","#b30000","#ed0000","#ff6300",
                      "#ffeb00","#9dff00","#29ff00","#00ffe3","#007dff","#4700e4","#4400eb"]

        $("canvas").css(
            "background"
           ,"radial-gradient("+ColorList[RandomValue]+""
            +" 10%,"+ColorList[RandomValueOne]+""
            +" 35%,"+ColorList[RandomValueTwo]+""+"  60%)"
        );

        return (
             [ColorList[RandomValue],ColorList[RandomValueOne],ColorList[RandomValueTwo]]
        )
    }

    //DRAW.Framework.FmCarrierType();
    this.FmCarrierType = function() {

        var RandomValue =Math.floor(Math.random() * 4)
            ,CarrierTypeList=["sine","sawtooth","triangle","square"]
        //console.log(CarrierTypeList[RandomValue]);
        return (
            CarrierTypeList[RandomValue]
        )

    }

}
