<template>
  <div id="rule" class="rule">
    <div class="rule-conent">
      <div class="rule-pointer" :style="{height: height + 'px'}">
        <image class="rule-pointer-btn" src="/static/icons/rule_btn.svg" @touchstart="touchstart" @touchmove="touchmove" />
      </div>
      <div class="rule-cm-num">{{ cmNum }}</div>
      <div class="rule-in-num">{{ inNum }}</div>
      <div id="ruleCm" class="rule-cm">
        <div class="rule-cm-item" v-for="(item, index) in cmList" :key="index">
          <div class="rule-cm-val">{{ item.text }}</div>
        </div>
      </div>
      <div class="rule-in">
        <div class="rule-in-item" v-for="(item, index) in inList" :key="index">
          <div class="rule-in-val">{{ item.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      maxHeight: 0,
      height: 0,
      startPoint: [0, 0],
      movePoint: [0, 0],
      proportion: 0,
      cmNum: '0.00',
      inNum: '0.00'
    }
  },
  computed: {
    cmList: function() {
      const size = 201
      const cmList = []
      for (let index = 0; index < size; index++) {
        const item = {
          text: ''
        }
        if (!(index % 10) && index !== 0) {
          item.text = index / 10
        } else if (index === 0) {
          item.text = 'cm'
        }
        cmList.push(item)
      }
      return cmList
    },
    inList: function() {
      const size = 51
      const inList = []
      for (let index = 0; index < size; index++) {
        const item = {
          text: ''
        }
        if (!(index % 5) && index !== 0) {
          item.text = index / 5
        } else if (index === 0) {
          item.text = 'in'
        }
        inList.push(item)
      }
      return inList
    }
  },
  watch: {
    height: function(val) {
      const cmNum = (val / this.proportion / 10 - 0.04).toFixed(2)
      this.cmNum = cmNum < 0 ? '0.00' : cmNum
      this.inNum = (this.cmNum / 2.54).toFixed(2)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getProportion()
    })
  },
  methods: {
    // 获取尺寸比例
    getProportion() {
      const that = this
      wx
        .createSelectorQuery()
        .select('#ruleCm')
        .boundingClientRect(function(rect) {
          that.proportion = rect.height / that.cmList.length
        })
        .exec()
      wx
        .createSelectorQuery()
        .select('#rule')
        .boundingClientRect(function(rect) {
          console.log(rect)
          that.maxHeight = rect.height
        })
        .exec()
    },
    touchstart(el) {
      this.startPoint = [el.pageX, el.pageY]
    },
    touchmove(el) {
      const y = el.pageY - this.movePoint[1]
      if (y > 0 && this.height > this.maxHeight - 30) {
        return
      }
      this.movePoint = [el.pageX, el.pageY]
      this.height += y
      if (this.height < 0) {
        this.height = 0
        this.movePoint = [0, 0]
      }
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import '../../styles/mixin.scss';
.rule {
  height: 100%;
  overflow: hidden;
  .rule-conent {
    height: calc(100% - 15px);
    margin-top: 15px;
    border-top: $red 1px solid;
    position: relative;
    font-size: 15px;
    color: #fff;
  }
  .rule-pointer {
    border-bottom: $red 1px solid;
    position: absolute;
    top: -1px;
    width: 100%;
    z-index: 2;
    background: rgba($color: $red, $alpha: 0.3);
    .rule-pointer-btn {
      width: 30px;
      height: 30px;
      position: absolute;
      bottom: -15px;
      left: calc(50% - 15px);
      z-index: 3;
    }
  }
  .rule-cm-num,
  .rule-in-num {
    color: $red;
    position: absolute;
    top: 8px;
    transform: rotate(90deg);
  }
  .rule-cm-num {
    left: 2px;
  }
  .rule-in-num {
    right: 2px;
  }
  .rule-cm {
    position: absolute;
    left: 30px;
    top: -1px;
    display: flex;
    flex-direction: column;
    .rule-cm-item {
      height: 1mm;
      width: 10px;
      border-top: #84878c 1px solid;
      position: relative;
      &:nth-child(10n + 1) {
        width: 20px;
      }
      .rule-cm-val {
        width: 30px;
        text-align: center;
        transform: rotate(90deg);
        position: absolute;
        top: -2.7mm;
        left: 25px;
      }
    }
  }
  .rule-in {
    position: absolute;
    right: 30px;
    top: -1px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .rule-in-item {
      height: 0.2in;
      width: 10px;
      border-top: #84878c 1px solid;
      position: relative;
      &:nth-child(5n + 1) {
        width: 20px;
      }
      .rule-in-val {
        width: 30px;
        text-align: center;
        transform: rotate(90deg);
        position: absolute;
        top: -2.7mm;
        right: 25px;
      }
    }
  }
}
</style>
