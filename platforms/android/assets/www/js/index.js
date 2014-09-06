console.log("LOADED");
var mediaFile;

function l(){console.log(arguments);}

document.getElementById("record").onclick = function () {
  record_parse_file()
  .then(function(parseFile){
    console.log("got parse file: ". parseFile);
    return parseFile.save();
  },l)
  .then(function(savedFile) {
    console.log("got saved file: ", savedFile);
    var clip = new Parse.Object("Clip");
    clip.set("wav", savedFile);
    clip.save();
  });
};
