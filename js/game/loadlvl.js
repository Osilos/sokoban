define(['js/game/dataGame', 'js/game/hud', 'js/game/savePos', 'js/game/configGame', 'js/game/gameObject', 'js/game/border'],
    function(dataGame, hud, undoRedo, config, gameObject, Border) {


        function setSizeTile() {
            if (config.widthInTile > config.heightInTile) {
                config.sizeTile = ($("#game_container").width()) / config.widthInTile;
            } else {
                config.sizeTile = ($("#game_container").height()) / config.heightInTile;
            }
            config.borderSize = Math.floor(config.sizeTile / 4);
            if (config.widthInTile > config.heightInTile) {
                config.sizeTile = ($("#game_container").width() - config.borderSize * 2) / config.widthInTile;
            } else {
                config.sizeTile = ($("#game_container").height() - config.borderSize * 2) / config.heightInTile;
            }
            config.sizeTile = Math.floor(config.sizeTile);
            console.log(config.sizeTile);

        }

        var buildLvl = function(pLvl) {
            $("#body").empty();
            $("#body").append("<div id=game_screen></div>");
            $("#game_screen").append("<div id=game_container><div/>");
            $("#game_screen").append("<div id=hud_container></div>");


            var fileJson = "./LD/niveau" + pLvl + ".json";
            $.getJSON(fileJson, function(json) {
                config.widthInTile = json.config[2].width;
                config.heightInTile = json.config[3].height;
                setSizeTile();

            })
                .fail(function(d, textStatus, error) {
                    console.error("getJSON failed, status: " + textStatus + ", error: " + error);
                })
                .done(function(json) {
                    addObject(json);
                    if (navigator.userAgent.match(/iPad|iPhone|Android|BlackBerry|Windows Phone|webOS/i)) {
                        if (window.innerWidth < window.innerHeight) {
                            var widthContainer = config.widthInTile * config.sizeTile + config.borderSize * 2;
                            var marge = (100 - widthContainer / $(window).width() * 100) / 2;
                            if (marge < 5) marge = 0;
                            $('#game_container').css({
                                marginLeft: marge + '%'
                            });
                        } else {
                            var widthContainer = config.widthInTile * config.sizeTile + config.borderSize * 2;
                            var marge = (100 - widthContainer / ($(window).width() - $("#hud_container").width()) * 100) / 2; //- $("#hud_container").width()
                            //marge -= 20;7+/
                            if (marge < 5) marge = 0;
                            $('#game_container').css({
                                marginLeft: marge + '%'
                            });
                        }
                    } else {
                        var widthContainer = config.widthInTile * config.sizeTile + config.borderSize * 2;
                        var heightContainer = config.heightInTile * config.sizeTile + config.borderSize * 2;
                        var marge = (100 - widthContainer / $(window).width() * 100) / 2;
                        $("#game_screen").css({
                            width: widthContainer + 'px',
                            marginLeft: marge + '%'
                        });
                        $('#game_container').css({
                            width: widthContainer + 'px',
                            height: heightContainer + 'px'
                        });
                        $('#hud_container').css({
                            width: widthContainer + 'px'
                        });
                    }

                    $(window).resize(function() {

                        setSizeTile();
                        for (var i = dataGame.levelObject.length - 1; i >= 0; i--) {
                            dataGame.levelObject[i].display();
                        };
                        for (var i = dataGame.movableArray.length - 1; i >= 0; i--) {
                            dataGame.movableArray[i].display();
                        };
                        for (var i = dataGame.borderArray.length - 1; i >= 0; i--) {
                            dataGame.borderArray[i].displayClass();
                        };
                    });

                    dataGame.numCoupMin = json.config[0].coupMin;
                    dataGame.levelPlay = pLvl;
                    hud.buildHUD();
                    undoRedo.saveLastPosition();

                });
        };

        function addObject(json) {
            var lCount = 0;
            var lCountBorder = 0;
            for (var i = 0; i < json.lvlDesign.length; i++) {
                switch (json.lvlDesign[i].name) {
                    case "border_down":
                        dataGame.borderArray.push(new Border(json.lvlDesign[i].name, json.lvlDesign[i].X, json.lvlDesign[i].Y, lCountBorder++));
                        break;
                    case "border_up":
                        dataGame.borderArray.push(new Border(json.lvlDesign[i].name, json.lvlDesign[i].X, json.lvlDesign[i].Y, lCountBorder++));
                        break;
                    case "border_left":
                        dataGame.borderArray.push(new Border(json.lvlDesign[i].name, json.lvlDesign[i].X, json.lvlDesign[i].Y, lCountBorder++));
                        break;
                    case "border_corner_right_up":
                        dataGame.borderArray.push(new Border(json.lvlDesign[i].name, json.lvlDesign[i].X, json.lvlDesign[i].Y, lCountBorder++));
                        break;
                    case "border_corner_left_up":
                        dataGame.borderArray.push(new Border(json.lvlDesign[i].name, json.lvlDesign[i].X, json.lvlDesign[i].Y, lCountBorder++));
                        break;
                    case "border_corner_left_down":
                        dataGame.borderArray.push(new Border(json.lvlDesign[i].name, json.lvlDesign[i].X, json.lvlDesign[i].Y, lCountBorder++));
                        break;
                    case "border_corner_right_down":
                        dataGame.borderArray.push(new Border(json.lvlDesign[i].name, json.lvlDesign[i].X, json.lvlDesign[i].Y, lCountBorder++));
                        break;
                    case "border_down_left":
                        dataGame.borderArray.push(new Border(json.lvlDesign[i].name, json.lvlDesign[i].X, json.lvlDesign[i].Y, lCountBorder++));
                        break;
                    case "border_down_right":
                        dataGame.borderArray.push(new Border(json.lvlDesign[i].name, json.lvlDesign[i].X, json.lvlDesign[i].Y, lCountBorder++));
                        break;
                    case "border_up_left":
                        dataGame.borderArray.push(new Border(json.lvlDesign[i].name, json.lvlDesign[i].X, json.lvlDesign[i].Y, lCountBorder++));
                        break;
                    case "border_up_right":
                        dataGame.borderArray.push(new Border(json.lvlDesign[i].name, json.lvlDesign[i].X, json.lvlDesign[i].Y, lCountBorder++));
                        break;
                    case "border_right":
                        dataGame.borderArray.push(new Border(json.lvlDesign[i].name, json.lvlDesign[i].X, json.lvlDesign[i].Y, lCountBorder++));
                        break;
                    case "Case":
                        dataGame.levelObject.push(new gameObject.Case(json.lvlDesign[i].X, json.lvlDesign[i].Y, lCount++));
                        break;
                    case "Mur":
                        dataGame.levelObject.push(new gameObject.Mur(json.lvlDesign[i].X, json.lvlDesign[i].Y, lCount++));
                        break;
                    case "Cible":
                        var lCible = new gameObject.Cible(json.lvlDesign[i].X, json.lvlDesign[i].Y, lCount++, json.lvlDesign[i].color);
                        dataGame.levelObject.push(lCible);
                        dataGame.cibleArray.push(lCible);
                        break;
                    case "CaseMove":
                        dataGame.levelObject.push(new gameObject.CaseMove(json.lvlDesign[i].X, json.lvlDesign[i].Y, lCount++, json.lvlDesign[i].direction));
                        break;
                    case "Player":
                        dataGame.player = new gameObject.Player(json.lvlDesign[i].X, json.lvlDesign[i].Y);
                        dataGame.movableArray.push(dataGame.player);
                        break;
                    case "Pot":
                        var lPot = new gameObject.Pot(json.lvlDesign[i].X, json.lvlDesign[i].Y, i, json.lvlDesign[i].color);
                        dataGame.potArray.push(lPot);
                        dataGame.movableArray.push(lPot);
                        break;
                }

            }


        }

        return {
            buildLvl: buildLvl
        };
    });