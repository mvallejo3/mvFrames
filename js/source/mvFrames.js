/**
 * mvFrames
 * 
 * @param {object} config object with config arguments
 */
function mvFrames( config ) {

	config = config || null;


	/**
	 * construct our object and start banner if frames exist
	 */
	mvFrames.init = function() {
		mvFrames.wrapper             = config.wrapper             ? config.wrapper             : null; // save wrapper
		mvFrames.initialDelay        = config.initialDelay        ? config.initialDelay        : 0;    // save initial delay - delay for first frame
		mvFrames.frameIterationSpeed = config.frameIterationSpeed ? config.frameIterationSpeed : null; // get frame Iteration speed if submitted
		mvFrames.frames              = config.frames              ? config.frames              : [];   // get all frames

		if ( mvFrames.frames.length > 0 ) {
			mvFrames.startBanner();
		}
	}


	/**
	 * start the banner
	 */
	mvFrames.startBanner = function() {

		setTimeout(function(){


			for (var i = 0; i < mvFrames.frames.length; i++) {
			
				if ( mvFrames.frameIterationSpeed ) {

					mvFrames.frameIterate( mvFrames.frames[i], i );
				}

				else {
					mvFrames.bindFrameTrigger(  mvFrames.frames[i] )
				}
			}

			( ! mvFrames.frameIterationSpeed ) ? mvFrames.triggerFirstFrame() : false;

		}, mvFrames.initialDelay);
	}


	/**
	 * Iterate between frames
	 * 
	 * @param  {object} frame frame object
	 * @param  {int} i        frame number
	 */
	mvFrames.frameIterate = function( frame, i ) {
		frame   = frame   || null;
		i       = i       || 0;

		// Check to see if the counter has been initialized
	    if ( typeof mvFrames.frameIterate.timeExtension == 'undefined' ) {
	        // It has not... perform the initialization
	        mvFrames.frameIterate.timeExtension = 0;
	    }

		if ( frame ) {
			mvFrames.frameIterate.timeExtension += frame.extend ? frame.extend : 0;

			setTimeout( function(){

				mvFrames.doFrame( frame );

			}, ( i * mvFrames.frameIterationSpeed ) + mvFrames.frameIterate.timeExtension );
		}
		else {
			// frame, car, and/or wrapper are null
			console.error('Missing or invalid argument \'frame\' in \'mvFrames.frameIterate()\'.');
			return false;
		}
	}


	/**
	 * Do frame - calls the frame call back
	 * 
	 * @param  {object} frame frame object
	 */
	mvFrames.doFrame = function( frame ) {
		frame = frame || null;

		if ( frame ) {

			// if callback was provided
			if ( frame.callback && 'function' == typeof frame.callback ) {
				// call callback and pass frame as first argument 
				frame.callback( frame );
			}

			else if ( frame.trigger && 'string' == typeof frame.trigger ) {
				( mvFrames.wrapper ) ? mvFrames.wrapper.trigger( frame.trigger ) : false;
			}
		}
		else {
			return false;
		}
	}



	mvFrames.bindFrameTrigger = function( frame ) {
		frame = frame || null;

		if ( mvFrames.wrapper && frame ) {
			if ( ( frame.trigger && 'string' == typeof frame.trigger ) && ( frame.callback && 'function' == typeof frame.callback ) ) {
				mvFrames.wrapper.on( frame.trigger, frame, frame.callback );
			}
			else {
				return false;
			}
		}
	}


	mvFrames.triggerFirstFrame = function() {
		var firstFrame = mvFrames.frames[0];

		if ( ( firstFrame.trigger && 'string' == typeof firstFrame.trigger ) && ( firstFrame.callback && 'function' == typeof firstFrame.callback ) ) {
			mvFrames.wrapper ? mvFrames.wrapper.trigger( firstFrame.trigger ) : false;
		}
	}


	// if config exists construct banner object
	if ( config ) {
		mvFrames.init();
	}

	return false;
}