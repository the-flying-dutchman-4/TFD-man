"use strict"

$(document).ready(function() {
    var id
    var price
    $.ajax({
        type: 'GET',
        url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get',
        dataType: "json",
        async: true,
        success: function (result) {
            for (var i = 2; result.payload.length; i++) {
                $('#lager').append(
                    '<tr><td class="name">' + result.payload[i].namn +
                    '</td><td class="price">' + result.payload[i].pub_price +
                    '</td><td class="count">' + result.payload[i].count +
                    '</td><td class ="id">' + result.payload[i].beer_id +
                    '</td></tr>')
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

