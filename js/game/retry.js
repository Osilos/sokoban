define(['js/game/loadlvl', 'js/game/dataGame', 'jQuery'], function(loadlvl, dataGame) {

    var retry = function() {
        $("#game_container").empty();

        for (var i = 0; i < dataGame.levelObject.length; i++) {
            var lname = dataGame.levelObject[i].name;
            if (lname.indexOf("CaseMove") >= 0) {
                dataGame.levelObject[i].clearTimer();
            }
        }
        dataGame.levelObject = new Array();
        dataGame.potArray = new Array();
        dataGame.cibleArray = new Array();
        dataGame.movableArray = new Array();
        dataGame.borderArray = new Array();
        if (dataGame.player != null) dataGame.player.clear();
        dataGame.player = null;
        dataGame.numCoupMin = 0;
        dataGame.numCoup = 0;

        require("js/game/loadlvl").buildLvl(dataGame.levelPlay);
    };

    return {
        retry: retry
    };
});