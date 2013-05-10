/*
  Random.js

  Random number generators
  NOTES:
  1. For each of these generators,
     a) real() returns a floating-point number r with 0.0 <= r < 1.0.
     b) integer( limit ) returns an integer r with 0 <= r < limit.
  2. stdRandom uses the built-in Math.random, which is probably fine for most
     purposes. It adds an integer() function, which is often handy.
  3. lcRandom uses a 48-bit linear congruential generator found by Lavaux and
     Janssens and reported in Knuth (3.3.4, Table 1, line 29). The main
     advantage of using this is that it can be seeded explicitly, allowing
     deterministic testing.
  4. shRandom is based on "randomization by shuffling" (Knuth's 3.2.2
     Algorithm B), which generates a random sequence using another RNG as its
     basis. By default the basis is lcRandom, but a new basis can be set.
     Doing so reinitializes the sequence generator.
  5. So by default, shRandom will generate quite a good random sequence, but
     if you want to be able to recreate the same sequence, save the seed and
     reuse it as done in shRandom.test().
  6. shuffleArray() shuffles the provided array in place. An optional random
     number generator may be provided; shRandom is used by default.
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


//*****************************************************************************


εδ.stdRandom =
    (function()
     {
    //-------------------------------------------------------------------------

         function real( )
         {
             return Math.random();
         }
         
    //-------------------------------------------------------------------------

         function integer( limit )
         {
             return Math.floor( real() * limit );
         }
         
    //=========================================================================

         function realBetween( min, max )
         {
             var diff = max - min;
             return real() * diff  +  min;
         }

    //-------------------------------------------------------------------------

         function intBetween( min, max )
         {
             var diff = max - min;
             return integer( diff ) + min;
         }

    //=========================================================================

        return {
            real: real,
            integer: integer,
            realBetween: realBetween,
            intBetween: intBetween
        };
         
    //-------------------------------------------------------------------------
     }
)();


//*****************************************************************************


εδ.lcRandom =
    (function()
     {
    //-------------------------------------------------------------------------

         var seed,
             m = 0x1000000000000, //2^48
             sqrtM = 0x1000000,
             a = 31167285,
             c = 1,
             x;
         
    //=========================================================================

         function reseed( newSeed )
         {
             if ( newSeed === undefined )
             {
                 newSeed = εδ.stdRandom.integer( m );
             }
             x = seed = newSeed;
         }
         
    //-------------------------------------------------------------------------

         function getSeed( )
         {
             return seed;
         }
         
    //=========================================================================

         function real( )
         {
             return integer( m ) / m;
         }
         
    //-------------------------------------------------------------------------

         function integer( limit )
         {
             if ( seed === undefined )
             {
                 reseed( );
             }
             x = ( a * x  +  c ) % m;
             if ( limit < sqrtM )            //When possible, just use the
                 return (x / sqrtM) % limit; // higher-order bits.
             else
                 return x % limit;
         }
         
    //=========================================================================

         function realBetween( min, max )
         {
             var diff = max - min;
             return real() * diff  +  min;
         }

    //-------------------------------------------------------------------------

         function intBetween( min, max )
         {
             var diff = max - min;
             return integer( diff ) + min;
         }

    //=========================================================================

        return {
            reseed: reseed,
            getSeed: getSeed,
            real: real,
            integer: integer,
            realBetween: realBetween,
            intBetween: intBetween
        };
         
    //-------------------------------------------------------------------------
     }
)();


//*****************************************************************************




εδ.shRandom =
    (function()
     {
    //-------------------------------------------------------------------------

         var rng = εδ.lcRandom,
             k = 100,
             v = [],
             y;
         
    //=========================================================================

         function init( )
         {
             var i;
             for ( i = 0; i < k; ++i )
             {
                 v[ i ] = rng.real( );
             }
             y = rng.real( );
         }
         
    //=========================================================================

         function setRng( newRng )
         {
             rng = newRng;
             init( );
         }
         
    //=========================================================================

         function real( )
         {
             var j;
             if ( y === undefined )
             {
                 init( );
             }
             j = Math.floor( y * k );
             y = v[ j ];
             v[ j ] = rng.real( );
             return y;
         }

    //-------------------------------------------------------------------------

         function integer( limit )
         {
             return Math.floor( real() * limit );
         }
         
    //=========================================================================

         function realBetween( min, max )
         {
             var diff = max - min;
             return real() * diff  +  min;
         }

    //-------------------------------------------------------------------------

         function intBetween( min, max )
         {
             var diff = max - min;
             return integer( diff ) + min;
         }

    //=========================================================================

         function test( )
         {
             var s,
                 i,
                 ct0, ct1;
             εδ.lcRandom.reseed( );
             s = εδ.lcRandom.getSeed();
             setRng( εδ.lcRandom );
             ct0 = 0;
             for ( i = 0; i < 1000; ++i )
             {
                 if ( integer( 10 ) === 7 )
                     ++ct0;
             }
             εδ.lcRandom.reseed( s );
             setRng( εδ.lcRandom );
             ct1 = 0;
             for ( i = 0; i < 1000; ++i )
             {
                 if ( integer( 10 ) === 7 )
                     ++ct1;
             }
             console.log( "Seeded with " + s );
             if ( ct0 === ct1 )
             {
                 console.log( "Ct = " + ct0 +
                              " (should be near 100) both times." );
             }
             else
             {
                 console.log( "Error: ct0 = " + ct0 + " ct1 = " + ct1 );
             }
         }
         
    //=========================================================================

        return {
            setRng: setRng,
            real: real,
            integer: integer,
            realBetween: realBetween,
            intBetween: intBetween,
            test: test
        };
         
    //-------------------------------------------------------------------------
     }
)();


//*****************************************************************************


εδ.shuffleArray = function( array, random )
{
    var rng = random || εδ.shRandom,
        len = array.length,
        i, r, tmp;
    for ( i = len - 1; i > 0; --i )
    {
        r = rng.integer( i + 1 );
        if ( r !== i )
        {
            tmp = array[ i ];
            array[ i ] = array[ r ];
            array[ r ] = tmp;
        }
    }
};


//*****************************************************************************
