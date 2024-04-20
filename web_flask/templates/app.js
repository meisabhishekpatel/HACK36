let videoElement = document.getElementById('videoElement');
let startRecordButton = document.getElementById('startRecord');
let stopRecordButton = document.getElementById('stopRecord');
let downloadRecordButton = document.getElementById('downloadRecord');
let mediaRecorder;
let recordedChunks = [];
let recordedStream;

startRecordButton.addEventListener('click', startRecording);
stopRecordButton.addEventListener('click', stopRecording);
downloadRecordButton.addEventListener('click', downloadRecording);

function startRecording() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            recordedStream = stream;
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = function (e) {
                if (e.data.size > 0) {
                    recordedChunks.push(e.data);
                }
            };
            mediaRecorder.onstop = function () {
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                downloadRecordButton.href = URL.createObjectURL(blob);
                downloadRecordButton.download = 'recorded_video.webm';
                downloadRecordButton.disabled = false;
                recordedChunks = [];
                recordedStream.getTracks().forEach(track => track.stop());
            };
            mediaRecorder.start();
            startRecordButton.disabled = true;
            stopRecordButton.disabled = false;
        })
        .catch(function (err) {
            console.log("Error accessing the webcam: " + err);
        });

    // Start streaming webcam video to video element
    const constraints = { video: true };
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            videoElement.srcObject = stream;
        })
        .catch(function (err) {
            console.log("Error streaming video: " + err);
        });
}

function stopRecording() {
    mediaRecorder.stop();
    startRecordButton.disabled = false;
    stopRecordButton.disabled = true;
}

function downloadRecording() {
    downloadRecordButton.disabled = true;
}
