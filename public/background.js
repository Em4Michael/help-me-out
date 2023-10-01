// background.js
/* global chrome */

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if (message.action === "request_recording") {
	  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs, activeTab) {
		chrome.scripting.executeScript({
		  target: { tabId: tabs[0].id, allFrames: true },
		  function: () => {
			return { message: "Content script injected" };
		  }
		});
	  });
	  sendResponse({ message: "Starting video..." });
	}
  });
  