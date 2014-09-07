goToHomecreen = function() {
		$(".screen").css("display", "none");
		$("#main-screen").show();
};
goToRecordingScreen	= function() {
		$(".screen").css("display", "none");
		$("#recording-screen").show();
};
goToListeningScreen = function() {
		$(".screen").css("display", "none");
		$("#listen-screen").show();
};

document.getElementById('stop-button').ontouchstart = function() {
  goToHomecreen();
};


