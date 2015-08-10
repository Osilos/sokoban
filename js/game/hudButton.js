define(['js/game/configGame', 'js/utils/display', 'js/game/undoRedo', 'js/game/retry', 'jQuery'], function (config, display, undoRedo, retry) {
    
    var button = function (pClass, pAction, pContainer, pText) {

        this.isClass = pClass;
        this.action = pAction;
        this.container = pContainer || "#game_container";
        this.text = pText || "";
        var that = this;

        this.addClick = function () {
            $('#' + that.action).click(function () {
                if (that.action === "undo") {
                    undoRedo.undoMove();
                }
                else if (that.action === "redo") {
                    undoRedo.redoMove();
                }
                else if (that.action === "retry") {
                    retry.retry();
                }
            });
        };
        //constructeur
        $(this.container).append('<div class="' + this.isClass + '" id="' + this.action + '">' + this.text + '</div>');
        this.addClick();
    };
    
    return {
        button : button
    };
});