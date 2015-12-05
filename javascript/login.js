"use strict"
$(document).ready(function(){
    var textDisp = $('#display');
    var admins = [2,24,17,20,25];
    $('#submitButton').click(function(){
        var username= $('#user').val();
        var pwd = $('#pw').val();
        console.log(username,pwd)
        $.ajax({
            type: 'GET',
            url: 'http://pub.jamaica-inn.net/fpdb/api.php?username='+username+'&password='+pwd+'&action=iou_get',
            dataType: "json",
            async: true,
            success: function(result){
                if(result.type != "error"){
                    var temp = parseInt(result.payload[0].user_id, 10)
                    var temp2 = $.inArray(temp, admins)
                    if (temp2 > -1) {
                        $(location).attr('href', 'MenuListJan.html')
                    }
                    else {
                        $(location).attr('href', 'CustomerMain_use.html')
                    }
                }
                else{
                    console.log("error");
                }
            },
            error: function(){
                alert('error loading')
            }
        });
    });
});
