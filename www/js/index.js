console.log("LOADED");
var mediaFile;

function l(){console.log(arguments);}

document.getElementById("record").onclick = function () {
  record_parse_file().then(l,l);
};
