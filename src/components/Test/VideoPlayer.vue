<template>
  <div style="width: 500px;height: 700px;align-content: center">

      <video-player  class="video-player vjs-custom-skin"
                     ref="videoPlayer"
                     :playsinline="true"
                     :options="playerOptions"
      ></video-player>
  </div>


</template>

<script>
    export default {
      data(){
          return{
            playerOptions : {
              playbackRates: [0.7, 1.0, 1.5, 2.0],
              autoplay: true,
              muted: false,
              loop: false,
              preload: 'auto',
              language: 'zh-CN',
              aspectRatio: '16:9',
              fluid: true,
              sources: [{
                type: "",
                src: "http://172.18.32.192:8082/file/upload/20180827/RESTful 设计理念.mp4"
              }],
              poster: "../../static/images/test.jpg",
              // width: document.documentElement.clientWidth,
              notSupportedMessage: '此视频暂无法播放，请稍后再试',
              controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: false
              }
            }
          }
      }
    }
</script>

<style scoped>
  .video-js .vjs-big-play-button{}
</style>
