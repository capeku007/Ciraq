<template>
  <div class="relative bg-yellow-200 min-h-[74svh] h-[74svh] max-h-[74svh]">
    <video ref="videoPlayer" class="rounded-lg h-full w-full object-cover" autoplay></video>
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center space-x-4">
    <button @click="takePicture" :disabled="recording" v-if="!recording" class="bg-green-500 text-white px-4 py-2 rounded-lg">Take Picture</button>
      <button @click="startRecording" :disabled="recording" v-if="!recording" class="bg-blue-500 text-white px-4 py-2 rounded-lg">Start Recording</button>
      <button @click="stopRecording" :disabled="!recording" v-if="recording" class="bg-red-500 text-white px-4 py-2 rounded-lg">Stop Recording</button>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      recording: false,
      mediaRecorder: null,
      recordedChunks: [],
      pictureUrl: null,
    };
  },
  mounted() {
    // this.setupCamera();
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

        takePicture() {
      const canvas = document.createElement('canvas');
      const video = this.$refs.videoPlayer;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

      this.pictureUrl = canvas.toDataURL('image/png');
      this.showPicture = true;
      this.$emit('pictureTaken', this.pictureUrl); // Emit event with picture URL
    },
    
  },
};
</script>

<style scoped>
@media (max-width: 640px) {
  .relative {
    height: auto !important;
  }

  .relative video {
    height: calc(100vw * 16 / 9); /* Maintain 9:16 aspect ratio */
    max-height: 100%; /* Ensure it doesn't exceed the parent container's height */
  }
}
</style>