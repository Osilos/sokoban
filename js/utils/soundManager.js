define (['howler'], function () {


    var dropTheBass = function(pSound, pVolume, pLoop){
        var loop = pLoop || false;
        var volumePower = pVolume || 1;
        var url = './sounds/'+ pSound +'.mp3';
        if(pLoop){
            var sound = new Howl({
                urls: [url],
                loop: true,
                volume : volumePower
            }).play();
        }
        else {
            var sound = new Howl({
                urls: [url],
                volume : volumePower
            }).play();
        }


    };

    return {
        dropTheBass: dropTheBass
    }

});