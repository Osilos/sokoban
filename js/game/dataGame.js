define([], function() {

    var levelObject = new Array();
    var potArray = new Array();
    var cibleArray = new Array();
    var movableArray = new Array();
    var borderArray = new Array();
    var player = null;
    var numCoupMin = 0;
    var numCoup = 0;
    var levelPlay = 0;
    var lvlProgression = 1;
    var lvlScore = [];

    return {
        levelObject: levelObject,
        potArray: potArray,
        cibleArray: cibleArray,
        movableArray: movableArray,
        player: player,
        numCoupMin: numCoupMin,
        levelPlay: levelPlay,
        borderArray: borderArray,
        lvlProgression: lvlProgression,
        numCoup: numCoup,
        lvlScore: lvlScore
    };
});