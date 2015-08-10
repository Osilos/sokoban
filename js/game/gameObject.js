define(['js/utils/display', 'js/game/checkTo', 'js/game/dataGame', 'js/utils/soundManager', 'jQuery'], function(display, checkTo, dataGame, soundManager) {

    var Mur = function(pX, pY, pID) {
        //Propriétés
        this.ID = pID;
        this.name = "mur";
        this.x = pX;
        this.y = pY;
        var that = this;
        //Méthode
        this.display = function() {
            display.displayObject('#mur' + this.ID, this.x, this.y);
        }

        this.addClick = function() {
            $('#mur' + this.ID).click(function() {
                checkTo.checkToMoveOnWall(that);
            });
        };

        //Constructeur
        $("#game_container").append('<div class="mur" id="mur' + this.ID + '"></div>');
        this.display();
        this.addClick();
    };

    var Cible = function(pX, pY, pID, pColor) {
        //Propriétés
        this.ID = pID;
        this.name = "cible";
        this.color = pColor;
        this.x = pX;
        this.y = pY;

        //Méthode
        this.display = function() {
            display.displayObject('#cible' + this.ID, this.x, this.y);
        }
        this.addClick = function() {
            $('#cible' + this.ID).click(function() {
                checkTo.checkToMovePlayer(that.x, that.y);
            });
        }

        //Variables locales
        var that = this;

        //Constructeur
        $("#game_container").append('<div class="cible' + this.color + '" id="cible' + this.ID + '"></div>');
        this.display();
        this.addClick();
    };

    var Case = function(pX, pY, pID) {

        //Propriété
        this.ID = pID;
        this.name = "Case";
        this.x = pX;
        this.y = pY;

        //Méthode
        this.display = function() {
            display.displayObject('#case' + this.ID, this.x, this.y);
        }

        this.addClick = function() {
            $('#case' + this.ID).click(function() {
                checkTo.checkToMovePlayer(that.x, that.y);
            });
        }

        //variable locale
        var that = this;

        //constructeur
        $("#game_container").append('<div class="case" id="case' + this.ID + '"></div>');
        this.display();
        this.addClick();
    };

    var Player = function(pX, pY) {

        //Propriété
        this.x = pX;
        this.y = pY;

        //Méthode
        this.display = function() {
            display.displayObject('#player', this.x, this.y);
            soundManager.dropTheBass('step');
        }

        this.clear = function() {
            clearInterval(this.timer);
            this.timer = 0;
        }

        this.timer = setInterval(checkTo.checkCaseMoveAllPot, 200);

        var timerMove = 0;
        var moveWay = 0;
        this.moveByWay = function(pWay) {
            if (timerMove != 0) {
                moveWay = pWay;
            } else {
                moveWay = pWay;
                timerMove = setInterval(function() {
                    that.move(that);
                }, 200);

            }
        };

        this.move = function(that) {

            var index = moveWay.length - 1;
            if (index < 0) {
                clearInterval(timerMove);
                timerMove = 0;
            } else {

                that.x = moveWay[index][0];
                that.y = moveWay[index][1];
                that.display();
                moveWay.pop();
            }
        };

        var that = this;
        //Constructeur
        $("#game_container").append('<div id=player></div>');
        display.displayObject('#player', this.x, this.y);
    };

    var Pot = function(pX, pY, pID, pColor) {

        //Propriétés
        this.ID = pID;
        this.name = "pot";
        this.color = pColor;
        this.x = pX;
        this.y = pY;

        //Methodes
        this.display = function() {
            display.displayObject('#pot' + this.ID, this.x, this.y);
            soundManager.dropTheBass('scrape');
        };

        this.addClick = function() {
            $('#pot' + this.ID).click(function() {
                checkTo.checkToMovePot(that);
            });
        };

        //Variable locale
        var that = this;

        //Constructeur
        $("#game_container").append('<div class="pot' + this.color + '" id="pot' + this.ID + '"></div>');
        display.displayObject('#pot' + this.ID, this.x, this.y);
        this.addClick();
    }

    var CaseMove = function(pX, pY, pID, pDirection) {

        //Propriétés
        this.ID = pID;
        this.direction = pDirection;
        this.name = "CaseMove" + pDirection;
        this.x = pX;
        this.y = pY;
        this.frame = 1;
        this.timerAnim = 0;
        //Méthodes
        this.display = function() {
            display.displayObject('#caseMove' + this.ID, this.x, this.y);
        }

        //Variable locale
        var that = this;
        var frame = 0;

        function anim() {
            if (frame < 3) {
                frame++;
            } else if (frame === 3) {
                //console.log();
                //lpos = - $('.caseMove'+ pDirection).width();
                frame = 0;
            }
            var lpos = frame * (-$('.caseMove' + pDirection).width());
            $('.caseMove' + pDirection).css({
                backgroundPosition: lpos + 'px, 0px'

            });
        }

        this.timerAnim = setInterval(anim, 250);

        this.clearTimer = function() {
            clearInterval(this.timerAnim);
            this.timerAnim = 0;
        };

        this.addClick = function() {
            $('#caseMove' + this.ID).click(function() {
                checkTo.checkToMovePlayer(that.x, that.y);
            });
        }



        //Constructeur
        $("#game_container").append('<div class="caseMove' + pDirection + '" id="caseMove' + this.ID + '"></div>');
        this.display();
        this.addClick();
    };

    return {
        Mur: Mur,
        Cible: Cible,
        Case: Case,
        Player: Player,
        CaseMove: CaseMove,
        Pot: Pot
    };
});