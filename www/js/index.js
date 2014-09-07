console.log("LOADED");
function twodec(num3){
return parseFloat(Math.round(num3 * 100) / 100).toFixed(2);
}
var mediaFile;
var taps = 1;
var audioTag = document.getElementById("audio");
var hr = document.getElementById("hr");
var loop;
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
  taps = 1;
  console.log("playing next");
  if(!!clips[0]) {
    lastClip = clips[0];
    document.getElementById("upvotes").innerHTML = twodec(clips[0].get("upvotes"));
    document.getElementById("audio").src = clips.shift().get("file")._url;
    if(clips.length < 3) {
      getClips();
    }
  }

  loop = setInterval(function() {
    hr.style.width = ((audioTag.currentTime / audioTag.duration) * 100) + "%";
  }, 150);
}

getClips();
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
  audioTag.pause();
  clearInterval(loop);
}

var burstStopPlay = burstPausePlay;

function burstUpVote() {
  lastClip.increment("upvotes");
  return lastClip.save();
}

function burstDownVote() {
  lastClip.increment("upvotes", -1);
  return lastClip.save();
}

$("#stop-button")[0].ontouchstart = function() {
  burstPausePlay();
  audioTag.pause();
	$(".screen").css("display", "none");
	$("#main-screen").show();
};

document.getElementById('voteup').ontouchstart = function () {
  burstUpVote();
  document.getElementById("upvotes").innerHTML = twodec(parseInt(document.getElementById("upvotes").innerHTML) + 1/taps);
  taps++;
};
document.getElementById('votedown').ontouchstart = function () {
  burstDownVote();
  document.getElementById("upvotes").innerHTML = twodec(parseInt(document.getElementById("upvotes").innerHTML) -1/taps);
  taps++;
};
