/*
  Storage.js

  Data storage functions.
  NOTES:
  1. Uses the built-in Web Storage functionality.
  2. Before use setPrefix() should be called with a prefix string unique to
     the app (with respect to the domain). This will be prepended to all
     keys to avoid collisions.
  3. Keys must be strings. Values can be any object serializable to JSON.
*/


//*****************************************************************************


var εδ = εδ || { };


//=============================================================================


εδ.storage =
    (function()
     {
    //-------------------------------------------------------------------------

         var base,
             prefix = "";

         if ( window.chrome && window.chrome.storage )
             base = ChromeStorage( );
         else
             base = WebStorage( );
         
    //=========================================================================

         function setPrefix( thePrefix )
         {
             prefix = thePrefix;
         }
         
    //=========================================================================

         function set( key, value )
         {
             var json = JSON.stringify( value );
             key = prefix + key;
             base.set( key, json );
         }
         
    //-------------------------------------------------------------------------

         function get( key, callback )
         {
             key = prefix + key;
             base.get( key,
                       function( json )
                       {
                           var val;
                           try
                           {
                               val = JSON.parse( json );
                           } catch ( exc )
                           {
                               val = null;
                           }
                           callback( val );
                       } );
         }
         
    //-------------------------------------------------------------------------

         function remove( key )
         {
             key = prefix + key;
             base.remove( key );
         }
         
    //*************************************************************************

         function WebStorage( session )
         {
             var db = session ? window.sessionStorage : window.localStorage;

         //--------------------------------------------------------------------

             function set( key, value )
             {
                 db.setItem( key, value );
             }

         //--------------------------------------------------------------------

             function get( key, callback )
             {
                 var val = db.getItem( key );
                 callback( val );
             }

         //--------------------------------------------------------------------

             function remove( key )
             {
                 db.removeItem( key );
             }

         //====================================================================

             return {
                 set: set,
                 get: get,
                 remove: remove
             };
         
         //--------------------------------------------------------------------
         }

    //*************************************************************************

         function ChromeStorage( sync )
         {
             var db = sync ? chrome.storage.sync : chrome.storage.local;

         //--------------------------------------------------------------------

             function set( key, value )
             {
                 var obj = {};
                 obj[ key ] = value;
                 db.set( obj );
             }

         //--------------------------------------------------------------------

             function get( key, callback )
             {
                 db.get( key,
                         function( obj )
                         {
                             var val = obj[ key ];
                             callback( val );
                         } );
             }

         //--------------------------------------------------------------------

             function remove( key )
             {
                 db.remove( key );
             }

         //====================================================================

             return {
                 set: set,
                 get: get,
                 remove: remove
             };
         
         //--------------------------------------------------------------------
         }

    //*************************************************************************

        return {
            setPrefix: setPrefix,
            set: set,
            get: get,
            remove: remove
        };
         
    //-------------------------------------------------------------------------
     }
)();


//*****************************************************************************
