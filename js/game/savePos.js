define(['js/game/dataGame', 'js/game/loadlvl', 'jQuery'], function (dataGame, loadlvl) {
    var lastMovablePositionX = new Array(dataGame.movableArray.length);
    var lastMovablePositionY = new Array(dataGame.movableArray.length);
    var redoMovablePositionX = new Array(dataGame.movableArray.length);
    var redoMovablePositionY = new Array(dataGame.movableArray.length);
    
    var saveLastPosition = function () {
        for (var i = 0; i < dataGame.movableArray.length ; i++){
            var lPosx = dataGame.movableArray[i].x;
            var lPosy = dataGame.movableArray[i].y;
            lastMovablePositionX[i] = lPosx;
            lastMovablePositionY[i] = lPosy;
        }
    };
    
    var saveRedoPosition = function () {
        for (var i = 0; i < dataGame.movableArray.length ; i++){
            var lPosx = dataGame.movableArray[i].x;
            var lPosy = dataGame.movableArray[i].y;
            redoMovablePositionX[i] = lPosx;
            redoMovablePositionY[i] = lPosy;
        } 
    };
    

    
    return {
        saveLastPosition : saveLastPosition, 
        saveRedoPosition : saveRedoPosition, 
        redoMovablePositionX : redoMovablePositionX,
        redoMovablePositionY : redoMovablePositionY,
        lastMovablePositionX : lastMovablePositionX,
        lastMovablePositionY : lastMovablePositionY,
        
    };
});