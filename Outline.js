/*
  Outline.js

  Set up outline levels for accordion functionality.
  NOTES:
  1. Requires jquery-ui
  2. Enables toggling the accordion collapsing via an optional button with
     the ID "accordionToggle".
*/

//*****************************************************************************


var εδ = εδ || { };


//=============================================================================

εδ.outline =
    (function( )
     {
    //-------------------------------------------------------------------------

         function setupAccordions( )
         {
             $("div.accordion").accordion( { autoHeight: false
                                           } );
             $("div.accordion.h1").accordion( "option", "header", 'h1' );
             $("div.accordion.h2").accordion( "option", "header", 'h2' );
             $("div.accordion.h3").accordion( "option", "header", 'h3' );
             $("div.accordion.h4").accordion( "option", "header", 'h4' );
             $("div.accordion.h5").accordion( "option", "header", 'h5' );
             $("div.accordion.li").accordion( "option", "header", 'li' );
             
             $("div.accordion.h1").accordion( "option", "active", 0 );
         }

    //-------------------------------------------------------------------------

         function setupAccordionToggle( )
         {
             var buttonTexts =
                 {
                     expand: "Expand sections",
                     collapse: "Collapse sections"
                 };
             $("#accordionToggle").text( buttonTexts.expand );
             $("#accordionToggle").click(
                 function( event )
                 {
                     var target = $(event.target),
                     txt = target.text();
                     if ( txt === buttonTexts.expand )
                     {
                         $(".accordion").accordion( "destroy" );
                         target.text( buttonTexts.collapse );
                     }
                     else
                     {
                         setupAccordions( );
                         target.text( buttonTexts.expand );
                     }
                 }
             );
         }

    //=========================================================================

        return {
            setupAccordions: setupAccordions,
            setupAccordionToggle: setupAccordionToggle
        };
         
    //-------------------------------------------------------------------------
     }
)();


//*****************************************************************************
