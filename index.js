
/**
 * Convert an array to segments
 *
 * @param  {array, string} array
 * @param  {number} segmentSize, default is 4
 * @param  {function} callback - Receives the item, the index in the original array and the current segment index
 * @return {array}
 */
function arrayToSegments(array, segmentSize, callback) {

    // Allow the array to be a string
    if (array.constructor === String) {
        array = array.split('');
    }

    // Apply defaults
    segmentSize = segmentSize || 4;
    callback = callback || ((x) => x);

    // Error checking
    if (array.constructor !== Array) {
        throw TypeError('Expected Array, received: ' + typeof array);
    }
    if (segmentSize.constructor !== Number) {
        throw TypeError('Expected Number, received: ' + typeof segmentSize);
    }
    if (callback.constructor !== Function) {
        throw TypeError('Expected Function, received: ' + typeof callback);
    }

    // Convert to segments of the specified size
    let segments = [];
    for (let i = 0; i < array.length; i += segmentSize) {

        // Apply the callbacks to every item in this segment
        for (let j = 0; j < segmentSize; j++) {
            array[i + j] = callback(array[i + j], i + j, i / segmentSize);
        }

        segments = segments.concat([array.slice(i, i + segmentSize)]);
    }

    return segments;
}


/**
 * Converts segments to an array
 *
 * @param  {array} segments - The segments to decode
 * @param  {function} callback - A callback to apply to every item in the decoded array
 * @return {array}
 */
function segmentsToArray(segments, callback) {

    // Apply defaults
    callback = callback || ((x) => x);

    // Error checking
    if (segments.constructor !== Array) {
        throw TypeError('Expected Array, received: ' + typeof segments);
    }
    if (callback.constructor !== Function) {
        throw TypeError('Expected Function, received: ' + typeof callback);
    }

    console.log(segments);

    // Flatten the array
    segments = [].concat.apply([], segments);

    // Apply the callback
    segments = segments.map(callback);

    return segments;
}

module.exports = {
    segmentsToArray,
    arrayToSegments,
};
