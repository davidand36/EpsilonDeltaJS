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

         var db = window.localStorage,
             prefix = "";
         
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
             db.setItem( key, json );
         }
         
    //-------------------------------------------------------------------------

         function get( key )
         {
             key = prefix + key;
             var json = db.getItem( key );
             try
             {
                 return JSON.parse( json );
             } catch ( exc )
             {
                 return null;
             }
         }
         
    //-------------------------------------------------------------------------

         function remove( key )
         {
             key = prefix + key;
             db.removeItem( key );
         }
         
    //=========================================================================

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
