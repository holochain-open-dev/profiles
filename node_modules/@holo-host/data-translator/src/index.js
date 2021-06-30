const VALID_SOURCES = [ "HoloError", "UserError", "AppError" ];

class DynamicError extends Error {
    constructor( name, message, stack ) {
	super( message );

	Object.defineProperty( this, "source", {
	    "value": this.name,
	    writable: false,
	});
	Object.defineProperty( this.constructor, "name", {
	    "value": name,
	    writable: false,
	});
	Object.defineProperty( this, "name", {
	    "value": name,
	    writable: false,
	});

	if ( Array.isArray( stack ) ) {
	    this.stack                  = stack.join("\n");
	}
	else if ( typeof stack === "string" ) {
	    this.stack			= stack;
	}
	else if ( stack === undefined ) {
	    if (typeof Error.captureStackTrace === 'function') {
		Error.captureStackTrace(this, this.constructor);
	    } else {
		this.stack              = (new Error(message)).stack;
	    }
	}
	else if ( stack === null ) {
	    this.stack			= "";
	}
	else {
	    throw new TypeError(`Invalid 'stack' value: ${stack}`);
	}
    }

    toString () {
	return this.name + ": " + this.message;
    }

    [Symbol.toPrimitive] ( hint ) {
	return this.toString();
    }

    toJSON () {
	return {
	    "source": this.source,
	    "name": this.name,
	    "message": this.message,
	    "stack": this.stack === "" ? [] : this.stack.split("\n"),
	};
    }

    valueOf () {
	return this.stack;
    }
}

const sources = {};
VALID_SOURCES.map(name => {
    sources[name] = class extends DynamicError {};
});


function assert_type( type, value, required = true ) {
    if ( required === false && value === undefined )
	return;
    if ( required === true && value === undefined )
	throw new TypeError(`Value is required`);

    switch (type) {
    case "string":
	if ( typeof value !== "string" )
	    throw new TypeError(`Value must be a string`);
	break;
    case "has_prototype":
	if ( value === null || value === undefined )
	    throw new TypeError(`Value cannot be null or undefined`);
	break;
    case "array":
	if ( !Array.isArray( value ) )
	    throw new TypeError(`Value must be an array`);
	break;
    default:
	throw new Error(`Unknown type '${type}'`);
	break;
    }
}


class Package {

    static createFromError ( source, err ) {
	assert_type( "string",		source );
	assert_type( "has_prototype",	err );
	assert_type( "has_prototype",	err.constructor );
	assert_type( "string",		err.constructor.name );
	assert_type( "string",		err.stack,	false );

	let name			= err.constructor.name;
	if ( name === "Object" ) {
	    assert_type( "string",	err.name );
	    name			= err.name;
	}

	return new Package({
	    "source": source,
	    "error": name,
	    "message": err.message,
	    "stack": err.stack ? err.stack.split("\n") : [],
	}, {
	    "type": "error",
	});
    }

    constructor ( payload, opts = {}, metadata ) {
	if ( opts === null )
	    opts			= {};
	else
	    assert_type( "has_prototype",	opts );

	assert_type( "string",			opts.type,	false );
	assert_type( "has_prototype",		metadata,	false );

	if ( ![undefined, "success", "error"].includes( opts.type ) )
	    throw new TypeError(`Invalid 'type' value: ${opts.type}`);

	this.type			= opts.type || "success";
	this._metadata			= metadata !== undefined
	    ? JSON.parse(JSON.stringify(metadata))
	    : {};

	if ( this.type === "error" ) {
	    assert_type( "has_prototype",	payload );
	    assert_type( "string",		payload.source );

	    if ( !VALID_SOURCES.includes( payload.source ) )
		throw new TypeError(`Invalid 'source' value: ${payload.source}`);

	    assert_type( "string",		payload.error );
	    assert_type( "string",		payload.message );
	    assert_type( "array",		payload.stack,	false );

	    if ( payload.stack === undefined )
		payload.stack		= [];
	}

	this.payload			= payload
    }

    metadata ( key, value ) {
	if ( arguments.length === 2 ) {
	    if ( value === undefined ) {
		const previous_value	= this._metadata[key];
		delete this._metadata[key];
		return previous_value;
	    }

	    this._metadata[key]		= value;
	}

	return this._metadata[key];
    }

    value () {
	if ( this.type === "success" )
	    return this.payload;
	else if ( this.type === "error" ) {
	    let { source,
		  error,
		  message,
		  stack }		= this.payload;
	    return new sources[source]( error, message, stack );
	}
    }

    toJSON () {
	let value;

	if ( this.type === "success" ) {
	    value			= this.value();
	    if ( ![null, undefined].includes( value ) && typeof value.toJSON === "function" )
		value			= value.toJSON();
	}
	else if ( this.type === "error" ) {
	    value			= this.payload;
	}

	const pack			= {
	    "type": this.type,
	    "payload": value,
	};

	if ( Object.keys(this._metadata).length > 0 )
	    pack.metadata		= this._metadata;

	return pack;
    }

    toString () {
	return JSON.stringify( this.toJSON() );
    }
}


module.exports				= {
    sources,
    Package,
    parse ( msg ) {
	let data;

	try {
	    data			= typeof msg === "string"
		? JSON.parse(msg)
		: msg;
	} catch (err) {
	    throw new TypeError(`Invalid message format: expected JSON, not '${msg}'`);
	}

	assert_type( "has_prototype",	data );

	if ( data.type === "success" ) {
	    return new Package( data.payload, null, data.metadata );
	}
	else if ( data.type === "error" ) {
	    try {
		return new Package( data.payload, {
		    "type": data.type,
		}, data.metadata );
	    } catch ( err ) {
		if ( err instanceof TypeError )
		    throw new TypeError(`Invalid error format: ${err.message}`);
	    }
	}
	else if ( data.type === undefined )
	    throw new TypeError(`Invalid content: missing 'type'`);
	else
	    throw new TypeError(`Unknown package type '${data.type}'`);
    },
};
