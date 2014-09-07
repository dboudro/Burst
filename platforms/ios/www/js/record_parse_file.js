function record_parse_file() {
  return new Promise(function(done, l) {
    function readFile(file) {
      reader = new FileReader();
      reader.onloadend = function(evt) {
        console.log("Read as data URL");
        //console.log(evt.target.result);
        parseFile = new Parse.File("recording.wav", { base64: evt.target.result.split(",")[1] });//TODO simple optimization
        done(parseFile);
      };
      reader.readAsDataURL(file);
    }
    function captureSuccess(mf) {
    console.log("capture successful");
      mediaFile = mf;

      requestFileSystem(LocalFileSystem.PERSISTENT,0, function (fs) {
        console.log("got fs", fs);
        resolveLocalFileSystemURL(mediaFile[0].localURL, function(fe) {
          console.log("got fe: ", fe);
          fe.file(function(file) {
            console.log("got file: ", file);
            readFile(file);
          }, l);
        }, l);
      },l);

      //m = new Media(mediaFile[0].fullPath);
      //m.play();
    }
    navigator.device.capture.captureAudio(
      captureSuccess, l, {}
    );
  });
}
