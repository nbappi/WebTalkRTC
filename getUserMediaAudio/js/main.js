'use strict';

var options = {
   audio : true,
   video : false
};

var audioDom = document.querySelector('audio');

function streaming(stream){
	var audioTrack = stream.getAudioTracks();
	audioDom.srcObject = stream;
}

function error(err){
  console.log(err);
}


navigator.mediaDevices.getUserMedia(options)
.then(streaming)
.catch(error);