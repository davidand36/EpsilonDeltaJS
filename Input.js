/*
  Input.js

  Input device support.
  NOTES:
  1. This relies on keycode.js (http://jonathan.tang.name/code/js_keycode).
  2. translateKeyEvent() is to be used in handlers for keydown and keyup.
     It returns an object with fields:
         name: a string (see keyCodeNames in the code below)
         code: a number
         shift: boolean (true if Shift key is down)
         alt: boolean (true if Alt key is down)
         ctrl: boolean (true if Ctrl key is down)
  3. translateCharEvent() is to be used in handlers for keypress.
     It returns a string (probably of length 1) representing the character
     typed (lower or upper case, depending on the shift state).
  4. getEventPos() returns the position of a pointer device relative to
     a page element. The event needs to have clientX and clientY properties,
     as do the standard mouse events and also the elements of the touches
     arrays of touch-screen events.
*/


//*****************************************************************************


var εδ = εδ || { };


//=============================================================================


εδ.input = 
    (function()
     {
    //-------------------------------------------------------------------------

         function translateKeyEvent( event )
         {
             var translated = KeyCode.translate_event( event ),
                 keyCodeNames =
                 {
                     8: "Backspace",
                     9: "Tab",
                     12: "center",  //numpad
                     13: "Enter",
                     16: "Shift",
                     17: "Ctrl",
                     18: "Alt",
                     19: "Break",
                     20: "CapsLock",
                     27: "Escape",
                     32: " ",   //space
                     33: "PgUp",
                     34: "PgDn",
                     35: "End",
                     36: "Home",
                     37: "left",    //arrow
                     38: "up",      //arrow
                     39: "right",   //arrow
                     40: "down",    //arrow
                     44: ",",
                     45: "Insert",
                     46: "Delete",
                     47: "/",
                     48: "0",
                     49: "1",
                     50: "2",
                     51: "3",
                     52: "4",
                     53: "5",
                     54: "6",
                     55: "7",
                     56: "8",
                     57: "9",
                     59: ";",
                     61: "=",
                     62: ".",
                     65: "A",
                     66: "B",
                     67: "C",
                     68: "D",
                     69: "E",
                     70: "F",
                     71: "G",
                     72: "H",
                     73: "I",
                     74: "J",
                     75: "K",
                     76: "L",
                     77: "M",
                     78: "N",
                     79: "O",
                     80: "P",
                     81: "Q",
                     82: "R",
                     83: "S",
                     84: "T",
                     85: "U",
                     86: "V",
                     87: "W",
                     88: "X",
                     89: "Y",
                     90: "Z",
                     91: "[",
                     92: "\\",
                     93: "]",
                     95: "-",
                     96: "numpad 0",
                     97: "numpad 1",
                     98: "numpad 2",
                     99: "numpad 3",
                     100: "numpad 4",
                     101: "numpad 5",
                     102: "numpad 6",
                     103: "numpad 7",
                     104: "numpad 8",
                     105: "numpad 9",
                     106: "numpad *",
                     107: "numpad +",
                     109: "numpad -",
                     110: "numpad .",
                     111: "numpad /",
                     112: "F1",
                     113: "F2",
                     114: "F3",
                     115: "F4",
                     116: "F5",
                     117: "F6",
                     118: "F7",
                     119: "F8",
                     120: "F9",
                     121: "F10",
                     122: "F11",
                     123: "F12",
                     126: "`",
                     144: "NumLock",
                     145: "ScrollLock",
                     190: ".", //or 62
                     222: "'"
                 };
             translated.name = keyCodeNames[ translated.code ];
             return translated;
         }

    //-------------------------------------------------------------------------

         function translateCharEvent( event )
         {
             return String.fromCharCode( event.charCode );
         }

    //=========================================================================

         function getEventPos( event, element )
         {
             var offset = $(element).offset(),
                 x = event.clientX - offset.left,
                 y = event.clientY - offset.top;
             return { x: x, y: y };
         }

    //=========================================================================

        return {
            translateKeyEvent: translateKeyEvent,
            translateCharEvent: translateCharEvent,
            getEventPos: getEventPos
        };
         
    //-------------------------------------------------------------------------
     }
)();


//*****************************************************************************
