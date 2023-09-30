// content.js

const startRecordingAutomatically = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];
  
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };
  
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'screen-recording.webm';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      chunks.length = 0;
    };
  
    mediaRecorder.start();
  };
  
  startRecordingAutomatically();
  