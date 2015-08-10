define(['js/game/savePos', 'js/game/dataGame'], function (savePos, dataGame) {
    
    var doRedo = false;
    
    var undoMove = function () {
        savePos.saveRedoPosition();
        doRedo = true;
        for (var i = 0; i < dataGame.movableArray.length; i++){
            dataGame.movableArray[i].x = savePos.lastMovablePositionX[i];
            dataGame.movableArray[i].y = savePos.lastMovablePositionY[i];
            dataGame.movableArray[i].display();
        } 
    };

    var redoMove = function () {
        if (doRedo == false) return;
        for (var i = 0; i < dataGame.movableArray.length; i++){
            dataGame.movableArray[i].x = savePos.redoMovablePositionX[i];
            dataGame.movableArray[i].y = savePos.redoMovablePositionY[i];
            dataGame.movableArray[i].display();
        }
        
        doRedo = false;  
    };
    
    return {
        undoMove : undoMove,
        redoMove : redoMove
    }
});