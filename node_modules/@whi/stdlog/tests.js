
const Logger				= require('./main.js');
const log				= Logger('test.js', {
    level: 'warn',
});

log.debug('I am a debug log that should be hidden');
log.info('I am a info log that should be hidden');
log.warn('I am a warning log');
log.error('I am a warning log');

var asset				= "glitch";
var location				= "connection-manager.js";

log.error("Discovered %s in %s", asset, location);

log.transports[0].setLevel( 6 );

log.debug("JSON dump %s", { name: "Winston Churchill" });
log.debug("JSON dump %s", ['debug', 'info', 'warn', 'error']);

log.transports[0].setLevel( 3 );

log.silly(() => {
    throw new Error("This should NOT run")
});
log.normal(() => ["Who keeps the metric system down? %s", "wee doooo"]);
log.normal("Who keeps the metric system down? %s", () => ["wee doooo"]);

// log.warn("Discovered %s in %s", () => [
//     asset, location
// ]);
