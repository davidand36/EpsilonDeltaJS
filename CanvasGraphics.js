/*
  CanvasGraphics.js

  Graphics routines with HTML canvas.
  NOTES:
  1. makeCanvas() returns a <canvas> element inside the specified container
     element. If none exists, one will be created. It will be the size of
     the container element.
  2. copyCanvas() creates a canvas with the same dimensions as the original.
  3. graphics() returns an object for the specified 2-D context that offers
     some convenient methods.
  4. The circle and roundedRect functions are designed to behave similarly to
     the built-in rect functions.
*/


//*****************************************************************************


var εδ = εδ || { };


//=============================================================================


εδ.makeCanvas = function( containerId )
{
    var container,
        canvas;

    container = $('#' + containerId );
    canvas = $( 'canvas', container );
    if ( canvas && (canvas.length > 0) )
    {
        canvas = canvas[ 0 ];
    }
    else
    {
        canvas = $('<canvas />')[0];
        canvas.width = container.width();
        canvas.height = container.height();
        $(canvas).appendTo( container );
    }
    return canvas;
}

//-----------------------------------------------------------------------------

εδ.copyCanvas = function( origCanvas )
{
    newCanvas = $('<canvas />')[0];
    newCanvas.width = origCanvas.width;
    newCanvas.height = origCanvas.height;
    return newCanvas;
}

//=============================================================================


εδ.graphics = function( context )
{
    //-------------------------------------------------------------------------

    var ctx = context;
         
    //=========================================================================

    function circle( x, y, radius )
    {
        ctx.moveTo( (x + radius), y );
        ctx.arc( x, y, radius, 0, Math.PI * 2 );
    }
         
    //-------------------------------------------------------------------------

    function strokeCircle( x, y, radius )
    {
        ctx.beginPath( );
        circle( x, y, radius );
        ctx.stroke( );
    }
         
    //-------------------------------------------------------------------------

    function fillCircle( x, y, radius )
    {
        ctx.beginPath( );
        circle( x, y, radius );
        ctx.fill( );
    }
         
    //=========================================================================

    function roundedRect( x, y, width, height, radius )
    {
        ctx.moveTo( x, (y + radius) );
        ctx.arc( (x + radius), (y + radius), radius,
                 Math.PI, Math.PI * 3/2 );
        ctx.arc( (x + width - radius), (y + radius), radius,
                 Math.PI * 3/2, 0 );
        ctx.arc( (x + width - radius), (y + height - radius), radius,
                 0, Math.PI * 1/2 );
        ctx.arc( (x + radius), (y + height - radius), radius,
                 Math.PI * 1/2, Math.PI );
        ctx.lineTo( x, (y + radius) );
    }

    //-------------------------------------------------------------------------

    function strokeRoundedRect( x, y, width, height, radius )
    {
        ctx.beginPath( );
        roundedRect( x, y, width, height, radius );
        ctx.stroke( );
    }

    //-------------------------------------------------------------------------

    function fillRoundedRect( x, y, width, height, radius )
    {
        ctx.beginPath( );
        roundedRect( x, y, width, height, radius );
        ctx.fill( );
    }

    //=========================================================================

    return {
        circle: circle,
        strokeCircle: strokeCircle,
        fillCircle: fillCircle,
        roundedRect: roundedRect,
        strokeRoundedRect: strokeRoundedRect,
        fillRoundedRect: fillRoundedRect
    };
         
    //-------------------------------------------------------------------------
};


//*****************************************************************************
