/*
  Util.js

  Some useful functions.
  NOTES:
  1. baseUrl 
  2. escape() should make a string safe to embed in HTML by replacing unsafe
     characters.
     unescape() will undo these replacements, though it could make other
     replacements as well.
  3. reflectAsHtml() generates an HTML string representation of a JavaScript
     value of any type. It avoids deep (possibly infinite) recursion into
     objects.
*/


//*****************************************************************************


var εδ = εδ || { };
εδ.util = εδ.util || { };


//=============================================================================

εδ.util.baseUrl =
    (function( )
     {
         var curPath = location.pathname;
         return curPath.substring( 0, curPath.indexOf( "/", 1 ) + 1 );
     })();

//=============================================================================

εδ.util.escape = function( str )
{
    return str.
        replace( '&', '&amp;' ).
        replace( '<', '&lt;' ).
        replace( '>', '&gt;' );
};

//-----------------------------------------------------------------------------

εδ.util.unescape = function( str )
{
    return str.
        replace( '&amp;', '&' ).
        replace( '&lt;', '<' ).
        replace( '&gt;', '>' );
};

//=============================================================================

εδ.util.reflectAsHtml = function ( item, depth )
{
    var recursionLimit = 3;
    depth = depth || 0;
    if ( depth > recursionLimit )
        return '(recursion limit reached)';
    if ( item === undefined )
        return '(undefined)';
    if ( item === null )
        return '(null)';
    if ( typeof item === 'number' )
        return item.toString();
    if ( typeof item === 'string' )
        return item;
    if ( typeof item === 'boolean' )
        return item ? 'true' : 'false';
    if ( typeof item === 'function' )
        return '(function)';
    if ( typeof item === 'object' )
    {
        if ( Object.prototype.toString.apply( item ) === '[object Array]' )
        {
            var html = '<ol>\n';
            var i;
            for ( i = 0; i < item.length; ++i )
                html += '<li>[' + i.toString() + '] ' +
                    εδ.reflectAsHtml( item[ i ], depth + 1 ) + '</li>\n';
            html += '</ol>\n';
            return html;
        }
        var html = Object.prototype.toString.apply( item );
        html += '<ul>\n';
        var propName;
        for ( propName in item )
        {
            if ( item.hasOwnProperty( propName ) )
            {
                if ( typeof item[ propName ] != 'function' )
                {
                    html += '<li>' + propName + ': ' +
                        εδ.reflectAsHtml( item[ propName ], depth + 1 ) +
                        '</li>\n';
                }
            }
        }
        html += '</ul>\n';
        return html;
    }
    return '(unknown type)';
};


//*****************************************************************************
