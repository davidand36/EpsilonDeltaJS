/*
  Audio.js

  Sound manager
  NOTES:
  1. Requires Modernizr
  2. Play takes an argument that may be a string or object.
     a) The string should be the name of the sound file sans extension.
     b) If the object has a 'name' property, it will be played repeatedly if a
        'loop' property is set to true.
     c) If the object has a 'names' property then a 'type' property is consulted.
        i) If the type is 'randomSelection', one of the names listed will be
           played.
        ii) If the type is 'sequence', all of the names listed will be played.
            If the object has a 'random' property set to true, the order will
            be random.
            If the object has a 'loop' property set to true, the sequence will
            be played repeatedly.
  3. Audio files are expected to be in the "audio/" directory.
  4. Both Ogg Vorbis (with an '.ogg' extension) and MP3 ('.mp3') format files
     should be provided.
*/


//*****************************************************************************


var εδ = εδ || { };


//=============================================================================


εδ.audio =
    (function()
     {
    //-------------------------------------------------------------------------

         var formatExt = getBestFormat( ),
             sounds = {},
             activeSounds = [];
         
    //=========================================================================

         function getBestFormat( )
         {
             var exts = [ "ogg", "mp3" ],
                 i, numExts = exts.length;
             for ( i = 0; i < numExts; ++i )
             {
                 if ( Modernizr.audio[ exts[ i ] ] == "probably" )
                 {
                     return exts[ i ];
                 }
             }
             for ( i = 0; i < numExts; ++i )
             {
                 if ( Modernizr.audio[ exts[ i ] ] == "maybe" )
                 {
                     return exts[ i ];
                 }
             }
             return null;
         }
         
    //=========================================================================

         function getAudio( name )
         {
             var i, lim;
             if ( sounds[ name ] )
             {
                 for ( i = 0, lim = sounds[ name ].length; i < lim; ++i )
                 {
                     if ( sounds[ name ][ i ].ended )
                     {
                         return sounds[ name ][ i ];
                     }
                 }
             }
             return createAudio( name );
         }
         
    //-------------------------------------------------------------------------

         function createAudio( name )
         {
             var audio = new Audio( "audio/" + name + "." + formatExt );
             sounds[ name ] = sounds[ name ] || [];
             sounds[ name ].push( audio );
             $(audio).one( "ended", cleanActive );
             return audio;
         }
         
    //=========================================================================

         function cleanActive( )
         {
             var i = 0;
             while ( i < activeSounds.length )
             {
                 if ( activeSounds[ i ].ended )
                 {
                     activeSounds.splice( i, 1 );
                 }
                 else
                 {
                     ++i;
                 }
             }
         }
         
    //=========================================================================

         function play( sound )
         {
             var r;
             if ( ! sound )
                 return;
             if ( typeof sound === "string" )
             {
                 playByName( sound );
             }
             else if ( typeof sound === "object" )
             {
                 if ( sound.name )
                 {
                     playByName( sound.name, sound.loop );
                 }
                 else if ( sound.names )
                 {
                     if ( sound.type === "randomSelection" )
                     {
                         r = εδ.stdRandom.integer( sound.names.length );
                         playByName( sound.names[ r ] );
                     }
                     else if ( sound.type === "sequence" )
                     {
                         playSequence( sound );
                     }
                 }
             }
         }
         
    //-------------------------------------------------------------------------

         function playByName( name, loop )
         {
             var audio = getAudio( name );
             if ( loop )
             {
                 audio.loop = true;
             }
             audio.play( );
             activeSounds.push( audio );
         }
         
    //-------------------------------------------------------------------------

         function playSequence( sound )
         {
             var index = 0,
                 names = sound.names;
             if ( sound.random )
             {
                 εδ.shuffleArray( names );
             }
             function playNext( )
             {
                 var audio = getAudio( names[ index ] );
                 ++index;
                 if ( sound.loop || (index < names.length) )
                 {
                     $(audio).one( "ended", playNext );
                 }
                 audio.play( );
                 activeSounds.push( audio );
                 if ( index >= names.length && sound.loop )
                     index = 0;
             }
             playNext( );
         }
         
    //=========================================================================

         function stopAll( )
         {
             var i, lim;
             for ( i = 0, lim = activeSounds.length; i < lim; ++i )
             {
                 activeSounds[ i ].pause( );
                 activeSounds[ i ].currentTime = 0;
             }
             activeSounds = [];
         }
         
    //=========================================================================

        return {
            play: play,
            stopAll: stopAll
        };
         
    //-------------------------------------------------------------------------
     }
)();


//*****************************************************************************
