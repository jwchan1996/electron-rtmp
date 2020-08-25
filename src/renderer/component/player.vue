<template>
  <div class="container">
    <a-spin tip="加载中..." :spinning="spinning">
      <video-player
        class="vjs-custom-skin"
        ref="videoPlayer"
        :options="options"
        :playsinline="true"
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
        @ready="playerReadied"
      ></video-player>
    </a-spin>
  </div>
</template>

<script>
import "videojs-flash";

export default {
  data() {
    return {
      options: {
        // width: 100,
        // height: 100,
        autoplay: true,
        controls: true,
        preload: 'none',
        muted: false,
        aspectRatio: "16:9",
        language: "zh-CN",
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        },
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "rtmp/mp4",
            src: "rtmp://58.200.131.2:1935/livetv/hunantv",
          },
        ],
        techOrder: ["flash", "html5"],
        poster: "",
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
      },
      //视频是否首次播放
      isFirstPlay: true,
      //遮蔽层状态
      spinning: true
    }
  },
  mounted(){
    this.checkFlash()
    console.log(navigator.plugins)
  },
  methods: {
    // listen event
    onPlayerPlay(player) {
      // console.log('player play 播放!', player)
      if(!this.isFirstPlay){
        //重新加载播放器
        this.bus.$emit("refleshPlayer")
      }
      this.isFirstPlay = false
    },
    onPlayerPause(player) {
      // console.log('player pause 暂停', player)
    },
    // player is ready
    playerReadied(player) {
      this.spinning = false
    },
    //检查flash是否开启
    checkFlash(){
      let flag = false;
      if(window.ActiveXObject){
        try{
          let swf = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
          if(swf){
            flag = true;
          }
        }catch(e){
        }
      }else{
        try{
          let swf = navigator.plugins['Shockwave Flash'];
          if(swf){
            flag = true;
          }
        }catch(e){
        }
      }
      if(flag){
        console.log("flash running ok");
      }else{
        console.log("flash running error");
        this.spinning = false
      }
    },
  }
}
</script>

<style scoped lang="stylus">
.container{
  width 100%
  border-radius 10px
  background-color #e9f0f5
  padding 20px

  /deep/ .vjs-text-track-display{
    display none
  }

  /deep/ .vjs-button{
    outline none
  }

  /deep/ .vjs-play-control{
    display none
  }

  /deep/ .vjs-progress-control{
    visibility hidden
  }
}
</style>