define(['js/game/configGame', 'jQuery'], function(configGame){
    
    /**
     * [displayObject affiche un objet]
     * @param  {[string]} pClass [class css de l'objet]
     * @param  {[number]} pX     [position en X de l'objet]
     * @param  {[number]} pY     [position en Y de l'objet]
     * @return {[null]}        [nothing]
     */
    var displayObject = function (pClass, pX, pY){
        
        if ($(pClass).width() != configGame.sizeTile) {
            $(pClass).css({'width':configGame.sizeTile +'px', 'height': configGame.sizeTile + 'px'});
        }

        var x = pX * configGame.sizeTile + configGame.borderSize;
        var y = pY * configGame.sizeTile + configGame.borderSize;

        $(pClass).animate(
            {
                left : x + 'px',
                top: y + 'px'
            }, 200

        );
    };
    
    return {
        displayObject : displayObject
    }
    
});