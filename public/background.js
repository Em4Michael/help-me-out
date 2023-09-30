// background.js
/* global chrome */
chrome.runtime.onInstalled.addListener(() => {
    chrome.runtime.onConnect.addListener((port) => {
      port.postMessage({ action: 'popup-connected' });
  
      port.onMessage.addListener((msg) => {
        if (msg.action === 'request-permissions') {
          chrome.permissions.request({
            permissions: ['activeTab', 'videoCapture']
          }, (granted) => {
            port.postMessage({ permissionsGranted: granted });
          });
        } else if (msg.action === 'start-recording') {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'start-recording' });
          });
        } else if (msg.action === 'stop-recording') {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'stop-recording' }, (response) => {
              port.postMessage({ url: response.url });
            });
          });
        }
      });
    });
  });
  