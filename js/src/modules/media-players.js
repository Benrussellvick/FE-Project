var plyr = require('../vendors/plyr.min.js');

(function () {
    var s,
    mediaPlayers = {
        settings: {
            videoPlayersEl: document.getElementsByClassName('video-player'),
            audioPlayersEl: document.getElementsByClassName('audio-player')
        },
        init: function () {
            s = this.settings;
            if(s.videoPlayersEl.length > 0){
                mediaPlayers.setupVideoPlayers();
            };
            if(s.audioPlayersEl.length > 0){
                mediaPlayers.setupAudioPlayers();
            };
        },
        mediaTitle: function(mediaDiv){
            //grab title before plyr swaps out for iframes (if YT / Vim)
            var playerInlineConfig = JSON.parse($(mediaDiv.media).attr('data-plyr-config'));
            var title = playerInlineConfig.title;
            if(title){
                var titleDiv = $("<div>", {"class": "plyr__title"});
                //append into plyr controls after init
                mediaDiv.on('ready', event => {
                    titleDiv.insertAfter($(event.target).find('.plyr__controls button[data-plyr="play"]'));
                    $(event.target).find('.plyr__title').text(title);
                });
            }
        },
        mediaPosterImg: function(mediaDiv){
            var posterImage = $(mediaDiv.media).attr('data-plyr-poster-img');
            if(posterImage){
                var posterDiv = $("<div>", {"class": "plyr__poster-override-div"}),
                    copyDiv = $(".c-article-header__media-wrapper-copy");
                // //toDo: merge this function with mediaTitle()
                mediaDiv.on('ready', event => {
                     //tried to use API, but instead:
                    posterDiv.prependTo(event.target);
                    posterDiv.css('background-image', 'url(' + posterImage + ')');
                });

                mediaDiv.on('playing', event => {
                   posterDiv.remove();
                   copyDiv.fadeOut();
               });

            };
        },
        formatTime: function(s){
            var h = Math.floor(s/3600);
            s -= h*3600;
            var m = Math.floor(s/60);
            s -= m*60;
            //hours removed:
            return (m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s);
        },
        fullHeightSetup: function(mediaDiv){
            //currently just handles the spacing of the text wrapper to allow for the height of the player bar, rest is in css
            var parentDiv = $(mediaDiv).parents().eq(2);
            var playerHeight = $(mediaDiv).parent().height();
            //if(parentDiv.hasClass('can-full-height')){
            //parentDiv.find('div[class*=text-wrapper]').css('margin-bottom', playerHeight + 'px');
           // };
        },
        setupVideoPlayers: function (){
           var videoPlayers = plyr.setup('.video-player');
           for (var i = 0; i < videoPlayers.length; i++) {
                mediaPlayers.mediaTitle(videoPlayers[i]);
                mediaPlayers.mediaPosterImg(videoPlayers[i]);

                videoPlayers[i].on('ready', event => {
                    var elements = document.getElementsByClassName("plyr__time");
                    for (var i = 0; i < elements.length; ++i) {
                        elements[i].innerHTML = elements[i].innerHTML.replace(/-/g,'');
                    }
                });

           }
        },
        setupAudioPlayers: function (){
            var audioPlayers = plyr.setup('.audio-player');
            for (var i = 0; i < audioPlayers.length; i++) {
                mediaPlayers.fullHeightSetup(audioPlayers[i].media);
                //media title
                mediaPlayers.mediaTitle(audioPlayers[i]);
                //when loaded append time to the div
                audioPlayers[i].media.onloadeddata = function(event) {
                    $(this).parent().find('.plyr__time').html(mediaPlayers.formatTime(Math.round(this.duration)));
                };
            };
        },
    };
    (function () {
        mediaPlayers.init();
        //$( ".plyr--playing" ).closest( ".c-article-header__media-wrapper-copy" ).addClass( "highlight" );
    })();

})();