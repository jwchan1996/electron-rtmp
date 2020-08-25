<template>
  <div class="main-container">
    <a-row>
      <a-col :span="12" id="leftLayout">
        <Player id="player" v-if="isFirstPlay"></Player>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import Player from "component/player";

export default {
  data() {
    return {
      msg: "直播",
      isFirstPlay: true
    };
  },
  mounted() {
    this.bus.$on("refleshPlayer", () => {
      this.isFirstPlay = false;
      this.$nextTick(() => {
        this.isFirstPlay = true;
      });
    });
  },
  components: {
    Player
  }
};
</script>
<style scoped lang="stylus">
.main-container {
  padding: 20px 40px;
}
</style>
