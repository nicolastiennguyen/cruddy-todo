const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

// ex: 100014.58, 87463.209, 20171109, 755378.34, 99977
// --> 00100014.58, 00087463.209, 20171109, 00755378.34, 00099977

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

// save the current state of the counter to the hard drive using readCounter and writeCounter

// getNextUniqueId tests:
// should use error first callback pattern
// should give an id as a zero padded string
// should give the next id based on the count in the file
// should update the counter file with the next value

exports.getNextUniqueId = (callback) => {
  readCounter(function(err, count) {
    if (err) {
      throw ('failed to read file');
    } else {
      writeCounter(count + 1, function(err) {
        if (err) {
          throw ('failed to write');
        } else {
          callback(err, zeroPaddedNumber(count + 1));
        }
      });
    }
  });
};

// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
