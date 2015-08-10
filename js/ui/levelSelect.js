    define(['js/ui/bouton', 'js/ui/localization', 'js/game/dataGame', 'jQuery'] , function (Bouton, localization, dataGame) {
    var buildPage = function () {
        
        var bouton = require('js/ui/bouton');
        $("#body").empty();
        $("body").append('<div id="uiContainer"></div>');

        new bouton(0, 0, "bouton-retour", "menu", localization.getXml('#LABEL_BACK target'), "#uiContainer");
        for (var i = 1; i <= 15; i++){
            if (i <= dataGame.lvlProgression) {
            	if (dataGame.lvlScore[i] === undefined) dataGame.lvlScore[i] = 0;
                var button = new bouton(i * 100, 3, "bouton-lvl-unlock", "lvl", localization.getXml('#LABEL_LEVEL target') +' '+ i, "#uiContainer", i, dataGame.lvlScore[i]);
            } else {
                var button = new bouton(i * 100, 3, "bouton-lvl-lock", "none", localization.getXml('#LABEL_LEVEL target') +' '+ i, "#uiContainer", i);
            }
        }
    }
    return {
        buildPage : buildPage
    }
});