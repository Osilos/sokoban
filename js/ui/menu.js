define (['js/ui/bouton', 'js/ui/localization', 'js/utils/soundManager', 'jQuery'], function(Bouton, localization, soundManager){
    var musiclunch = false;
    var buildPage = function (){
        $("#body").empty();
        $("#body").append('<div id="uiContainer"></div>').hide().fadeIn();
        new Bouton(0 , 0, "bouton", "levelSelect", localization.getXml('#LABEL_PLAY target'), '#uiContainer', 0);
        new Bouton(0 , 0, "bouton", "highScore", localization.getXml('#LABEL_HIGHSCORE target'), '#uiContainer', 1);
        new Bouton(0 , 0, "bouton", "stats", localization.getXml('#LABEL_STATISTICS target'), '#uiContainer', 2);
        new Bouton(0 , 0, "bouton", "aide", localization.getXml('#LABEL_HELP target'), '#uiContainer',3);
        
        if (!musiclunch) {
            soundManager.dropTheBass('sokonice', 0.5, true);
            musiclunch = true;
        }
    };
    return {
        buildPage : buildPage
    }
});