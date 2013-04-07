/*
  Timer.js

  Time source that can be reset, paused, and resumed.
  1. systemTime is a time source based on the built-in Date() functionality.
     Naturally, it cannot be reset or paused.
  2. A timer can be based on any time source that provides getSeconds().
     By default, systemTime is used.
*/

//*****************************************************************************


var εδ = εδ || { };


//=============================================================================


εδ.systemTime =
    (function()
     {
    //-------------------------------------------------------------------------

         function getSeconds( )
         {
             return new Date().getTime() / 1000.0;
         }

    //=========================================================================

        return {
            getSeconds: getSeconds
        };

    //-------------------------------------------------------------------------
     }
)();

//=============================================================================


εδ.timer = function( timeBasis )
{
    //-------------------------------------------------------------------------

         var basis = timeBasis || εδ.systemTime,
             startTime = basis.getSeconds(),
             pauseTime = 0;
         
    //=========================================================================

         function getSeconds( )
         {
             if ( pauseTime !== 0 )
             {
                 return pauseTime - startTime;
             }
             else
             {
                 return basis.getSeconds() - startTime;
             }
         }

    //=========================================================================

         function reset( )
         {
             startTime = basis.getSeconds();
             if ( pauseTime !== 0 )
             {
                 pauseTime = startTime;
             }
         }

    //=========================================================================

         function pause( )
         {
             if ( pauseTime === 0 )
             {
                 pauseTime = basis.getSeconds();
             }
         }

    //-------------------------------------------------------------------------

         function resume( )
         {
             var now = basis.getSeconds();
             if ( pauseTime !== 0 )
             {
                 startTime += (now - pauseTime);
                 pauseTime = 0;
             }
         }

    //=========================================================================

        return {
            getSeconds: getSeconds,
            reset: reset,
            pause: pause,
            resume: resume
        };
         
    //-------------------------------------------------------------------------
};


//*****************************************************************************