
/**
 * Convert an array to segments
 *
 * @param  {array, string} array
 * @param  {number} segmentSize, default is 4
 * @param  {function} callback - Receives the item, the index in the original array and the current segment index
 * @return {array}
 */
function arrayToSegments(array, segmentSize, callback) {

    // array is required
    if (typeof array === 'undefined' || array === null) {
        throw Error('You forgot to pass an array.');
    }

    // segmenzSize is required
    if (typeof segmentSize === 'undefined' || array === null) {
        throw Error('You forgot to pass a segmentSize.');
    }

    // Array can be a string or an array
    if (typeof array !== 'string' && array.constructor !== Array) {
        throw TypeError('Expected an array or string, received: ' + typeof segmentSize);
    }

    // segmentSize can only be a number
    if (typeof segmentSize !== 'number') {
        throw TypeError('Expected a number, received: ' + typeof segmentSize);
    }

    // If a callback was passed, it can only be a function
    if (typeof callback !== 'undefined') {
        if (typeof callback !== 'function') {
            throw TypeError('Expected a function, received: ' + typeof callback);
        }
    }

    // Use Array.from to convert to an array
    array = Array.from(array);

    // If the array is empty, return an empty array back
    if (array.length === 0) {
        return [];
    }

    // segmentSize can't be zero
    if (segmentSize < 1) {
        throw Error('Can\'t create a segment with size: ' + segmentSize);
    }

    // Copy the array by value, not by reference
    array = array.slice(0);

    let segments = [];
    for (let i = 0; i < array.length; i += segmentSize) {

        // If a callback was passed, iterate over it
        if (callback) {
            for (let j = 0; j < segmentSize; j++) {
                if (i + j < array.length) {
                    const callbackResult = callback(array[i + j], i + j, i / segmentSize);
                    if (typeof callbackResult !== 'undefined') {
                        array[i + j] = callbackResult;
                    }
                }
            }
        }

        segments = segments.concat([
            array.slice(i, i + segmentSize)
        ]);
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
