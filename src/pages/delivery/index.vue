<template>
  <div class="delivery">
    <form>
      <view class="delivery-label">
        <span class="label-title">快递单号：</span>
        <input class="label-value" v-model="form.logisticCode" type="number" name="input" confirm-type="search" auto-focus placeholder="请输入快递单号" />
        <span v-if="form.logisticCode.length > 0" class="label-icon" @click="form.logisticCode=''">
          <icon type="clear" size="15" />
        </span>
        <span v-else class="label-icon" @click="scanCode">
          <image class="label-icon-scan" :src="'/static/icons/scan.svg'" />
        </span>
      </view>
      <view class="delivery-label">
        <span class="label-title">快递公司：</span>
        <picker class="label-value" mode="selector" :value="value" :range="express" range-key="expressName" @change="bindPickerChange" placeholder="请选择快递公司">
          <view class="picker">
            {{ express[value].expressName }}
          </view>
        </picker>
      </view>
      <view class="delivery-submit">
        <button @click="kdniaoSubscribe">查 询</button>
      </view>
    </form>
  </div>

</template>

<script>
import { findExpressAll } from '@/api/index'
export default {
  data() {
    return {
      express: [
        {
          expressCode: '',
          expressName: '自动识别'
        }
      ],
      value: 0,
      form: {
        logisticCode: '',
        shipperCode: ''
      },
      traces: []
    }
  },
  mounted() {
    if (this.express.length === 1) {
      this.findExpressAll()
    }
  },
  methods: {
    // 扫码
    scanCode() {
      wx.scanCode({
        scanType: 'barCode',
        success: res => {
          this.form.logisticCode = res.result
        }
      })
    },
    // 改变快递公司
    bindPickerChange(e) {
      console.log(e)
      this.value = e.target.value
    },
    // 快递公司
    findExpressAll() {
      findExpressAll().then(res => {
        const data = res.data
        this.express = this.express.concat(data)
      })
    },
    // 查询
    kdniaoSubscribe() {
      if (this.form.logisticCode === '') {
        wx.showToast({
          title: '快递单号不能为空！',
          icon: 'none'
        })
        return false
      }
      this.form.shipperCode = this.express[this.value].expressCode
      const url = `../deliveryDetails/main?logisticCode=${
        this.form.logisticCode
      }&shipperCode=${this.form.shipperCode}`
      wx.navigateTo({ url })
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.delivery {
  padding: 20px;
  color: #fff;
  font-size: 16px;
  .delivery-label {
    display: flex;
    align-items: center;
    margin-top: 10px;
    .label-title {
      width: 95px;
    }
    .label-value {
      flex-grow: 1;
    }
    .label-icon {
      width: 20px;
      padding-top: 2px;
      height: 20px;
      .label-icon-scan{
        width: 20px;
        height: 20px;
      }
    }
  }
  .delivery-submit {
    margin-top: 20px;
  }
  .delivery-details {
    color: #fff;
  }
}
</style>
