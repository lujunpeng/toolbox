<template>
  <div class="toolbox-index">
    <div class="toolbox-list">
      <li class="toolbox-item button-active" v-for="(item, index) in functionList" :key="index" @click="navigator(item.path)">
        <image class="toolbox-item-icon" :src="'/static/icons/'+item.path+'.svg'" />
        <span>{{ item.name }}</span>
      </li>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
export default {
  data() {
    return {
      functionList: [
        { name: '水平仪', path: 'spirit' },
        { name: '镜子', path: 'mirror' },
        { name: '指南针', path: 'compass' },
        { name: '测量尺', path: 'rule' },
        { name: '快递查询', path: 'delivery' },
        { name: '文字识别', path: 'text' }
      ],
      motto: 'Hello World',
      userInfo: {}
    }
  },

  components: {
    card
  },

  methods: {
    navigator(path) {
      const url = `../${path}/main`
      wx.navigateTo({ url })
    }
  },

  created() {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
  },
  // 分享
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '工具箱大全',
      path: '/pages/index/main',
      success(res) {
        // 转发成功
      },
      fail(res) {
        // 转发失败
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.toolbox-index {
  padding: 15px;
  .toolbox-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    color: #fff;
    text-align: center;
    .toolbox-item {
      font-size: 14px;
      width: 170px;
      height: 170px;
      background: #36363e;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      margin-bottom: 7px;
      .toolbox-item-icon {
        width: 50px;
        height: 50px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
