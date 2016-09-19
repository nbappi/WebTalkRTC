'use strict';

var options = {
   audio : false,
   video : true
};

var videoDoc = document.getElementById('captureVideo');
var captureBtn = document.getElementById('canvasBtn');
var canvas = window.canvas = document.querySelector('canvas');
canvas.width = 100;
canvas.height = 150;

captureBtn.onclick = function(){
   canvas.width = videoDoc.videoWidth;
   canvas.height = videoDoc.videoHeight;
   canvas.getContext('2d').drawImage(videoDoc, 0, 0, canvas.width, canvas.height);
};

function streaming(stream){
	videoDoc.src =  window.URL.createObjectURL(stream);	
}

function error(err){
  console.log(err);
}


navigator.mediaDevices.getUserMedia(options)
.then(streaming)
.catch(error);