const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

// var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

// exports.create = (text, callback) => {
//   var id = counter.getNextUniqueId();
//   items[id] = text;
//   callback(null, { id, text });
// };

exports.create = (text, callback) => {
  counter.getNextUniqueId(function(err, id) {
    // write text to new file with corr ID ?
    if (err) {
      throw ('Error');
    } else {
      fs.writeFile(`${exports.dataDir}/${id}.txt`, text, function (err) {
        if (err) {
          throw ('failed to create');
        } else {
          callback(null, {id, text});
        }
      });
    }
  }); //getNextUniqueId passes the ID into the callback(null, zerPaddedNumber(count + 1)), so
};

// exports.readAll = (callback) => {
//   var data = _.map(items, (text, id) => {
//     return { id, text };
//   });
//   callback(null, data);
// };

exports.readAll = (callback) => {
  fs.readdir(`${exports.dataDir}/`, function(err, files) {
    let data = _.map(files, (text, id) => {
      var string = text.replace('.txt', ''); // note: can't read file content?
      return { id: string, text: string };
    });
    callback(null, data);
  });
};


// exports.readOne = (id, callback) => {
//   var text = items[id];
//   if (!text) {
//     callback(new Error(`No item with id: ${id}`));
//   } else {
//     callback(null, { id, text });
//   }
// };

exports.readOne = (id, callback) => {
  // navigating to the dir, read file
  fs.readFile(`${exports.dataDir}/${id}.txt`, 'utf8', function(err, text) {
    if (err) {
      // throw ('error');
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback(null, { id, text });
    }
  });
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
