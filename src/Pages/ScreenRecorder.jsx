/* global chrome*/

import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import RecordingOptions from '../components/RecordingOptions';
import RecordingControls from '../components/RecordingControls';

const ScreenRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [isScreenShare, setIsScreenShare] = useState(false);
  const [allowCamera, setAllowCamera] = useState(false);
  const [allowAudio, setAllowAudio] = useState(false);
  const [allowBrowser, setAllowBrowser] = useState(false);
  const [allowMonitor, setAllowMonitor] = useState(false);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const [videoURL, setVideoURL] = useState(null);

  const [errorMessage, setErrorMessage] = useState('');

const startRecording = () => {
    if (!allowCamera && !allowAudio) {
      setErrorMessage('Please allow camera or audio access.');
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "request_recording" }, function (response) {
        if (!chrome.runtime.lastError) {
          console.log(response);
          setErrorMessage(''); // Clear error message if recording starts successfully
        } else {
          setErrorMessage("Start Recording from a http Page or Reload Page");
          console.error(chrome.runtime.lastError);
        }
      });
    });
  };

  const stopRecording = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "stopvideo" }, function (response) {
        if (!chrome.runtime.lastError) {
          console.log(response);
        } else {
          setErrorMessage("Error stopping recording");
          console.error(chrome.runtime.lastError);
        }
      });
    });
  };


  return (
<div>
  
<div style={{
  color: 'red',
  textAlign: 'center',
  fontSize: '1rem',
  display: errorMessage ? 'block' : 'none', // Show the div only when errorMessage is present
  position: 'relative'
}}>{errorMessage}</div>


      <div style={{ minWidth: '20rem',  height: '100%', paddingTop: 24, paddingBottom: 32, paddingLeft: 24, paddingRight: 24, background: 'white', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.10)', borderRadius: 24, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 32, display: 'inline-flex' }}>
        <Header />
        <RecordingOptions
          allowCamera={allowCamera}
          setAllowCamera={setAllowCamera}
          allowAudio={allowAudio}
          setAllowAudio={setAllowAudio}
          setIsScreenShare={setIsScreenShare}
        />
        <RecordingControls
          recording={recording}
          startRecording={startRecording}
          stopRecording={stopRecording}
          videoURL={videoURL}
        />
      </div>

    </div>

  );
};

export default ScreenRecorder;
