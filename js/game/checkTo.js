define([
        'js/utils/utilsGame',
        'js/game/dataGame',
        'js/game/savePos',
        'js/ui/winlevel',
        'js/game/pathfinder',
        'js/utils/soundManager'
    ],
    function(utils, dataGame, savePos, winlevel, pathfinder, soundManager) {

        var checkToMovePlayer = function(pX, pY) {
            var lX = pX;
            var lY = pY;
            var lDistanceX = dataGame.player.x - lX;
            var lDistanceY = dataGame.player.y - lY;

            if (Math.abs(lDistanceX) > 1 || Math.abs(lDistanceY) > 1 || Math.abs(lDistanceX) == 1 && Math.abs(lDistanceY) == 1) {

                var way = pathfinder.findWay(dataGame.player.x, dataGame.player.y, lX, lY);

                if (way.length != 0) {
                    way.pop();
                    dataGame.player.moveByWay(way);
                }
                return;
            }
            if (lDistanceX == 1 && lDistanceY == 0) {
                savePos.saveLastPosition();
                utils.moveLeft(dataGame.player);
            }
            if (lDistanceX == -1 && lDistanceY == 0) {
                savePos.saveLastPosition();
                utils.moveRight(dataGame.player);
            }
            if (lDistanceX == 0 && lDistanceY == 1) {
                savePos.saveLastPosition();
                utils.moveUp(dataGame.player);
            }
            if (lDistanceX == 0 && lDistanceY == -1) {
                savePos.saveLastPosition();
                utils.moveDown(dataGame.player);
            }
        };

        var checkCaseMoveAllPot = function() {
            for (var i = 0; i < dataGame.potArray.length; i++) {

                checkCaseMovePot(dataGame.potArray[i]);
            }
            checkWin();
        };

        var checkCaseMovePot = function(pPot) {

            var id = 0;
            for (var i = dataGame.levelObject.length - 1; i >= 0; i--) {
                if (dataGame.levelObject[i].x === pPot.x && dataGame.levelObject[i].y === pPot.y) {
                    id = i;
                }
            }

            if (dataGame.levelObject[id] == undefined) return;
            if (dataGame.levelObject[id].name != "CaseMoveleft" && dataGame.levelObject[id].name != "CaseMoveright" && dataGame.levelObject[id].name != "CaseMoveup" && dataGame.levelObject[id].name != "CaseMovedown") {
                return;
            }
            if (dataGame.levelObject[id].name == "CaseMoveleft") {
                if (checkFree(pPot.x - 1, pPot.y)) {
                    utils.moveLeft(pPot);
                }
            } else if (dataGame.levelObject[id].name == "CaseMoveright") {
                if (checkFree(pPot.x + 1, pPot.y)) {
                    utils.moveRight(pPot);
                }
            } else if (dataGame.levelObject[id].name == "CaseMoveup") {
                if (checkFree(pPot.x, pPot.y - 1)) {
                    utils.moveUp(pPot);
                }
            } else if (dataGame.levelObject[id].name == "CaseMovedown") {
                if (checkFree(pPot.x, pPot.y + 1)) {
                    utils.moveDown(pPot);
                }
            }
        };

        var checkToMoveOnWall = function (mur) {
            var lPosPlayerX = dataGame.player.x - mur.x;
            var lPosPlayerY = dataGame.player.y - mur.y;

            if (Math.abs(lPosPlayerX) > 1 || Math.abs(lPosPlayerY) > 1 || Math.abs(lPosPlayerX) == 1 && Math.abs(lPosPlayerY) == 1) {

                var way = pathfinder.findWayToPot(mur.x, mur.y, dataGame.player.x, dataGame.player.y);

                if (way != false) {
                    dataGame.player.moveByWay(way);
                }
            }
        };

        var checkToMovePot = function(pot) {

            var lPosPlayerX = dataGame.player.x - pot.x;
            var lPosPlayerY = dataGame.player.y - pot.y;

            if (Math.abs(lPosPlayerX) > 1 || Math.abs(lPosPlayerY) > 1 || Math.abs(lPosPlayerX) == 1 && Math.abs(lPosPlayerY) == 1) {

                var way = pathfinder.findWayToPot(pot.x, pot.y, dataGame.player.x, dataGame.player.y);

                if (way != false) {
                    dataGame.player.moveByWay(way);
                }
            }

            if (lPosPlayerX == 1 && lPosPlayerY == 0) {
                if (checkFree(pot.x - 1, pot.y)) {
                    dataGame.numCoup++;
                    savePos.saveLastPosition();
                    utils.moveLeft(pot);
                    utils.moveLeft(dataGame.player);
                }
            }
            if (lPosPlayerX == -1 && lPosPlayerY == 0) {
                if (checkFree(pot.x + 1, pot.y)) {

                    dataGame.numCoup++;
                    savePos.saveLastPosition();
                    utils.moveRight(pot);
                    utils.moveRight(dataGame.player);
                }
            }
            if (lPosPlayerX == 0 && lPosPlayerY == 1) {
                if (checkFree(pot.x, pot.y - 1)) {
                    dataGame.numCoup++;
                    savePos.saveLastPosition();
                    utils.moveUp(pot);
                    utils.moveUp(dataGame.player);
                }
            }
            if (lPosPlayerX == 0 && lPosPlayerY == -1) {
                if (checkFree(pot.x, pot.y + 1)) {
                    dataGame.numCoup++;
                    savePos.saveLastPosition();
                    utils.moveDown(pot);
                    utils.moveDown(dataGame.player);
                }
            }
            checkWin();
        };

        var checkFree = function(pX, pY) {

            var inGrid = false;
            for (var l = dataGame.levelObject.length - 1; l >= 0; l--) {

                if (dataGame.levelObject[l].x === pX && dataGame.levelObject[l].y === pY) {
                    inGrid = true;
                    if (dataGame.levelObject[l].name === "mur" || dataGame.levelObject[l].name === "undefined") {
                        return false;
                    }
                }
            }

            if (!inGrid) return false;

            for (var i = 0; i < dataGame.potArray.length; i++) {

                if (dataGame.potArray[i].x == pX && dataGame.potArray[i].y == pY) return false;
            }
            if (dataGame.player.x == pX && dataGame.player.y == pY) return false;
            return true;

        };

        var checkWin = function() {
            var lCible = dataGame.cibleArray.length;
            var lCheck = 0;
            var sameColor = 0;
            var star = dataGame.numCoupMin >= dataGame.numCoup ? 2 : 1;
            var score = dataGame.numCoup * 10; 
            for (var i = 0; i < dataGame.cibleArray.length; i++) {
                for (var j = 0; j < dataGame.potArray.length; j++) {
                    if (dataGame.cibleArray[i].x == dataGame.potArray[j].x && dataGame.cibleArray[i].y == dataGame.potArray[j].y) {
                        lCheck++;
                        if (dataGame.cibleArray[i].color == dataGame.potArray[j].color) {
                            sameColor++;
                        }
                    }
                }
            }
            if (lCheck == lCible && lCheck == sameColor) {

                for (var i = 0; i < dataGame.levelObject.length; i++) {
                    if (dataGame.levelObject[i].name.indexOf("CaseMove") >= 0) {
                        dataGame.levelObject[i].clearTimer();
                    }
                }
                dataGame.levelObject = new Array();
                dataGame.potArray = new Array();
                dataGame.cibleArray = new Array();
                dataGame.movableArray = new Array();
                dataGame.borderArray = new Array();
                dataGame.player.clear();
                dataGame.player = null;
                dataGame.numCoupMin = 0;
                dataGame.numCoup = 0;
                dataGame.lvlScore[dataGame.levelPlay] = star;
                soundManager.dropTheBass('liquidFill');

                winlevel.buildPage(score);
            }
        };

        return {
            checkToMovePlayer: checkToMovePlayer,
            checkToMovePot: checkToMovePot,
            checkCaseMoveAllPot: checkCaseMoveAllPot,
            checkToMoveOnWall : checkToMoveOnWall
        }
    });