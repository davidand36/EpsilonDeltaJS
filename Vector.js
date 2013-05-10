/*
  Vector.js

  Routines for 2-D vector math
  NOTES:
  1. A vector is an object with numeric properties 'x' and 'y'.
  2. The test function outputs answers to homework I assigned.
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


εδ.vector = { };

//=============================================================================

εδ.vector.equal = function( vec1, vec2 )
{
    return (vec1.x === vec2.x) && (vec1.y === vec2.y);
}

//=============================================================================

εδ.vector.add = function( vec1, vec2 )
{
    return {
        x: vec1.x + vec2.x,
        y: vec1.y + vec2.y
    };
};

//-----------------------------------------------------------------------------

εδ.vector.subtract = function( vec1, vec2 )
{
    return {
        x: vec1.x - vec2.x,
        y: vec1.y - vec2.y
    };
};

//-----------------------------------------------------------------------------

εδ.vector.scalarMul = function( scalar, vec )
{
    return {
        x: scalar * vec.x,
        y: scalar * vec.y
    };
};

//=============================================================================

εδ.vector.length = function( vec )
{
    return Math.sqrt( vec.x * vec.x  +  vec.y * vec.y );
};

//-----------------------------------------------------------------------------

εδ.vector.lengthSqr = function( vec )
{
    return  vec.x * vec.x  +  vec.y * vec.y;
};

//-----------------------------------------------------------------------------

εδ.vector.normalize = function( vec )
{
    var len = εδ.vector.length( vec ),
        invLen = (len > 0) ? (1.0 / len) : 0;
    return εδ.vector.scalarMul( invLen, vec );
};

//=============================================================================

εδ.vector.distance = function( vec1, vec2 )
{
    return εδ.vector.length( εδ.vector.subtract( vec1, vec2 ) );
};

//-----------------------------------------------------------------------------

εδ.vector.distanceSqr = function( vec1, vec2 )
{
    return εδ.vector.lengthSqr( εδ.vector.subtract( vec1, vec2 ) );
};

//=============================================================================

εδ.vector.dot = function( vec1, vec2 )
{
    return  vec1.x * vec2.x  +  vec1.y * vec2.y;
};

//=============================================================================

εδ.vector.perp = function( vec )
{
    return {
        x: -vec.y,
        y: vec.x
    };
};

//=============================================================================

εδ.vector.isPointInRect = function( pt, rect )
{
    if ( pt.x < rect.x )
        return false;
    if ( pt.x >= rect.x + rect.width )
        return false;
    if ( pt.y < rect.y )
        return false;
    if ( pt.y >= rect.y + rect.height )
        return false;
    return true;
}

//=============================================================================

εδ.vector.toString = function( vec, precision )
{
    if ( precision )
    {
        return "( " + vec.x.toPrecision( precision ) +
            ", " + vec.y.toPrecision( precision ) + " )";
    }
    else
    {
        return "( " + vec.x.toString() +
            ", " + vec.y.toString() + " )";
    }
}

//=============================================================================

εδ.vector.test = function( )
{
    var vec = εδ.vector,
        u = { x: -1, y: 3 },
        v = { x: 7, y: 2 },
        w = { x: 5, y: 0 },
        e = { x: 1, y: 0 },
        f = { x: 0, y: 1 };
    console.log( "1) u.x = " + u.x );
    console.log( "2) v.y = " + v.y );
    console.log( "3) w1 = " + w.y + " (0-based indices) or w1 = " + w.x +
                 " (1-based indexes)" );
    console.log( "4) |u| = " + vec.length( u ) );
    console.log( "5) |v| = " + vec.length( v ) );
    console.log( "6) |w| = " + vec.length( w ) );
    console.log( "7) |e| = " + vec.length( e ) );
    console.log( "8) 3u = " + vec.toString( vec.scalarMul( 3, u ) ) );
    console.log( "9) 0v = " + vec.toString( vec.scalarMul( 0, v ) ) );
    console.log( "10) -3u = " + vec.toString( vec.scalarMul( -3, u ) ) );
    console.log( "11) -v = " + vec.toString( vec.scalarMul( -1, v ) ) );
    console.log( "12) w/2 = " + vec.toString( vec.scalarMul( 1/2, w ) ) );
    console.log( "13) v/0 = " + vec.toString( vec.scalarMul( 1/0, v ) ) );
    console.log( "14) normalize( u ) = " + vec.toString( vec.normalize( u ) ) );
    console.log( "15) normalize( w ) = " + vec.toString( vec.normalize( w ) ) );
    console.log( "16) u + v = " + vec.toString( vec.add( u, v ) ) );
    console.log( "17) v + w = " + vec.toString( vec.add( v, w ) ) );
    console.log( "18) v + u = " + vec.toString( vec.add( v, u ) ) );
    console.log( "19) 3( u + v) = " + vec.toString( vec.scalarMul( 3, vec.add( u, v ) ) ) );
    console.log( "20) 3u + 3v = " + vec.toString( vec.add( vec.scalarMul( 3, u ),
                                                   vec.scalarMul( 3, v ) ) ) );
    console.log( "21) (2 + 1)u = " + vec.toString( vec.scalarMul( (2 + 1), u ) ) );
    console.log( "22) 2u + 1u = " + vec.toString( vec.add( vec.scalarMul( 2, u ),
                                                   vec.scalarMul( 1, u ) ) ) );
    console.log( "23) 3e + 5f = " + vec.toString( vec.add( vec.scalarMul( 3, e ),
                                                   vec.scalarMul( 5, f ) ) ) );
    console.log( "24) u - v = " + vec.toString( vec.subtract( u, v ) ) );
    console.log( "25) v - u = " + vec.toString( vec.subtract( v, u ) ) );
    console.log( "26) u·v = " + vec.dot( u, v ) );
    console.log( "27) v·w = " + vec.dot( v, w ) );
    console.log( "28) v·u = " + vec.dot( v, u ) );
    console.log( "29) 3(u·v) = " + 3 * vec.dot( u, v ) );
    console.log( "30) (3u).v = " + vec.dot( vec.scalarMul( 3, u ), v ) );
    console.log( "31) u·(3v) = " + vec.dot( u, vec.scalarMul( 3, v ) ) );
    console.log( "32) u·u = " + vec.dot( u, u ) + " |u|² = " + vec.lengthSqr( u ) );
    console.log( "33) e·u = " + vec.dot( e, u ) + " u.x = " + u.x );
    console.log( "34) f·u = " + vec.dot( f, u ) + " u.y = " + u.y );
    console.log( "35) e·v = " + vec.dot( e, v ) + " v.x = " + v.x );
    console.log( "36) f·v = " + vec.dot( f, v ) + " v.y = " + v.y );
    console.log( "37) Angle between u and v = " +
                 Math.acos( vec.dot( u, v ) / (vec.length( u ) * vec.length( v )) ) );
    console.log( "38) Angle between v and w = " +
                 Math.acos( vec.dot( v, w ) / (vec.length( v ) * vec.length( w )) ) );
    console.log( "39) Angle between e and w = " +
                 Math.acos( vec.dot( e, w ) / (vec.length( e ) * vec.length( w )) ) );
    console.log( "40) Angle between f and w = " +
                 Math.acos( vec.dot( f, w ) / (vec.length( f ) * vec.length( w )) ) + " π/2 = " + Math.PI/2 );
}

//*****************************************************************************
