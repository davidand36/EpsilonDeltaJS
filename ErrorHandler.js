/*
  ErrorHandler.js

  Reports error messages.
  NOTES:
  1. Requires jQuery/Zepto.
  2. Using errorHandler.setMessageElement, where the argument is a <div> or
     similar element preferably near the top of the Web page, allows
     JavaScript and Ajax errors to be reported.
*/


//*****************************************************************************

var εδ = εδ || { };

//*****************************************************************************


// This console-shim by Liam Newmarch
//  (https://github.com/liamnewmarch/console-shim)
//  fixes a problem in IE9.

if (!window.console) (function() {

	var __console, Console;

	Console = function() {
		var check = setInterval(function() {
			var f;
			if (window.console && console.log && !console.__buffer) {
				clearInterval(check);
				f = (Function.prototype.bind) ? Function.prototype.bind.call(console.log, console) : console.log;
				for (var i = 0; i < __console.__buffer.length; i++) f.apply(console, __console.__buffer[i]);
			}
		}, 1000);

		function log() {
			this.__buffer.push(arguments);
		}

		this.log = log;
		this.error = log;
		this.warn = log;
		this.info = log;
		this.__buffer = [];
	};

	__console = window.console = new Console();
})();


//*****************************************************************************


εδ.errorHandler = (
    function( )
    {                                                            //errorHandler
    //-------------------------------------------------------------------------

        var messageElement;

    //=========================================================================

        function setMessageElement( errorMessageElement )
        {
            messageElement = errorMessageElement;
            clearError( );
            window.onerror = reportJsError;
            $(document).on( 'ajaxError', reportAjaxError );
        }
        
    //=========================================================================

        function reportError( errorMsg )
        {
            console.log( errorMsg );
            if ( messageElement )
            {
                errorMsg = errorMsg.replace( '\n', '<br />' );
                $(messageElement).html( errorMsg );
                $(messageElement).show( );
                window.scrollTo( 0, 0 );
            }
        }

    //-------------------------------------------------------------------------

        function clearError( )
        {
            if ( messageElement )
            {
                $(messageElement).hide( );
                $(messageElement).html( "" );
            }
        }
        
    //-------------------------------------------------------------------------

        function reportJsError( errorMsg, url, line )
        {
            var msg = 'A JavaScript error occurred at ' +
                url + ' (' + line + ')\n' +
                errorMsg;
            reportError( msg );
        }

    //-------------------------------------------------------------------------

        function reportAjaxError( event, jqXHR, settings, error )
        {
            var msg = 'An AJAX error occurred.\n' +
                'URL: ' + settings.url + '\n' +
                'Response: ' + jqXHR.responseText + '\n' +
                'Status: ' + jqXHR.statusText;
            reportError( msg );
        };


    //=========================================================================

        setMessageElement( null ); //initial setup

    //=========================================================================

    return {
        setMessageElement: setMessageElement,
        reportError: reportError,
        clearError: clearError
    };

    //-------------------------------------------------------------------------
    }                                                            //errorHandler
());


//*****************************************************************************
