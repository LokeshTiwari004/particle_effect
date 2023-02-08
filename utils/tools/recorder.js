export function recorder(recording = 0) {
    if (recording in [0, 1]) {
      var link = document.createElement("a");

      var videoStream = this.canvas.captureStream(60);
      var mediaRecorder = new MediaRecorder(videoStream);

      var chunks = [];
      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };
      mediaRecorder.onstop = () => {
        var blob = new Blob(chunks, { type: "video/mp4" });
        chunks = [];
        var blobURL = URL.createObjectURL(blob);
        link.href = blobURL;
        link.download = "video.mp4";
      };

      const save = document.createElement("button");
      save.id = "save";
      save.style.display = "none";
      save.innerHTML = "Save";
      save.addEventListener("click", () => {
        link.click();
        save.style.display = "none";
      });

      function toggleRecord(e) {
        if (recording) {
          recording = 0;
          mediaRecorder.stop();

          e.target.innerHTML = "Start Recording";
          save.style.display = "inline";
        } else {
          recording = 1;
          mediaRecorder.start();

          e.target.innerHTML = "Stop Recording";
          save.style.display = "none";
        }
      }

      const toggleRecorder = document.createElement("button");
      toggleRecorder.id = "toggleRecorder";
      toggleRecorder.innerHTML = recording
        ? "Stop Recording"
        : "Start Recording";
      toggleRecorder.addEventListener("click", (e) => toggleRecord(e));

      this.controls.appendChild(toggleRecorder);
      this.controls.appendChild(save);

      recording ? mediaRecorder.start() : undefined;
    } else {
      throw new Error(
        `recording argument has only two acceptable values\n\ 0 (default): sets recorder \n\ 1: sets recorder and starts recording \n\ Assigned value is ${recording}`
      );
    }
  }