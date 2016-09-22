'use strict';

var startButton = document.getElementById('startButton');
var callButton = document.getElementById('callButton');
var hangupButton = document.getElementById('hangupButton');

var localVideo = document.getElementById('localVideo');
var remoteVideo = document.getElementById('remoteVideo');

var localStream, pc1, pc2;
var options = { audio: true, video: true };
var offerOptions = { offerToReceiveAudio: 1, offerToReceiveVideo: 1 };

startButton.onclick = function() {
    navigator.mediaDevices.getUserMedia(options)
        .then(function(stream){
            localVideo.src =  window.URL.createObjectURL(stream);
            localStream = stream;
        })
        .catch(function(e) {
            console.log('getUserMedia error.');
        });
}

function RTCPeerConnection(servers){
	var rtc = mozRTCPeerConnection(servers) || webkitRTCPeerConnection(servers) || RTCPeerConnection(servers);
	console.log(rtc);
	return rtc;
};

callButton.onclick = function() {
    var servers = null;
    pc1 = new webkitRTCPeerConnection(servers);
    pc2 = new webkitRTCPeerConnection(servers);

    pc1.onicecandidate = function(event) {
	  	iceCandidate(pc2, event);
    };

    pc2.onicecandidate = function(event) {
        iceCandidate(pc1, event);
    };

    pc2.onaddstream = function(e){
  	    remoteVideo.src =  window.URL.createObjectURL(e.stream);
    };

    pc1.addStream(localStream);

    pc1.createOffer(
        offerOptions
    ).then(function(desc){
		pc1.setLocalDescription(desc).then(
		  	function(){ console.log("pc1 local description.")},
		    function(err){ console.log("pc1 local description error.")}
		);

		pc2.setRemoteDescription(desc).then(
		    function() { console.log("Pc2 remote Description"); },
		    function(err){ console.log("Pc2 remote Description Error"); }
		);

		pc2.createAnswer().then(function(desc){
			 pc2.setLocalDescription(desc).then(
			    function() { console.log("Pc2 local Description when create answer."); },
			    function(err){ console.log( "pc2 local description Error when create answer.");}
			  );

			  pc1.setRemoteDescription(desc).then(
			    function() { console.log("Pc2 remote Description when create answer."); },
		        function(err){ console.log("Pc2 remote Description Error when create answer."); }
			  );
			},
		function(err){ console.log("Pc2 answer error.")}
		);
    },
    function(err){ console.log("pc1 createoffer error.")}
  );
};

function iceCandidate(pc, event){
	if (event.candidate) {
	    pc.addIceCandidate(
			new RTCIceCandidate(event.candidate)
		).then(function() { console.log("onicecandidate success"); },
			   function(err) { console.log("onicecandidate Error" + err); }
		);
	}
};

hangupButton.onclick = function(){
	pc1.close();
	pc2.close();
}