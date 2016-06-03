const arrayToSegments = require('./index.js').arrayToSegments;
const segmentsToArray = require('./index.js').segmentsToArray;

const message = "Mein Name ist Leonard Schütz. Ich arbeite bei der Siemens.";

const segments = arrayToSegments(message, 10, (char) => (
    char.charCodeAt(0)
));

const decodedSegments = segmentsToArray(segments, (char) => (
    String.fromCharCode(char)
)).join('');

if (decodedSegments === message) {
    console.log('[ OK ] Test passed!');
} else {
    console.log('[ FAIL ] Test failed!');
}
