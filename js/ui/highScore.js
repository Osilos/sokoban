define(['js/ui/bouton', 'js/ui/localization'], function(bouton, localization) {



    var buildPage = function() {
        var stringAjax = $.ajax({
            type: "POST",
            url: "./php/highscore.php",
            success: function(text) {
                console.log("donne up");
            },
            async: false
        }).responseText;
        
        $("#body").empty();
        $("#body").append('<div id="uiContainer"></div>');
        var Bouton = require('js/ui/bouton');
        new Bouton(0, 0, "bouton", "menu", localization.getXml('#LABEL_BACK target'), "#uiContainer");
        new Bouton(0, 0, "bouton-highscore", "", localization.getXml('#LABEL_HIGHSCORE target'), "#uiContainer");
        $("#uiContainer").append('<div id="highscore"></div>');
        $("#highscore").append('<p>' + stringAjax + '</p>');

    };

    return {
        buildPage: buildPage
    }
});