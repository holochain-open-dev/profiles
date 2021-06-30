
const { createLogger, format, transports }	= require('winston');
const { combine, timestamp, label, printf }	= format; // same as require('logform')
const sprintf					= require('sprintf-js').sprintf;

let defaultLevels				= {
    fatal: 0,
    error: 1,
    warn: 2,
    normal: 3,
    info: 4,
    debug: 5,
    silly: 6,
};
let logLevelNames;


module.exports					= function Logger(
    name,
    {
	level = 'fatal',
	levels = defaultLevels,
	color_config = {},
	template,
	// json_dump = true,
	streams
    } = {}
) {

    logLevelNames				= Object.keys( defaultLevels );
    let colors					= color_config === false || module.exports.COLOR_CONFIG === false
	? false
	: Object.assign({}, module.exports.COLOR_CONFIG, color_config );

    if ( template === undefined ) {
	// 'logform.printf' has nothing in common with 'printf'.  It is simply a wrapper that calls
	// the given function with the message 'info' object.
	format_template				= printf(
	    function({ level, message, label, timestamp }) {
		// Add prefix to every log message
		if ( Array.isArray(message) ) {

		    if ( typeof message[0] === 'function' ) {
			if ( message.length > 1 )
			    throw new Error(sprintf("Only 1 argument allowed when first argument is a function, %d arguments were given", message.length ));
			
			message			= message[0]();
		    }
		    else if ( typeof message[1] === 'function' ) {
			if ( message.length > 2 )
			    throw new Error(sprintf("Only 2 argument allowed when second argument is a function, %d arguments were given", message.length ));
			
			message			= [ message[0] ].concat( message[1]() );
		    }

		    if ( ! Array.isArray(message) )
			throw new Error(sprintf("Must return an array when using a function in log arguments, type %s given", typeof message ));
		    else if ( typeof message[0] !== 'string' )
			throw new Error(sprintf("First argument must be a string, type %s given", typeof message[0] ));
		    
		    args			= message.map(
			v => typeof v === 'object' && v !== null ? JSON.stringify(v) : String(v)
		    );
		    
		    message			= sprintf(...args);
		}

		let color_level			= "";
		let color_msg			= "";
		level				= level.toUpperCase();

		if ( colors !== false ) {
		    color_level			= typeof colors[`${level}_LEVEL`] === "string"
			? colors[`${level}_LEVEL`] : COLOR_RESET;
		    color_msg			= typeof colors[`${level}_MESSAGE`] === "string"
			? colors[`${level}_MESSAGE`] : COLOR_RESET;
		}

		return sprintf("%s [ %-10.10s ] %s%5.5s%s: %s\x1b[0m", timestamp, label, color_level, level, color_msg, message);
	    }
	);
    } else {
	// Set up custom prefix for every log message
	format_template				= printf( template );
    }

    formatter					= combine( label({ label: name }), timestamp(), format_template );
    
    if ( streams === undefined ) {
	// Default stream is to console on stderr
	streams					= [
	    new transports.Console({
		stderrLevels:	logLevelNames,
	    }),
	];
    }

    streams.map(function( transport ) {
	// By adding the formatter to each transport, we will avoid any unnecessary string
	// formatting.  Transports check the log level before calling 'logform.transform'.
	transport.format			= formatter;

	// Add ability to set the log level using a verbosity counter
	transport.setLevel			= function( level ) {
	    if ( level === undefined )
		level				= 0;

	    this.level				= level < logLevelNames.length
		? logLevelNames[ level ]
		: logLevelNames[ logLevelNames.length-1 ];
	};
    });

    const logger				= createLogger({
	level,
	levels,
	transports:	streams,
    });

    function wrapMethod(level, method) {
	return function() {
	    return method( [...arguments] );
	}
    }

    for (let level of logLevelNames) {
	logger[level] = wrapMethod( level, logger[level] );
    }
    
    return logger;
    
};

const COLOR_RESET				= "\x1b[0m";
module.exports.COLOR_CONFIG			= {
    "FATAL_LEVEL":	"\x1b[91;1m",
    "FATAL_MESSAGE":	"",

    "ERROR_LEVEL":	"\x1b[31m",
    "ERROR_MESSAGE":	"",

    "WARN_LEVEL":	"\x1b[33;1m",
    "WARN_MESSAGE":	"\x1b[22m",

    "NORMAL_LEVEL":	"\x1b[35;1m",
    "NORMAL_MESSAGE":	COLOR_RESET,

    "INFO_LEVEL":	"\x1b[36;1m",
    "INFO_MESSAGE":	COLOR_RESET,

    "DEBUG_LEVEL":	"\x1b[1m",
    "DEBUG_MESSAGE":	COLOR_RESET,

    "SILLY_LEVEL":	"\x1b[2;1m",
    "SILLY_MESSAGE":	"\x1b[0;2m",
};
