require.config({
    paths: {
        'jQuery': 'js/libs/jquery/jquery',
        'pathfinding': 'js/libs/pathfinding/PathFinding'
    },
    shim: {
        'jQuery': {
            exports: '$'
        },
        'pathfinding' : {
            exports: 'PF'
        }
    }
});
requirejs.config({
    urlArgs: "bust=" + (new Date()).getTime()
});

require(['./js/ui/login.js', 'js/ui/localization'], function(login, localization){
    
    localization.loadData('#LABEL_MENU target', function () {
        login.logIn();
    });
    
});