import React, { useState, useRef } from 'react';
import ToggleSwitch from './ToggleSwitch';

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

  const startRecording = async () => {
    const screenOptions = {
      displaySurface: allowMonitor ? 'monitor' : (allowBrowser ? 'browser' : 'default'),
    };
    const audioOptions = allowAudio ? {} : false;
    //const videoOptions = allowMonitor ? {} : false;
    const videoOptions = allowCamera ? { ...screenOptions, video: true } : false;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: videoOptions,
        audio: audioOptions,
      });

      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (event) => {
        console.log('Data available:', event.data.size);
        if (event.data.size > 0) {
          chunks.current.push(event.data);
        }
      };


      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoURL(url);
        chunks.current = [];
      };

      mediaRecorder.current.start();
      setRecording(true);
    } catch (error) {
      console.error('Error accessing media devices:', error);
      // Handle the error, show a user-friendly message, or provide instructions to the user.
    }
  };


  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
      setRecording(false);
    }
  };

  return (
    <div style={{ minWidth: '20rem', height: '100%', paddingTop: 24, paddingBottom: 32, paddingLeft: 24, paddingRight: 24, background: 'white', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.10)', borderRadius: 24, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 32, display: 'inline-flex' }}>
      {/* <div>
        <label>Share Screen (Monitor: {allowMonitor ? 'On' : 'Off'}, Browser: {allowBrowser ? 'On' : 'Off'})</label>
        <ToggleSwitch checked={isScreenShare} onChange={() => setIsScreenShare(!isScreenShare)} />
      </div>
      <div>
        <label>Share Camera ({allowCamera ? 'On' : 'Off'})</label>
        <ToggleSwitch checked={allowCamera} onChange={() => setAllowCamera(!allowCamera)} />
      </div>
      <div>
        <label>Share Audio ({allowAudio ? 'On' : 'Off'})</label>
        <ToggleSwitch checked={allowAudio} onChange={() => setAllowAudio(!allowAudio)} />
      </div>
      <div>
        <label>Share Browser ({allowBrowser ? 'On' : 'Off'})</label>
        <ToggleSwitch checked={allowBrowser} onChange={() => setAllowBrowser(!allowBrowser)} />
      </div>
      <div>
        <label>Share Monitor ({allowMonitor ? 'On' : 'Off'})</label>
        <ToggleSwitch checked={allowMonitor} onChange={() => setAllowMonitor(!allowMonitor)} />
      </div>
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {videoURL && (
        <div>
          <a href={videoURL} download="recording.webm">
            <button>Download Recording</button>
          </a>
        </div>
      )} */}

      <div style={{ width: '100%', height: '100%', paddingTop: 24, paddingBottom: 32, paddingLeft: 24, paddingRight: 24, background: 'white', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.10)', borderRadius: 24, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 32, display: 'inline-flex' }}>

        <div style={{ alignSelf: 'stretch', height: 76, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 16, display: 'flex' }}>

          <div style={{ alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>

            <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex' }}>

              <div style={{ width: 28, height: 28, position: 'relative' }}>

                <div style={{ width: 28, height: 28.01, left: -0, top: -0.12, position: 'absolute' }}>

                  <div style={{ width: 28, height: 28.01, left: 0, top: 0, position: 'absolute', background: '#100A42' }}></div>

                  <div style={{ width: 12.25, height: 12.25, left: 7.88, top: 8, position: 'absolute', background: 'white' }}></div>
                </div>

              </div>

              <div style={{ color: '#120B48', fontSize: 16, fontFamily: 'Sora', fontWeight: '700', wordWrap: 'break-word' }}>HelpMeOut</div>

            </div>

            <div style={{ justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex' }}>
              
              <div style={{ width: 20, height: 20, position: 'relative' }}>
                <div style={{ width: 20, height: 20, left: 0, top: 0, position: 'absolute' }}>
                  <div style={{ width: 5, height: 5, left: 7.50, top: 7.50, position: 'absolute', border: '1.50px #120B48 solid' }}></div>
                  <div style={{ width: 16.68, height: 15.73, left: 1.67, top: 2.13, position: 'absolute', border: '1.50px #120B48 solid' }}></div>
                  <div style={{ width: 20, height: 20, left: 0, top: 0, position: 'absolute', opacity: 0 }}></div>
                </div>
              </div>

              <div style={{ width: 20, height: 20, position: 'relative' }}>
                <div style={{ width: 20, height: 20, left: 0, top: 0, position: 'absolute' }}>
                  <div style={{ width: 16.67, height: 16.67, left: 1.67, top: 1.67, position: 'absolute', border: '1.50px #B6B3C6 solid' }}></div>
                  <div style={{ width: 4.72, height: 4.72, left: 7.64, top: 7.64, position: 'absolute', border: '1.50px #B6B3C6 solid' }}></div>
                  <div style={{ width: 4.72, height: 4.72, left: 7.64, top: 7.64, position: 'absolute', border: '1.50px #B6B3C6 solid' }}></div>
                  <div style={{ width: 20, height: 20, left: 0, top: 0, position: 'absolute', opacity: 0 }}></div>
                </div>
              </div>
            </div>

          </div>
          <div style={{ width: 225, color: '#413C6D', fontSize: 14, fontFamily: 'Work Sans', fontWeight: '400', wordWrap: 'break-word' }}>This extension helps you record and share help videos with ease.</div>
        </div>

        <div style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'flex' }}>

          <div style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 24, display: 'flex' }}>

            <div style={{ alignSelf: 'stretch', paddingLeft: 32, paddingRight: 32, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>

              <div onClick={() => setIsScreenShare(!isScreenShare)} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex' }}>

                <div style={{ width: 32, height: 32, position: 'relative' }}>

                  <div style={{ width: 32, height: 32, left: 0, top: 0, position: 'absolute' }}>

                    <div style={{ width: 26.67, height: 20.28, left: 2.67, top: 2.67, position: 'absolute', border: '1.50px #928FAB solid' }}></div>
                    <div style={{ width: 0, height: 6.37, left: 16, top: 22.96, position: 'absolute', border: '1.50px #928FAB solid' }}></div>
                    <div style={{ width: 26.67, height: 0, left: 2.67, top: 17.33, position: 'absolute', border: '1.50px #928FAB solid' }}></div>
                    <div style={{ width: 12, height: 0, left: 10, top: 29.33, position: 'absolute', border: '1.50px #928FAB solid' }}></div>
                    <div style={{ width: 32, height: 32, left: 0, top: 0, position: 'absolute', opacity: 0 }}></div>
                  </div>

                </div>

                <div style={{ color: '#928FAB', fontSize: 14, fontFamily: 'Work Sans', fontWeight: '500', wordWrap: 'break-word' }}>
                  Full screen
                </div>

              </div>
              
              <div onClick={() => setAllowBrowser(!allowBrowser)} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex' }}>

                <div style={{ width: 32, height: 32, position: 'relative' }}>

                  <div style={{ width: 32, height: 32, left: 0, top: 0, position: 'absolute' }}>

                    <div style={{ width: 18.67, height: 18.67, left: 2.67, top: 10.67, position: 'absolute', border: '2.50px #120B48 solid' }}></div>
                    <div style={{ width: 18.67, height: 18.67, left: 10.67, top: 2.67, position: 'absolute', border: '2.50px #120B48 solid' }}></div>
                    <div style={{ width: 32, height: 32, left: 0, top: 0, position: 'absolute', opacity: 0 }}></div>
                  </div>
                </div>

                <div style={{ color: '#120B48', fontSize: 14, fontFamily: 'Work Sans', fontWeight: '600', wordWrap: 'break-word' }}>
                  Current Tab
                  </div>

              </div>
            </div>
            <div style={{ width: 252, paddingTop: 12, paddingBottom: 12, paddingLeft: 16, paddingRight: 12, borderRadius: 12, border: '1px #100A42 solid', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
              <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex' }}>
                <div style={{ width: 24, height: 24, position: 'relative' }}>
                  <div style={{ width: 19.50, height: 13.50, left: 2.25, top: 5.25, position: 'absolute', border: '1.50px #0F172A solid' }}></div>
                </div>
                <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex' }}>

        

                  <div style={{ color: '#100A42', fontSize: 14, fontFamily: 'Work Sans', fontWeight: '500', wordWrap: 'break-word' }}>
                    Camera
                  </div>

                </div>
              </div>
              <ToggleSwitch checked={allowCamera} onChange={() => setAllowCamera(!allowCamera)} />
              {/* <div style={{ width: 36, height: 20, padding: 2, background: '#120B48', borderRadius: 12, overflow: 'hidden', justifyContent: 'flex-end', alignItems: 'center', display: 'flex' }}>
                <div style={{ width: 16, height: 16, background: 'white', boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.06)', borderRadius: 9999 }} />
              </div> */}
            </div>
            <div style={{ width: 252, paddingTop: 12, paddingBottom: 12, paddingLeft: 16, paddingRight: 12, borderRadius: 12, border: '1px #100A42 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 123, display: 'inline-flex' }}>
              <div style={{ flex: '1 1 0', height: 24, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex' }}>
                <div style={{ width: 24, height: 24, position: 'relative' }}>
                  <div style={{ width: 12, height: 21, left: 6, top: 1.50, position: 'absolute', border: '1.50px #0F172A solid' }}></div>
                </div>
                <div style={{ flex: '1 1 0', height: 20, justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>
                 
                  <div style={{ color: '#100A42', fontSize: 14, fontFamily: 'Work Sans', fontWeight: '500', wordWrap: 'break-word' }}>
                    Audio 
                    </div>
                    <ToggleSwitch checked={allowAudio} onChange={() => setAllowAudio(!allowAudio)} />
                  {/* <div style={{ width: 36, height: 20, padding: 2, background: '#120B48', borderRadius: 12, overflow: 'hidden', justifyContent: 'flex-end', alignItems: 'center', display: 'flex' }}>
                    <div style={{ width: 16, height: 16, background: 'white', boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.06)', borderRadius: 9999 }} />
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <div style={{ width: '100%', height: 51, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <div style={{ alignSelf: 'stretch', height: 51, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, display: 'flex' }}>
              <div style={{ alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex' }}>
                <button style={{ alignSelf: 'stretch', width: 252, padding: 16, background: '#120B48', borderRadius: 12, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex', color: '#FAFDFF', fontSize: 16, fontFamily: 'Work Sans', fontWeight: '500', wordWrap: 'break-word'}} onClick={recording ? stopRecording : startRecording}>
                  {recording ? 'Stop Recording' : 'Start Recording'}
                </button>
                 {videoURL && (
                  <div>
                    <a href={videoURL} download="recording.webm">
                      <button>Download Recording</button>
                    </a>
                  </div>
                )} 
              {/*   <div style={{ color: '#FAFDFF', fontSize: 16, fontFamily: 'Work Sans', fontWeight: '500', wordWrap: 'break-word' }}>Start Recording</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenRecorder;