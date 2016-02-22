
hero_video = {

  app: function() {

    // Required JS
    var required_js = [
      'js/tubeplayer.min.js'
    ];

    // Required CSS
    var required_css = [
      'css/video_bigbox.min.css'
    ];


    // JS HTML
    var js_i = 0;
    var js_html = '';

    $(required_js).each(function () {
      if (!$('head script[src="' + required_js[js_i] + '"]').length > 0) {
        js_html = '<script type="text/javascript" src="' + required_js[js_i] + '"></script>';
      }
      ++js_i;
    });


    // CSS HTML
    var css_i = 0;
    var css_html = '';

    $(required_css).each(function () {
      if (!$('head link[href="' + required_css[css_i] + '"]').length > 0) {
        css_html += '<link href="' + required_css[css_i] + '" rel="stylesheet">';
      }
      ++css_i;
    });

    $('head').append(js_html + css_html);


    // Destination
    var destination = video_bigbox_setup.destination;

    // Hero Video HTML
    var video_html = '<div class="cover" style="background-image:url(' + video_bigbox_setup.cover + ')"></div>';

    video_html +=
      '<div class="clicktag"></div>' +
      '<div class="controls column_wrapper">' +
      '   <div class="play_pause">' +
      '       <div class="icon play hide"></div>' +
      '       <div class="icon pause"></div>' +
      '   </div>' +
      '   <div class="volume">' +
      '       <div class="icon mute hide"></div>' +
      '       <div class="icon unmute"></div>' +

      '   </div>' +
      '</div>';


    // Document Ready
    $( document ).ready(function() {

      $(destination).html('<div class="video_bigbox_pkg" style="display: none;">' + video_html + '</div>');

      $(destination + ' .video_bigbox_pkg').tubeplayer({
        width: 300, // the width of the player
        height: 500, // the height of the player
        autoPlay: true,
        loop: 1,
        allowFullScreen: "true", // true by default, allow user to go full screen
        initialVideo: video_bigbox_setup.youtube_id, // the video that is loaded into the player
        preferredQuality: "default",// preferred quality: default, small, medium, large, hd720
        onPlay: function(id){}, // after the play method is called
        onPlayerPlaying: function(){
          mute_first_play();
          $(destination + ' iframe').addClass('on');
          $(destination + ' .cover').delay(800).fadeOut();
        },
        onPause: function(){}, // after the pause method is called
        onStop: function(){}, // after the player is stopped
        onSeek: function(time){}, // after the video has been seeked to a defined point
        onPlayerCued: function(){},
        onMute: function(){}, // after the player is muted
        onUnMute: function(){} // after the player is unmuted
      });

    });





    //mute on auto-play
    function mute_first_play(){
      if(!$(destination + ' .video_bigbox_pkg').hasClass('played') ){
        $(destination + ' .video_bigbox_pkg .mute').click();
        $(destination + ' .video_bigbox_pkg').addClass('played');
      }
    }



    //Controls click
    $(document).on('click', destination + ' .icon', function() {

        $(this).addClass('hide');

        //pause
        if($(this).hasClass('pause')){
          $(destination + ' .play').removeClass('hide');
          $(destination + ' .video_bigbox_pkg').tubeplayer('pause');
        }

        //play
        if($(this).hasClass('play')){
          $(destination + ' .pause').removeClass('hide');
          $(destination + ' .video_bigbox_pkg').tubeplayer('play');
        }

        //unmute
        if($(this).hasClass('unmute')){
          $(destination + ' .mute').removeClass('hide');
          $(destination + ' .video_bigbox_pkg').tubeplayer('unmute');
        }

        //mute
        if($(this).hasClass('mute')){
          $(destination + ' .unmute').removeClass('hide');
          $(destination + ' .video_bigbox_pkg').tubeplayer('mute');
        }
    });



    //Controls click
    $(document).on('click', destination + ' .clicktag', function() {
      window.open(video_bigbox_setup.clicktag,'_blank');
    });


  } //end app

};
