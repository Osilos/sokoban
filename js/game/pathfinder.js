define([
        'js/game/configGame',
        'js/game/dataGame',
        'js/utils/utilsGame'
    ],
    function(configGame, dataGame, utilsGame) {

        /**
         * construit la grille de jeu : -1 pour les case blocké et 0 pour les cases libres
         * @return {[array]} [tableau de tableaux représentant la grille du jeu]
         */
        var refreshGrid = function() {
            var grid = [];
            for (var i = 0; i < configGame.heightInTile; i++) {
                grid[i] = [];
                for (var j = 0; j < configGame.widthInTile; j++) {
                    grid[i].push(-1);

                    for (var m = dataGame.levelObject.length - 1; m >= 0; m--) {
                        if (dataGame.levelObject[m].x === j && dataGame.levelObject[m].y === i) {

                            if (dataGame.levelObject[m].name === "mur") {
                                grid[i][j] = -1;
                            } else {
                                var lOccupy = false;
                                for (var k = 0; k < dataGame.potArray.length; k++) {
                                    if (dataGame.potArray[k].x === j && dataGame.potArray[k].y === i) {
                                        lOccupy = true;
                                    }
                                }
                                if (lOccupy) grid[i][j] = -1;
                                else grid[i][j] = 0;
                            }
                        }
                    };
                }
            }
            return grid;
        };

        /**
         * trouve le chemin le plus court entre le player et la pot
         * @param  {[number]} potX    [position en X du pot]
         * @param  {[number]} potY    [position en Y du pot]
         * @param  {[number]} playerX [position en X du player]
         * @param  {[number]} playerY [position en Y du player]
         * @return {[array]}         [tableau du chemin]
         */
        var findWayToPot = function(potX, potY, playerX, playerY) {
            var grid = refreshGrid();
            grid[potY][potX] = 0;
            var way = findWay(playerX, playerY, potX, potY, grid);
            way.shift();
            return way;
        };

        /**
         * trouve le chemin entre la position start et la position end
         * @param  {[number]} posXstart [positione X de départ]
         * @param  {[number]} posYstart [position Y de départ]
         * @param  {[number]} posXend   [position X d'arrivée]
         * @param  {[number]} posYend   [position Y d'arrivée]
         * @param  {[array]} pGrid     [grille du jeu]
         * @return {[array]}           [tableau du chemin]
         */
        var findWay = function(posXstart, posYstart, posXend, posYend, pGrid) {

            var grid = pGrid || refreshGrid();
            var waysuccess = true;

            var cellArray = findFreeCell(posXstart, posYstart, grid, 1);
            var count = 1;

            while (grid[posYend][posXend] === 0) {
                count += 1;
                cellArray = findTheEnd(cellArray, grid, count);

                if (count > configGame.widthInTile * configGame.heightInTile) {
                    waysuccess = false;
                    break;
                } else if (grid[posYend][posXend] != 0 && cellArray.length === 0) {
                    waysucces = true;
                }
            }

            if (waysuccess) {
                var a = buildThePath(posXend, posYend, grid, count);
                return a;
            } else {
                console.log("wrong way");
                return false;
            }
        };

        /**
         * construit le chemin de la case ciblé au joueur
         * @param  {[number]} posX   [position en X de la case ciblé]
         * @param  {[number]} posY   [position en Y de la case ciblé]
         * @param  {[array]} pGrid  [tableau de la grille du jeu]
         * @param  {[number]} pCount [valeur des correspondant au chemin]
         * @return {[array]}        [tableau du chemin]
         */
        var buildThePath = function(posX, posY, pGrid, pCount) {
            var path = [];

            var x = posX;
            var y = posY;

            path.push([posX, posY]);
            while (pGrid[y][x] != 1 && path.length <= pCount) {
                var ltemp = findTheValue(x, y, pGrid, pGrid[y][x] - 1);
                if (ltemp != false) {
                    x = ltemp[0];
                    y = ltemp[1];
                    path.push(ltemp);
                } else break;
            }
            return path;
        };

        /**
         * trouve la case avec la valeur voulue
         * @param  {number} pX     [position en x de la case d'origine]
         * @param  {number} pY     [position en y de la case d'origine]
         * @param  {array} pGrid  [tableau de la grille du jeu]
         * @param  {number} pCount [valeur a trouvé]
         * @return {array}        [tableau de la case correspondante]
         */
        var findTheValue = function(pX, pY, pGrid, pCount) {
            if (leftCell(pY, pX, pGrid) === pCount) {
                return [pX - 1, pY];
            } else if (rightCell(pY, pX, pGrid) === pCount) {
                return [pX + 1, pY];
            } else if (downCell(pY, pX, pGrid) === pCount) {
                return [pX, pY + 1];
            } else if (upCell(pY, pX, pGrid) === pCount) {
                return [pX, pY - 1];
            } else return false;
        };

        /**
         * Appelle la fonction findFreeCell, pour chaque case que trouve cette fonction
         * @param  {array} pArray [tableau de libre]
         * @param  {array} pGrid  [tableau de la table du jeu]
         * @param  {number} pCount [valeur que von prendre les cases qui seront trouvé]
         * @return {array}        [tableau des cases libres trouvés]
         */
        function findTheEnd(pArray, pGrid, pCount) {
            var lcount = pCount + 1;
            var nextCellArray = [];
            for (var i = pArray.length - 1; i >= 0; i--) {

                var lArray = findFreeCell(pArray[i][0], pArray[i][1], pGrid, pCount);
                if (lArray != false) {
                    for (var j = lArray.length - 1; j >= 0; j--) {
                        nextCellArray.push([lArray[j][0], lArray[j][1]]);
                    }
                }
            }
            return nextCellArray;
        };

        /**
         * trouve les cases voisines qui sont libre
         * @param  {[number]} posX    [position en x sur la grille]
         * @param  {[number]} posY    [position en y sur la grille]
         * @param  {[array]} pGrid   [tableau de la table de jeu]
         * @param  {[number]} pNumber [valeur que von prendre les cases libres]
         * @return {[array]}         [tableau des cases libre trouvé]
         */
        function findFreeCell(posX, posY, pGrid, pNumber) {
            var arrayWay = [];
            var number = pNumber || 0;
            pGrid[posY][posX] = pNumber;

            if (leftCell(posY, posX, pGrid) === 0) {
                arrayWay.push([posX - 1, posY]);
                pGrid[posY][posX] = pNumber;
            }
            if (rightCell(posY, posX, pGrid) === 0) {
                arrayWay.push([posX + 1, posY]);
                pGrid[posY][posX] = pNumber;
            }
            if (downCell(posY, posX, pGrid) === 0) {
                arrayWay.push([posX, posY + 1]);
                pGrid[posY][posX] = pNumber;
            }
            if (upCell(posY, posX, pGrid) === 0) {
                arrayWay.push([posX, posY - 1]);
                pGrid[posY][posX] = pNumber;
            }

            if (arrayWay.length === 0) return false;
            return arrayWay;
        }

        /**
         * recupère la valeur de la case de gauche de la case ciblé
         * @param  {[number]} pY    [position en Y de la case ciblé]
         * @param  {[number]} pX    [position en X de la case ciblé]
         * @param  {[array]} pGrid [grille de jeu]
         * @return {[number]}       [valeur de la case de gauche]
         */
        var leftCell = function(pY, pX, pGrid) {
            if (pX - 1 >= 0 && pX - 1 <= configGame.widthInTile && pX > 0) {
                return pGrid[pY][pX - 1];
            } else return false;

        };

        /**
         * recupère la valeur de la case de droite de la case ciblé
         * @param  {[number]} pY    [position en Y de la case ciblé]
         * @param  {[number]} pX    [position en X de la case ciblé]
         * @param  {[array]} pGrid [grille de jeu]
         * @return {[number]}       [valeur de la case de droite]
         */
        var rightCell = function(pY, pX, pGrid) {
            if (pX + 1 >= 0 && pX + 1 <= configGame.widthInTile && pX < pGrid[0].length - 1) {
                return pGrid[pY][pX + 1];
            } else return false;
        };

        /**
         * recupère la valeur de la case en bas de la case ciblé
         * @param  {[number]} pY    [position en Y de la case ciblé]
         * @param  {[number]} pX    [position en X de la case ciblé]
         * @param  {[array]} pGrid [grille de jeu]
         * @return {[number]}       [valeur de la case en bas]
         */
        var downCell = function(pY, pX, pGrid) {
            if (pY + 1 >= 0 && pY + 1 <= configGame.heightInTile && pY < pGrid.length - 1) {
                return pGrid[pY + 1][pX];
            } else return false;
        };

        /**
         * recupère la valeur de la case du haut de la case ciblé
         * @param  {[number]} pY    [position en Y de la case ciblé]
         * @param  {[number]} pX    [position en X de la case ciblé]
         * @param  {[array]} pGrid [grille de jeu]
         * @return {[number]}       [valeur de la case du haut]
         */
        var upCell = function(pY, pX, pGrid) {
            if (pY - 1 >= 0 && pY - 1 <= configGame.heightInTile && pY > 0) {
                return pGrid[pY - 1][pX];
            } else return false;
        };

        return {
            refreshGrid: refreshGrid,
            findWay: findWay,
            findFreeCell: findFreeCell,
            findWayToPot: findWayToPot
        }

    }
);