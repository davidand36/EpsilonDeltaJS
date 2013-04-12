/*
  DisplayLoop.js

  System to update a game, or similarly animated Web app, periodically.
  Driven by requestAnimationFrame, calls supplied function.
  NOTES:
  1. If setUpdateFunction() is called with a function argument, that function
     will be called as often as the system's requestAnimationFrame() allows.
     You can also provide null as an argument.
  2. The update function will be passed the current date/time (in seconds) as an
     argument.
*/


//*****************************************************************************


var εδ = εδ || { };


//=============================================================================


εδ.displayLoop =
    (function()
     {
    //-------------------------------------------------------------------------

         var updateFunction;

    //=========================================================================

         //Polyfill
         window.requestAnimationFrame =
             (function()
              {
                  return window.requestAnimationFrame ||
                      window.webkitRequestAnimationFrame ||
                      window.mozRequestAnimationFrame ||
                      window.oRequestAnimationFrame ||
                      window.msRequestAnimationFrame ||
                      function( callback, element ) {
                          return window.setTimeout(
                              function() {
                                  callback( Date.now() );
                              },
                              1000 / 60 );
                      };
              }
             )();

    //.........................................................................

         //Polyfill
         window.cancelAnimationFrame =
             (function()
              {
                  return window.cancelAnimationFrame ||
                      window.cancelRequestAnimationFrame ||
                      window.webkitCancelAnimationFrame ||
                      window.webkitCancelRequestAnimationFrame ||
                      window.mozCancelAnimationFrame ||
                      window.mozCancelRequestAnimationFrame ||
                      window.oCancelAnimationFrame ||
                      window.oCancelRequestAnimationFrame ||
                      window.msCancelAnimationFrame ||
                      window.msCancelRequestAnimationFrame ||
                      window.clearTimeout;
              }
             )();
         
    //=========================================================================

         function setUpdateFunction( func )
         {
             updateFunction = func;
         }
         
    //=========================================================================

         function doLoop( nowMillis )
         {
             if ( typeof updateFunction === "function" )
             {
                 updateFunction( nowMillis / 1000.0 );
             }
             requestAnimationFrame( doLoop );
         }

    //-------------------------------------------------------------------------

         requestAnimationFrame( doLoop ); //Begin looping
         
    //=========================================================================

        return {
            setUpdateFunction: setUpdateFunction
        };
         
    //-------------------------------------------------------------------------
     }
)();


//*****************************************************************************
