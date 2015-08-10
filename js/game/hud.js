define(['js/game/dataGame', 'js/game/hudButton', 'js/ui/bouton', 'js/ui/localization'], function (dataGame, hudButton, Bouton, localization) {
    
    
    var buildHUD = function () {
        $("#game_container").append('<div class="hud-info">' + localization.getXml('#LABEL_LEVEL target') + ' '+ dataGame.levelPlay + '</div>')
        var button1 = new hudButton.button("bouton-hud", "undo", "#hud_container", '<div class="bouton-text">' +localization.getXml('#LABEL_UNDO target')+ '</div>' );
        var button2 = new hudButton.button("bouton-hud", "redo" , "#hud_container", '<div class="bouton-text">' +localization.getXml('#LABEL_REDO target') +'</div>' );
        var button3 = new hudButton.button("bouton-hud", "retry", "#hud_container", '<div class="bouton-text">' +localization.getXml('#LABEL_RETRY target')+ '</div>');
        var button4 = require('js/ui/bouton');
        new button4(0 , 0, "bouton-hud", "levelSelect", localization.getXml('#LABEL_QUIT target'), '#hud_container');
    };
    
    return {
        buildHUD : buildHUD
    };
});