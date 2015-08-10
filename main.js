require.config({
    paths: {
        'jQuery': 'js/libs/jquery/jquery',
        'howler': 'js/libs/howler/howler'
    },
    shim: {
        'jQuery': {
            exports: '$'
        },
        'howler': {
        exports: 'howler'
    }
    },

    urlArgs: "bust=" + (new Date()).getTime()
});

require(['js/ui/localization', 'js/ui/menu'], function(localization, menu){

    localization.loadData('#LABEL_MENU target', function () {
        menu.buildPage();
    });    
});