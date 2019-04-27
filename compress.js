const fs = require("fs");
const { ignore, spacing, inputFolder, numbers, numberSeperator, fileIdentifier } = require("./settings");

var walk = function(dir, n = dir.length) {
  var results = {};
  if (!fs.existsSync(dir)) return {};
  var list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + "/" + file;
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = { ...results, ...walk(file, n) };
    } else {
      let fileName = file.split("/");
      fileName = fileName[fileName.length - 1];
      if (ignore.indexOf(fileName) === -1) {
        results[file.substr(n + 1)] = fs.readFileSync(file, "utf8");
      }
    }
  });
  return results;
};

let items = walk(inputFolder);
let textified = Object.keys(numbers).map(key => key + " - " + numbers[key] + "\n").join("") + numberSeperator + "\n".repeat(spacing[1]);
Object.keys(items).map(key => {
  textified += fileIdentifier.join(key) + "\n".repeat(spacing[0]) + items[key] + "\n".repeat(spacing[1]);
});

fs.writeFileSync("./" + Object.keys(numbers).join(" - ") + ".txt", textified);
