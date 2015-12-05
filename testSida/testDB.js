"use strict"

   var nam;
   var pri;
   var idd;


$(document).ready(function() 
{
 
    var price
    $.ajax({
        type: 'GET',
        url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get',
        dataType: "json",
        async: true,
        success: function (result) 
        {
           
            for (var i = 0; result.payload.length; i++) 
            {
                if (result.payload[i].namn != "" && result.payload[i].count > 0)
                {
                    nam = result.payload[i].namn;
                    pri = result.payload[i].pub_price;
                    idd = result.payload[i].beer_id;
 
                    // addProduct(nam, pri);
                    makeList( nam, pri, idd );
                    // addProduct(result.payload[i].namn,5);
                    // var beer2 = new beer(2231, 5); 
                    // var beer2 = {id:111, price:22};
                    // itemList.push(nam)
                    //onclick="addProduct(id, 5)"    onclick="deleteProduct(beerList[0], 5)"
                    // alert( nam);

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

