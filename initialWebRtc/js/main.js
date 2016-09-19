'use strict';

var options = {
   audio : false,
   video : true
};
var videoDoc = document.getElementById('captureVideo');

function streaming(stream){
	videoDoc.src =  window.URL.createObjectURL(stream);	
}

function error(err){
  console.log(err);
}

navigator.mediaDevices.getUserMedia(options)
.then(streaming)
.catch(error);