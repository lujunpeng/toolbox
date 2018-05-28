<template>
  <div class="compass">
    <div class="compass-entity">
      <span class="compass-pointer"></span>
      <div class="compass-direction">
        <div class="direction">{{ direction }}°</div>
        <div class="position">{{ position }}</div>
      </div>
      <div class="compass-round" :style="{transform: 'rotate(' + (360 - direction) + 'deg)'}">
        <div class="round-item" :style="{ height: item.height + 'rpx', top: item.top + 'rpx', left: item.left + 'rpx', transform: 'rotate(' + item.rotate + 'deg)'}" v-for="(item, index) in pointerList" :key="index">
          <span class="round-text">{{ item.text }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      direction: 0,
      position: '正东'
    }
  },
  computed: {
    // 计算属性的 getter
    pointerList: function() {
      const total = 60
      // `this` 指向 vm 实例
      const pointerList = []
      // 起始角度
      // const stard = 0
      // 半径
      const radius = 260
      // 每一个BOX对应的角度;
      const avd = 360 / total
      // 每一个BOX对应的弧度;
      const ahd = avd * Math.PI / 180
      for (let index = 0; index < total; index++) {
        const item = {
          left: (Math.sin(ahd * index) * radius - 1).toFixed(2),
          top: (Math.cos(ahd * index) * radius).toFixed(2),
          rotate: 180 - avd * index
        }
        if (
          index === 0 ||
          index === total / 4 ||
          index === total / 2 ||
          index === total / 4 * 3
        ) {
          item.height = 40
          if (index === 0) {
            item.text = '南'
          } else if (index === total / 4) {
            item.text = '东'
          } else if (index === total / 2) {
            item.text = '北'
          } else if (index === total / 4 * 3) {
            item.text = '西'
          }
        } else {
          item.height = 20
        }
        pointerList.push(item)
      }
      return pointerList
    }
  },
  mounted() {
    this.onCompassChange()
  },
  methods: {
    onCompassChange() {
      const that = this
      wx.onCompassChange(function(res) {
        const direction = res.direction
        that.direction = parseInt(direction)
        if (direction <= 95 && direction >= 85) {
          that.position = '正东'
        } else if (direction < 175 && direction > 95) {
          that.position = '东南'
        } else if (direction <= 185 && direction >= 175) {
          that.position = '正南'
        } else if (direction < 265 && direction > 185) {
          that.position = '西南'
        } else if (direction <= 275 && direction >= 265) {
          that.position = '正西'
        } else if (direction < 355 && direction > 275) {
          that.position = '西北'
        } else if (
          (direction <= 5 && direction >= 0) ||
          (direction < 360 && direction >= 355)
        ) {
          that.position = '正北'
        } else if (direction < 85 && direction > 5) {
          that.position = '东北'
        }
      })
    }
  },
  onShow() {
    // 打开罗盘监听
    wx.startCompass()
  },
  onHide() {
    // 关闭罗盘监听
    wx.stopCompass()
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import '../../styles/mixin.scss';
.compass {
  .compass-entity {
    width: 280px;
    height: 280px;
    border: #3c3c45 1px solid;
    border-radius: 50%;
    margin: auto;
    margin-top: 100px;
    position: relative;
    .compass-pointer {
      position: absolute;
      top: 10px;
      left: 139px;
      width: 3px;
      height: 23px;
      background: $red;
      z-index: 2;
    }
    .compass-direction {
      position: absolute;
      top: 90px;
      left: 80px;
      width: 120px;
      text-align: center;
      .direction {
        color: $red;
        font-size: 50px;
      }
      .position {
        color: #fff;
        font-size: 18px;
      }
    }
    .compass-round {
      width: 0;
      height: 0;
      margin: auto;
      position: absolute;
      top: 140px;
      left: 140px;
      transform: rotate(0deg);
      animation-duration: 2s;
      animation-timing-function: ease;
      .round-item {
        position: absolute;
        width: 3px;
        height: 10px;
        background: #fff;
        transform-origin: 1px 0px;
        .round-text {
          color: #fff;
          font-size: 16px;
          position: relative;
          left: -7px;
          top: 20px;
        }
      }
    }
  }
}
</style>
