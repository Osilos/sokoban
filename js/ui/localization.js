define(['jQuery'], function () {
    
    var lang = navigator.language;
    
    if (lang !== 'fr' && lang !== 'en') lang = 'en';
    
    var source = './localization/' + lang + '/main.xliff';
    var myXliff = null;
    var xml = null;
    
    var loadData = function (pLabel, callback) {
        if (myXliff === null) {
            $.get(source, function (data) {
                myXliff = data;
                xml = $.parseXML(myXliff);
                callback(); 
            });
        } else {
            callback();
        }
    };
    
    var getXml = function (pLabel) {
        var ltext = $(xml).find(pLabel).text();
        return ltext;
    };
    
    return {
        loadData : loadData,
        getXml : getXml
    };
});