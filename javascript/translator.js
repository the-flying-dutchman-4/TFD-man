/** Function for updating language on the website*/

function setLanguage(inputLang) {
    $(function() {
        var language = inputLang;
        $.ajax({
            url: 'languages.xml',
            success: function(xml) {
                $(xml).find('translation').each(function(){
                    var id = $(this).attr('id');
                    var text = "<p>" + $(this).find(language).text() + "</p>";
                    $("" + id).html(text);
                });
            }
        });
    });
}

$(function(){
   $('#uk').click(function(){
       setLanguage('english')
   });
    $('#sv').click(function(){
       setLanguage('swedish')
   });


});