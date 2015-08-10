define(['js/ui/localization','jQuery'], function (localization) {
    console.log(localization.getXml('#LABEL_LOGINPLACEHOLDER target'));
    var logIn = function () {
    	$("#body").append('<div class="logo">Seaux-Koban</div>');
        $("#body").append('<form method="post" action="./php/login.php"><input class="log-field" type="text" name="login" value="" placeholder="' + localization.getXml('#LABEL_LOGINPLACEHOLDER target') + '"><input type="submit" class="log-submit" name="commit" value="' + localization.getXml('#LABEL_LOGIN target') + '"></form>');
    };
    return {
        logIn: logIn
    };

});
/*
 */