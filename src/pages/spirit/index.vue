<template>
  <div class="spirit">
    <div class="spirit-data">
      <span class="spirit-data-item">{{ x }}°
        <span>水平</span>
      </span>
      <span class="spirit-data-item">{{ y }}°
        <span>垂直</span>
      </span>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      x: 0,
      y: 0
    }
  },
  mounted() {
    this.onAccelerometerChange()
  },
  methods: {
    onAccelerometerChange() {
      const that = this
      wx.onAccelerometerChange(function(res) {
        that.x = res.x
        that.y = res.y
      })
    }
  },
  onShow() {
    // 打开加速器监听
    wx.startAccelerometer()
  },
  onHide() {
    // 关闭加速器监听
    wx.stopAccelerometer()
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import '../../styles/mixin.scss';
.spirit {
  height: 100%;
  overflow: hidden;
  .spirit-data {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 50px;
    .spirit-data-item {
      font-size: 16px;
      color: #fff;
    }
  }
}
</style>
