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
    clip.set("device", device.uuid);
    clip.set("upvotes", 0);
    clip.set("file", savedFile);
    clip.save();
  });
};

var clips;
function next() {
  console.log("playing next");
  if(!!clips[0])
    document.getElementById("audio").src = clips.shift().get("file")._url;
}
document.getElementById("next").onclick = next;

var Clip = Parse.Object.extend("Clip");
var query = new Parse.Query(Clip);
query.limit(10);
query.descending("createdAt");
query.notEqualTo("device", device.uuid);
query.find()
.then(function(_clips) {
  document.getElementById("next").classList.remove("hidden");
  clips = _clips;
  next();
});
