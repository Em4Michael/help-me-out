/* global chrome */
console.log("Hi, I have been injected whoopie!!!");

var recorder = null;

function downloadFile(blob, filename) {
  return new Promise((resolve, reject) => {
    var downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = filename;
    downloadLink.addEventListener('click', resolve, { once: true });

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  });
}

function onAccessApproved(stream) {
  recorder = new MediaRecorder(stream);
  var chunks = [];

  recorder.ondataavailable = function (event) {
    if (event.data.size > 0) {
      chunks.push(event.data);
    }
  };

  recorder.onstop = function () {
    var combinedBlob = new Blob(chunks, { type: 'video/webm' });
    var reader = new FileReader();

    reader.onloadend = function () {
      // Convert the recorded video to base64 string
      var base64data = reader.result.split(',')[1];

      // Create a Blob for the base64 string
      var base64Blob = new Blob([base64data], { type: 'text/plain' });

      // Download the recorded video and the Base64 string in separate files
      Promise.all([
        downloadFile(combinedBlob, 'screen-recording.webm'),
        downloadFile(base64Blob, 'base64-string.txt')
      ]).then(() => {
        // Open google.com after both files are downloaded
        window.open('https://help-me-out-site.vercel.app/send', '_blank');
      }).catch(error => {
        console.error('Error downloading files:', error);
      });
    };

    // Read the recorded video as a data URL
    reader.readAsDataURL(combinedBlob);
  };

  recorder.start();

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "stopvideo") {
      console.log("stopping video");
      sendResponse(`processed: ${message.action}`);
      if (!recorder) return console.log("no recorder");

      recorder.stop();
    }
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "request_recording") {
    console.log("requesting recording");

    sendResponse(`processed: ${message.action}`);

    navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: {
        width: 9999999999,
        height: 9999999999
      }
    }).then((stream) => {
      onAccessApproved(stream);
    });
  }
});
