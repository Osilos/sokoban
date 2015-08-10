define(['js/ui/bouton', 'js/ui/localization'], function (button, localization){
    var buildPage = function () {
        $("#body").empty();
        $("#body").append('<div id="uiContainer"></div>');

        var Bouton = require('js/ui/bouton');
        new Bouton(0, 0, "bouton", "menu", localization.getXml('#LABEL_BACK target'), "#uiContainer");

        $("#uiContainer").append("<div id=aide></div>");

        $("#aide").append("<p>"+localization.getXml('#HELP_HOWTOPLAY1 target')+"<br /><br /> "
                +localization.getXml('#HELP_HOWTOPLAY2 target')+"<br /><br />"
                +localization.getXml('#HELP_HOWTOPLAY3 target')+"<br /><br />"
                +localization.getXml('#HELP_HOWTOPLAY4 target')+"<br /><br />"
                +localization.getXml('#HELP_HOWTOPLAY5 target')+"<br /><br >"
                +localization.getXml('#HELP_HOWTOPLAY6 target')+"</p>");
    };
    
    return {
        buildPage : buildPage
    }
});