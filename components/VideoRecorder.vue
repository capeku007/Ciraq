<template>
  <div>
    <video class="rounded-lg" ref="videoPlayer" autoplay></video>
    <button @click="startRecording" :disabled="recording" v-if="!recording">Start Recording</button>
    <button @click="stopRecording" :disabled="!recording"  v-if="recording">Stop Recording</button>
  </div>
</template>



<script>
export default {
  data() {
    return {
      recording: false,
      mediaRecorder: null,
      recordedChunks: [],
    };
  },
  mounted() {
    this.setupCamera();
  },
  methods: {
async setupCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }, // or 'user' for front-facing camera
      audio: true,
    });
    this.$refs.videoPlayer.srcObject = stream;
  } catch (error) {
    console.error('Error accessing camera:', error);
  }
},

    async startRecording() {
      try {
        const stream = this.$refs.videoPlayer.srcObject;
        if (!stream) {
          console.error('Camera stream not available.');
          return;
        }

        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.recordedChunks.push(event.data);
          }
        };

        this.mediaRecorder.onstop = () => {
          const recordedBlob = new Blob(this.recordedChunks, { type: 'video/mp4' });
          const recordedUrl = URL.createObjectURL(recordedBlob);
          this.$emit('videoRecorded', recordedUrl);
          this.recordedChunks = [];
        };

        this.mediaRecorder.start();
        this.recording = true;
      } catch (error) {
        console.error('Error starting video recording:', error);
      }
    },
    stopRecording() {
      this.mediaRecorder.stop();
      this.recording = false;
    }, 
    
  },
};
</script>
