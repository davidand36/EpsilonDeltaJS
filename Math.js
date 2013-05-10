/*
  Math.js

  Mathematics functions.
  NOTES:
  1. a) clampInt() and wrap() ensure that
        low <= x < high.
     b) clampReal() only ensures that
        low <= x <= high.
  2. ModP() and DivModP() ensure that
     0 <= remainder < abs( divisor ).
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
εδ.math = εδ.math || { };

//=============================================================================

εδ.math.makeFinite = function( num, fallback )
{
    if ( isNaN( num ) || ! isFinite( num ) )
        return fallback;
    return num;
};
        
//=============================================================================

εδ.math.clampInt = function( x, low, high )
{
    return Math.max( low, Math.min( x, high - 1 ) );
}

//.............................................................................

εδ.math.clampReal = function( x, low, high )
{
    return Math.max( low, Math.min( x, high ) );
}

//-----------------------------------------------------------------------------

εδ.math.wrap = function( x, low, high )
{
    var diff = high - low;
    while ( x < low )
        x += diff;
    while ( x >= high )
        x -= diff;
    return x;
}

//=============================================================================

εδ.math.modP = function( dividend, divisor )
{
    var rem = dividend % divisor;
    if ( rem < 0 )
        rem += divisor;
    return rem;
};

//.............................................................................

εδ.math.divModP = function( dividend, divisor )
{
    var qr = { quotient: Math.floor( dividend / divisor ),
               remainder: dividend % divisor
             };
    if ( qr.remainder < 0 )
        qr.remainder += divisor;
    return qr;
};


//*****************************************************************************
