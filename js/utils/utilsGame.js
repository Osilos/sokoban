define(['js/game/configGame', 'js/game/dataGame'], function(config, dataGame) {


    /*
     *@param pNumber coordonnée donné
     * convertie une coordonée "absolute" en coordonné sur la grille
     */
    var positionToGrid = function(pNumber) {
        return Math.floor(pNumber / config.sizeTile);
    };

    /*
     *@param un object a déplacer
     *Déplace l'objet vers la gauche de une case
     */
    var moveLeft = function(pObject) {
        pObject.x -= 1;
        pObject.display();
    };

    /*
     *@param un object a déplacer
     *Déplace l'objet vers la droite une case
     */
    var moveRight = function(pObject) {
        pObject.x += 1;
        pObject.display();
    };

    /*
     *@param un object a déplacer
     *Déplace l'objet vers le haut de une case
     */
    var moveUp = function(pObject) {
        pObject.y -= 1;
        pObject.display();
    };

    /*
     *@param un object a déplacer
     *Déplace l'objet vers le bas de une case
     */
    var moveDown = function(pObject) {
        pObject.y += 1;
        pObject.display();
    };

    /*
     *@param pX position en X
     *@param pY position en Y
     *Convertie les coordonnées sur la grille en ID
     */
    var positionToID = function(pX, pY) {
        return pX + config.widthInTile * pY;
    };

    return {
        positionToGrid: positionToGrid,
        moveDown: moveDown,
        moveLeft: moveLeft,
        moveRight: moveRight,
        moveUp: moveUp,
        positionToID: positionToID
    };

});