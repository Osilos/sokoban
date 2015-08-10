define(['js/game/configGame', 'jQuery'], function(configGame) {

    function Border(name, pX, pY, pID) {
        this.name = name;
        this.class = this.name;
        this.classbis = null;
        this.id = this.name + pID;

        if (this.name.indexOf("corner") < 0) {
            if ((this.name.indexOf("left") >= 0 || this.name.indexOf("right") >= 0) && (this.name.indexOf("down") >= 0 || this.name.indexOf("up") >= 0)) {
                if (this.name.indexOf("left") >= 0) {
                    this.class = "border_left";
                } else {
                    this.class = "border_right";
                }
                if (this.name.indexOf("up") >= 0) {
                    this.classbis = "border_up";
                } else {
                    this.classbis = "border_down";
                }
            }
        }

        this.appendBorder = function(pClass, pName) {
            var lClass = pClass || this.class;
            var lName = pName || this.name;

            $('#game_container').append("<div class=" + lClass + " id=" + this.id + lName + "></div>");



            this.display(lName, lClass);
        }

        this.displayClass = function () {
            this.display(this.class, this.class);
            if (this.classbis != null) {
                this.display(this.classbis, this.classbis);
            }
        }

        this.display = function(lName, lClass) {
                if (lName === "border_down" || lName === "border_up") {
                    $('.' + lClass).css({
                        'width': configGame.sizeTile + 'px'
                    });
                    $('.' + lClass).css({
                        'height': configGame.borderSize + 'px'
                    });
                } else if (lName === "border_left" || lName === "border_right") {
                    $('.' + lClass).css({
                        'height': configGame.sizeTile + 'px'
                    });
                    $('.' + lClass).css({
                        'width': configGame.borderSize + 'px'
                    });
                } else {
                    $('.' + lClass).css({
                        'width': configGame.borderSize + 'px'
                    });
                    $('.' + lClass).css({
                        'height': configGame.borderSize + 'px'
                    });
                }

                this.x = pX * configGame.sizeTile;
                this.y = pY * configGame.sizeTile;
                if (this.y > 0) this.y += configGame.borderSize - configGame.sizeTile;
                if (this.x > 0) this.x += configGame.borderSize - configGame.sizeTile;

                if (lName.indexOf("right") >= 0 && this.x > 0) this.x += configGame.sizeTile - configGame.borderSize;
                if (lName.indexOf("down") >= 0 && this.y > 0) this.y += configGame.sizeTile - configGame.borderSize;

                $('#' + this.id + lName).css({
                    'left': this.x + 'px',
                    'top': this.y + 'px'
                });

            };

        if (this.classbis != null) {
            this.appendBorder(this.classbis, this.classbis);
        }
        this.appendBorder(this.class, this.class);




    }

    return Border;
});