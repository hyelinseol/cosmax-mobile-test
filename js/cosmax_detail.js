$(document).ready(function(){
    var _resultPrdCnt = 0;

    cosmaxPrdCnt('.survey_quantity', function(){
        var _resultPrdCnt = 0;
        $(".subscribeBox").each(function(){

            var _thisPrdName = $(this).find(".subject").text();
            var _thisPrdCnt = $(this).find("#quantity").val();

            var _thisPrdCntNum = Number(_thisPrdCnt);

            if(_thisPrdName.indexOf("샴푸와") != "-1"){

                _resultPrdCnt+=_thisPrdCntNum * 2;

            }else{
                _resultPrdCnt+=_thisPrdCntNum;
            }

        });
        if(_resultPrdCnt > 3){
            $(".cosmaxDetailBlock").removeClass("displaynone");
        }else{
            $(".cosmaxDetailBlock").addClass("displaynone");
        }
        console.log(_resultPrdCnt);
    });
});

function cosmaxPrdCnt(selector, callback) {
    var input = $(selector);
    var oldvalue = input.text();
    setInterval(function(){
        if (input.text()!=oldvalue){
            oldvalue = input.text();
            callback();
        }
    }, 100);
}



