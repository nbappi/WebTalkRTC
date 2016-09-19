'use strict';

var options = {
   audio : true,
   video : true
};

var mediaRecorder;
var recordedBlobs;

var gumVideo = document.querySelector('video#gum');
var recordedVideo = document.querySelector('video#recorded');

var recordButton = document.querySelector('button#record');
var playButton = document.querySelector('button#play');
recordButton.onclick = toggleRecording;
playButton.onclick = play;


function toggleRecording() {
  if (recordButton.textContent === 'Start') {
    startRecording();
  } else {
    stopRecording();
    recordButton.textContent = 'Start';
    playButton.disabled = false;
  }
}

function startRecording() {
  recordedBlobs = [];
  var options = {mimeType: ''};
  mediaRecorder = new MediaRecorder(window.stream, options);

  recordButton.textContent = 'Stop';
  playButton.disabled = true;
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(10); 
}

function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

function play() {
  var superBuffer = new Blob(recordedBlobs, {type: ''});
  recordedVideo.src = window.URL.createObjectURL(superBuffer);
}

function stopRecording() {
  mediaRecorder.stop();
  recordedVideo.controls = true;
}


function streaming(stream){
	window.stream = stream;
	gumVideo.src = window.URL.createObjectURL(stream);
}

function error(err){
  console.log(err);
}

navigator.mediaDevices.getUserMedia(options)
.then(streaming)
.catch(error);