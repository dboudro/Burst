console.log("LOADED");
var mediaFile;

function l(){console.log(arguments);}

var lastClip;
var clips;

function getClips() {
  var Clip = Parse.Object.extend("Clip");
    var query = new Parse.Query(Clip);
  query.limit(30);
  query.descending("createdAt");
  query.notEqualTo("device", (window.device||{uuid: Math.random + ''}).uuid);
  query.find()
  .then(function(_clips) {
    clips = _clips;
  });
}
function next() {
  console.log("playing next");
  if(!!clips[0]) {
    document.getElementById("audio").src = clips.shift().get("file")._url;
    if(clips.length < 3) {
      getClips();
    }
  }

  loop = setTimeout(function() {
    hr.style.width = ((audioTag.currentTime / audioTag.duration) * 100) + "%";
  }, 150);
}

getClips();
var audioiTag = document.getElementById("audio");
var hr = document.getElementById("hr");
var loop;
function burstStartRecording() {
  record_parse_file()
  .then(function(parseFile){
    console.log("got parse file: ". parseFile);
    return parseFile.save();
  },l)
  .then(function(savedFile) {
    console.log("got saved file: ", savedFile);
    if(!!savedFile) {
      var clip = new Parse.Object("Clip");
      clip.set("device", device.uuid);
      clip.set("upvotes", 0);
      clip.set("tags", []);
      clip.set("file", savedFile);
      lastClip = clip;
      clip.save();
    }
  },l);
}

function burstAddTag(tag) {
  lastClip.addUnique("tags", tag);
  return lastClip.save();
}

function burstPlay() {
  next();

}

function burstPausePlay() {
  audioiTag.pause();
  clearTimeout(loop);
}

var burstStopPlay = burstPausePlay;

function burstUpVote() {
  lastClip.increment("upvotes");
  return lastClip.save();
}

function burstDownVote() {
  lastClip.decrement("upvotes");
  return lastClip.save();
}
