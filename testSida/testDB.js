"use strict"
$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get',
        dataType: "json",
        async: true,
        success: function (result) {
            for (var i = 2; result.payload.length; i++) {
                $('#lager').append(
                    '<tr><td>' + result.payload[i].namn +
                    '</td><td>' + result.payload[i].pub_price +
                    '</td><td>' + result.payload[i].count +
                    '</td><td>' + result.payload[i].beer_id +
                    '</td></tr>')
            }
        },
        error: function () {
            alert('error loading')
        }
    });
    $('#dbButton').click(function () {
        $.ajax({
            type: 'GET',
            url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=purchases_append&beer_id=157503',
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
    });
    $('#dbButton2').click(function () {
        $.ajax({
            type: 'GET',
            url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_append&beer_id=157503&amount=10&price=25',
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
    });
});

