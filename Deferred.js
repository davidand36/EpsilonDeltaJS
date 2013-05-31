/*
  Deferred.js

  Routines related to the deferred/promise pattern.
  NOTES:
  1. Uses jQuery's Deferred system. Zepto does not include this, but Simply Deferred (https://github.com/sudhirj/simply-deferred) supplies it as an add-on.
  2. whenAll() is a modified version of crispyduck's contribution at http://stackoverflow.com/questions/4878887/how-do-you-work-with-an-array-of-jquery-deferreds. It applies $.when to an array of deferreds (or promises) and passes an array of the resulting data to the done() or fail() callback.
*/


//*****************************************************************************


if ( typeof global === 'undefined' )
{
    var εδ = εδ || { };
}
else
{
    global.εδ = global.εδ || { };
    var εδ = global.εδ;
}
εδ.deferred = εδ.deferred || { };

//=============================================================================

εδ.deferred.whenAll = function( deferreds )
{
    var deferred = new $.Deferred();
    $.when.apply( $, deferreds ).then(
        function done( )
        {
            deferred.resolve( Array.prototype.slice.call( arguments ) );
        },
        function fail( )
        {
            deferred.reject( Array.prototype.slice.call( arguments ) );
        });
    
    return deferred;
}

//=============================================================================

εδ.deferred.resolveOnTimeout = function( deferred, secs )
{
    setTimeout(
        function( )
        {
            deferred.resolve( );
        },
        secs * 1000 );
}


//*****************************************************************************
