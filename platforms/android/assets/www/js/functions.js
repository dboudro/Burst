//////////////////// MAIN SCREEN ////////////////////
$("#record-button")[0].ontouchstart = function() {
	burstStartRecording();
};

$("#play-button")[0].ontouchstart = function() {
	burstPlay()
	$(".screen").css("display", "none");
	$("#listen-screen").show();
}

////////////////// RECORDING SCREEN //////////////////
$("#stop-recording-button")[0].ontouchstart = function() {
	burstStopPlay();
	$(".screen").css("display", "none");
	$("#main-screen").show();
};

////////////////// LISTENING SCREEN //////////////////
$("#pause-button")[0].ontouchstart = function() {
	burstPausePlay();
};

$("#stop-button")[0].ontouchstart = function() {
	burstStopPlay();
	$(".screen").css("display", "none");
	$("#main-screen").show();
};

///////////////////// TAG SCREEN /////////////////////
function() {
	$("#input-tag").css("display","none");
	$("#tag-area").prepend("<div class="tag">test-tag</div>");
}