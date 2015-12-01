"use strict"
$(document).ready(function(){
        $.ajax({
            type: 'GET',
            url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get',
            dataType: "json",
            async: true,
            success: function(result){
                console.log(result)
                console.log(result.payload[0].namn)
                for(var i=2; result.payload.length; i++){
                    $('#lager').append('<tr><td>'+result.payload[i].namn+'</td><td>'+result.payload[i].pub_price+'</td><td>'+result.payload[i].count+'</td></tr>')
                }
            },
            error: function(){
                alert('error loading')
            }
        });
    });

