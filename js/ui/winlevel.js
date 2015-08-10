define(['js/game/dataGame', 'js/game/hudButton', 'js/ui/bouton', 'js/ui/localization'], function (dataGame, hudButton, bouton, localization) {
    

    
    var registerScore = function (pLevel, pScore) {
        $.ajax({
            type: "POST", 
            url: "./php/registerScore.php", 
            data: {"score" : pScore, "level" : pLevel}, 
            success: function(received_data) {
                console.log('données envoyées');
            },
            async: false 
        }).fail(function (data){
            console.log("fail registerScore");
        }); 
    };
    
    var bestScore = function (pLevel, pScore){
        
        
        var score = $.ajax({
            type: "POST", 
            url: "./php/winlevel.php", 
            data: {"level" : pLevel}, 
            success: function(received_data) {
            },
            async: false 
        }).fail(function (data){
        }).responseText; 
        
        if (score == "no_score") score = pScore;
        
        return score;
    };
    
    var buildPage = function (pScore) {
        registerScore(dataGame.levelPlay, pScore);
        var lBestScore = bestScore(dataGame.levelPlay, pScore);
        
        if (dataGame.lvlProgression <= dataGame.levelPlay) dataGame.lvlProgression = dataGame.levelPlay + 1;

            $("#hud_container").fadeOut().empty();
            $("#game_screen").fadeTo("slow", 0.5);

        if (dataGame.levelPlay < 15) {
            $('#body').append('<div id="popUp-Win"> <div class="bouton-container-win"><div class="score-win"> ' + localization.getXml('#LABEL_GG target') + ' ! <br /> Score : ' + pScore + ' <br /> ' + localization.getXml('#LABEL_HIGHSCORE target') + ' : ' + lBestScore + ' </div></div></div>');
            var textForRetry = "<div class='bouton-text'>" + localization.getXml('#LABEL_RETRY target') + "</div>"
            hudButton.button("bouton-win", "retry", ".bouton-container-win", textForRetry);
            var Bouton = require('js/ui/bouton');
            new Bouton(0, 0, "bouton-win", "lvl", localization.getXml('#LABEL_NEXTLEVEL target'), ".bouton-container-win", dataGame.levelPlay + 1);
            new Bouton(0, 0, "bouton-win", "levelSelect", localization.getXml('#LABEL_LEVELSELECTION target'), ".bouton-container-win");
        } else {
            $('#body').append('<div id="popUp-Win"> <div class="bouton-container-win"><div class="score-win"> ' + localization.getXml('#LABEL_FINAL_GG target') + ' <br /> Score : ' + pScore + ' <br /> ' + localization.getXml('#LABEL_HIGHSCORE target') + ' : ' + lBestScore + ' </div></div></div>');
            var textForRetry = "<div class='bouton-text'>" + localization.getXml('#LABEL_RETRY target') + "</div>"
            hudButton.button("bouton-win", "buttun_retry", ".bouton-container-win", textForRetry);
            var Bouton = require('js/ui/bouton');
            new Bouton(0, 0, "bouton-win", "levelSelect", localization.getXml('#LABEL_LEVELSELECTION target'), ".bouton-container-win");
        }
    };
    
    return {
        buildPage : buildPage
    }
});