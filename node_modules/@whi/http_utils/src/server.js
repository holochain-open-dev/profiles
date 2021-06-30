const path				= require('path');
const log				= require('@whi/stdlog')(path.basename( __filename ), {
    level: process.env.LOG_LEVEL || 'fatal',
});

// Start simple HTTP servers

const http				= require('http');
const url				= require('url');
const fs				= require('fs');
const stream				= require('stream');

const CONTENT_TYPES_MAP = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css",
    "wasm": "application/wasm",
};


class Server extends http.Server {

    async serve_local_assets( base_path, dynamic_override ) {
	log.debug("Asset directory base path: %s", base_path );

	this.on('request', async (request, response) => {
	    try {
		let mime_type		= "text/plain";
		let asset_stream;

		const req_url		= url.parse( request.url );
		const asset_path	= path.join( base_path, req_url.pathname );
		const asset_ext		= path.extname( asset_path ).slice(1).toLowerCase();

		const content		= await dynamic_override.call({
		    contentType( value ) {
			mime_type	= value;
		    }
		}, req_url.pathname, asset_path );

		if ( typeof content === "string" ) {
		    asset_stream	= new stream.Readable();
		    asset_stream.push( content );
		    asset_stream.push( null );

		    response.writeHead( 200, {
			"Content-Type": mime_type,
		    });
		}
		else {
		    mime_type		= CONTENT_TYPES_MAP[ asset_ext ] || mime_type;

		    log.normal("Looking for file @ %s", asset_path );
		    asset_stream	= fs.createReadStream( asset_path );

		    asset_stream.on('open', function () {
			response.writeHead( 200, {
			    "Content-Type": mime_type,
			});
		    });
		    asset_stream.on('error',function(e) {
			// assume the file doesn't exist
			response.writeHead( 404 );
			response.end();
		    });
		}

		asset_stream.pipe( response );
	    } catch( e ) {
		log.fatal("Failed to process request: %s", e );
		console.error( e );

		response.writeHead( 500 );
		response.end();
	    }
	});
    }

}

module.exports				= Server;
