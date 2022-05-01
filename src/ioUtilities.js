const fs = require("fs");

const readFile = function(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return -1;
    }
    return data;
  });
};

exports.readFile = readFile;
