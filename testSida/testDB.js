"use strict"

   var nam;
   var pri;
   var idd;
   var credits;


$(document).ready(function() 
{
    var username = sessionStorage.getItem("user");
    var pwd = sessionStorage.getItem("pwd");

    var price
    $.ajax({
        type: 'GET',
        url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get',
        dataType: "json",
        async: true,
        success: function (result) 
        {
            // console.log("loading...")
            var data1 = sessionStorage.getItem("first_name");
            var data2 = sessionStorage.getItem("last_name");
            credits = sessionStorage.getItem("assets");

            $('#Infocontent').append(
                '<tr><td>'+data1+" "+data2+'</td><td>'+credits+'</td></tr>'
                );

            for (var i = 0; result.payload.length; i++) 
            {
                if (result.payload[i].namn != "" && result.payload[i].count > 0)
                {
                    nam = result.payload[i].namn;
                    pri = result.payload[i].pub_price;
                    idd = result.payload[i].beer_id;
 
                    makeList( nam, pri, idd );

                $('#lager').append(
                    '<tr><td class="name">' + result.payload[i].namn +
                    '</td><td><button class = "add" onclick= "addProduct('+
                    result.payload[i].beer_id + ', ' + result.payload[i].pub_price + ', 0)" >'+
                    "+"+'</button><button class = "remove" onclick= "deleteProduct('+
                    result.payload[i].beer_id + ', ' + result.payload[i].pub_price + ', 0)" >'+"-"+
                    '</button></td><td class="price">' + result.payload[i].pub_price + " kr"+
                    '</td><td class="count">' + result.payload[i].count +
                    '</td><td class ="id" style ="display:none">' + result.payload[i].beer_id +

                    '</td></tr>')
                }

            }

        },
        error: function () {
            alert('error loading')
        }
    });

    $.ajax({
        type: 'GET',
        url: 'http://pub.jamaica-inn.net/fpdb/api.php?username='+username+'&password='+pwd+'&action=iou_get',
        dataType: "json",
        async: true,
        success: function(result)
        {
          
            credits = result.payload[0].assets;
            document.getElementById("Infocontent").rows[1].cells[1].innerHTML = credits;
            sessionStorage.setItem("assets", credits)
        },
        error: function () 
        {
                alert('error loading new credits')
            }
    });

    $('#buyButton').click(function ()
    {
            for( var i = 0; i<beerList.length;i++ )
            {
                var numVal = document.getElementById("cartcontent").rows[i+1].cells[1].innerHTML;
                var numVal1 = Number(numVal);
                if(typeof beerList[i] == "string")
                {
                     for( var j = 0; j<nameList.length;j++ )
                    {
                        if (beerList[i] == nameList[j]) 
                        {
                                  beerList[i] = idList[j];
                                  break;
                        }
                    }
                }

                for(var j = 0; j<numVal1; j++)
                {
                   
                    $.ajax({
                        type: 'GET',
                        url: 'http://pub.jamaica-inn.net/fpdb/api.php?username='+username+'&password='+pwd+'&action=purchases_append&beer_id='+beerList[i],
                        dataType: "json",
                        async: true,
                        success: function () {
                       //  
                        },
                        error: function () {
                            alert('error loading')
                        }
                    });
                }
               
            }


        $.ajax({
            type: 'GET',
            url: 'http://pub.jamaica-inn.net/fpdb/api.php?username='+username+'&password='+pwd+'&action=iou_get',
            dataType: "json",
            async: true,
            success: function(result)
            {
              
                credits = result.payload[0].assets;
                document.getElementById("Infocontent").rows[1].cells[1].innerHTML = credits;
                sessionStorage.setItem("assets", credits)
            },
            error: function () 
            {
                    alert('error loading new credits')
                }
        });

        for( var i = beerList.length-1 ; i >= 0 ; i-- )
        {
            document.getElementById("cartcontent").deleteRow(i+1);
            beerList.splice(i, 1);
        }
        document.getElementById("total_price").innerHTML="Total: ";

        alert('Thank you for the purchases!');
        // alert(beerList[0]);
    });

    $(".db_table").on('click', 'tr', function(e){
        e.preventDefault();
        id = $(this).children('td.id').html()
        price = $(this).children('td.price').html()
        console.log(id)
        console.log(price)
    });

    $('#dbButton').click(function () {
        if(id>0) {
            $.ajax({
                type: 'GET',
                url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=purchases_append&beer_id='+id,
                dataType: "json",
                async: true,
                success: function (result) {
                    location.reload(true)
                    console.log(result)
                    console.log("buy confirm")

                },
                error: function () {
                    alert('error loading')
                }
            });
        }
        else{console.log("what?")}
    });

    $('#dbButton2').click(function () {
        if(id>0) {
            $.ajax({
                type: 'GET',
                url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_append&beer_id='+id+'&amount=10&price='+price,
                dataType: "json",
                async: true,
                success: function (result) {
                    location.reload(true)
                    console.log("add confirm")
                },
                error: function () {
                    alert('error loading')
                }
            });
        }
        else{console.log("what2?")}
    });


});

