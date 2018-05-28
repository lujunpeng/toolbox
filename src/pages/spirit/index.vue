<template>
  <div class="spirit">
    <span>水平：{{ x }}</span>
    <span>垂直：{{ y }}</span>
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
      wx.onAccelerometerChange(function(res) {
        this.x = res.x
        this.y = res.y
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

</style>
