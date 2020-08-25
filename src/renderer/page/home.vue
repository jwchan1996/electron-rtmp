<template>
  <div class="main-container">
    <div class="top-bar">
      <div class="title">electron-rtmp</div>
      <div class="func">
        <a-icon type="minus" class="minus" @click="minimize" />
        <a-icon type="border" class="maxus" @click="maximize" />
        <a-icon type="close" class="close" @click="close" />
      </div>
    </div>
    <router-view class="main-content"></router-view>
  </div>
</template>
<script>
import { remote as Remote} from "electron"

export default {
  data() {
    return {
      msg: "我是home主界面",
    };
  },
  methods: {
    minimize(){
      Remote.getCurrentWindow().minimize()
    },
    maximize(){
      if(this.maxState){
        Remote.getCurrentWindow().unmaximize()
        this.maxState = false
      }else{
        Remote.getCurrentWindow().maximize()
        this.maxState = true
      }
    },
    close(){
      this.$confirm({
        title: '提示',
        content: '即将关闭应用？',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          Remote.getCurrentWindow().close()
        },
        onCancel() {},
      });
    }
  }
};
</script>
<style scoped lang="stylus">
.main-container {

  .top-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    -webkit-app-region: drag;

    .title {
      // visibility: hidden;
      padding:  5px 20px;
      color: #ccc;
    }

    .func {
      display: flex;
      flex-direction: row;
      align-items: center;
      -webkit-app-region: no-drag;

      .minus {
        padding: 8px 14px;

        &:hover{
          background-color: #cdcdcd;
        }
      }

      .maxus {
        font-size: 12px;
        padding: 8px 14px;

        &:hover{
          background-color: #cdcdcd;
        }
      }

      .close {
        padding: 8px 14px;

        &:hover{
          color: #ececec;
          background-color: #DC143C;
        }
      }
    }
  }

  .main-content {
    // padding-top: 100px;
    position: fixed;
    // top: 90px;
    width: 100vw;
    height: calc(100vh - 90px);
    overflow-y: auto;
    scrollbar-width: none;
  }

  .ant-modal {
    .ant-form-item {
      // margin-bottom 0 !important
    }
  }
}
</style>
