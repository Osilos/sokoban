define(['js/utils/display',
    'js/ui/levelSelect',
    'js/ui/highScore',
    'js/ui/stats',
    'js/ui/aide',
    'js/game/loadlvl',
    'js/game/configGame',
    'js/ui/menu',
    'js/utils/soundManager',
    'js/game/dataGame'
], function(display, levelSelect, highScore, stats, aide, loadlvl, configGame, menu, soundManager, dataGame) {

    function bouton(pX, pY, pClassCss, pAction, pText, pContainer, plvl, pStar) {

        this.x = pX;
        this.y = pY;
        this.classCss = pClassCss;
        this.action = pAction;
        this.text = pText || this.classCss;
        this.container = pContainer || "#body";
        this.lvl = plvl || null;
        this.star = pStar || 0;

        var that = this;
        //Méthode
        this.display = function() {
            display.displayObject('#' + this.classCss, this.x, this.y);
        };

        this.addClick = function() {
            $('#' + this.classCss + '_' + this.lvl).click(function() {
                soundManager.dropTheBass('click');
                if (that.action === "levelSelect") {
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
                    if (dataGame.player != null ) dataGame.player.clear();
                    dataGame.player = null;
                    dataGame.numCoupMin = 0;
                    dataGame.numCoup = 0;
                    require('js/ui/levelSelect').buildPage();

                } else if (that.action === "highScore") {
                    require('js/ui/highScore').buildPage();

                } else if (that.action === "stats") {
                    require('js/ui/stats').buildPage();

                } else if (that.action === "aide") {
                    require('js/ui/aide').buildPage();

                } else if (that.action === "lvl") {
                    loadlvl.buildLvl(that.lvl);

                } else if (that.action === "menu") {
                    require('js/ui/menu').buildPage();
                } else if (that.action === "none" && that.lvl >= 15) {
                    that.lvl++;
                    if (that.lvl >= 25) {
                        dataGame.lvlProgression = that.lvl;
                        require('js/ui/menu').buildPage();
                    }
                }
            });
        };

        //constructeur
        $(this.container).append('<div class="' + this.classCss + '" id="' + this.classCss + '_' + this.lvl + '"><div class="bouton-text">' + this.text + '</div></div>');
        if (this.star === 2) $('#' + this.classCss+ '_' + this.lvl).css({
            "background-color": "#15B91A"
        });

        this.display();
        this.addClick();
    };

    return bouton;
});