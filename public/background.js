// background.js
/* global chrome */

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if (message.action === "request_recording") {
		chrome.tabCapture.capture({ audio: true, video: true }, function (stream) {
			chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, { action: "startRecording", stream: stream });
			});
		});
		sendResponse({ message: "Starting video and audio recording..." });
	}
});
