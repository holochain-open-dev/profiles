
const sprintf					= require('sprintf-js').sprintf;

// Wrap console.log in a warning so that it doesn't get used casually
const console_log				= console.log;
console.log = function() {
    console_log.apply(console, arguments);
}

function print() {
    if ( print.chalk === null )
	print.chalk				= require('chalk');
    
    const message				= sprintf.apply( sprintf, arguments );
    process.stdout.write( print.chalk.whiteBright( message ) + "\n" );
    return message;
}
print.colorAlways = function () {
    if ( process.env.FORCE_COLOR === 1 )
	return print("ERROR: colorAlways() has already been called");
    if ( print.chalk !== null )
	return print("ERROR: 'chalk' already loaded.  You must call colorAlways() before anything else");
    
    process.env.FORCE_COLOR			= 1;
    return print;
}
print.chalk					= null;
    
module.exports = print;
