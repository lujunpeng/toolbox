<template>
  <div class="delivery-details">
    <div v-if="expressCompany.telephone" class="delivery-company">
      <img class="delivery-company-logo" :src="expressCompany.logo" alt="">
      <div class="delivery-info">
        <div @click="makePhoneCall(expressCompany.telephone)">电话：
          <span>{{ expressCompany.telephone }}</span>
        </div>
        <div @click="setClipboardData(expressCompany.officialWebsite)">官网：
          <span>{{ expressCompany.officialWebsite }}</span>
        </div>
      </div>
    </div>
    <ul v-if="state != 0" class="delivery-ul">
      <li class="delivery-li" v-for="(item, index) in traces" :key="index">
        <div class="delivery-li-date">
          <div>{{ item.time }}</div>
          <div>{{ item.date }}</div>
        </div>
        <div class="delivery-li-line">
          <span></span>
        </div>
        <div class="delivery-li-station">
          <div v-if="item.phone == ''">{{ item.AcceptStation }}</div>
          <div v-else>
            {{ item.AcceptStationFrist }}
            <span class="delivery-li-phone" @click="makePhoneCall(item.phone)">{{ item.phone }}</span>
            {{ item.AcceptStationLast }}
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="delivery-nodata">
      暂无物流信息！
    </div>
  </div>

</template>

<script>
import { kdniaoSubscribe, findExpressByExpressCode } from '@/api/index'
import { validatPhoneNumber } from '@/utils/validate'
export default {
  data() {
    return {
      state: 0,
      traces: [],
      expressCompany: {},
      options: {}
    }
  },
  onLoad: function(options) {
    // 生命周期函数--监听页面加载
    this.options = options
    this.kdniaoSubscribe(options)
    wx.showLoading({
      title: '加载中'
    })
  },
  mounted() {
    this.state = 0
    this.traces = []
    this.expressCompany = {}
    this.options = {}
  },
  methods: {
    // 快递查询
    kdniaoSubscribe(form) {
      kdniaoSubscribe(form).then(res => {
        const data = res.data
        if (!data.State) {
          wx.hideLoading()
          return false
        }
        const traces = data.Traces.reverse()
        this.traces = traces.map(item => {
          let phone = item.AcceptStation.replace(/[^0-9]/gi, '')
          let AcceptStationFrist = ''
          let AcceptStationLast = ''
          if (!validatPhoneNumber(phone)) {
            phone = ''
          } else {
            const index = item.AcceptStation.indexOf(phone)
            AcceptStationFrist = item.AcceptStation.substr(0, index)
            AcceptStationLast = item.AcceptStation.substr(index + 11)
          }
          return {
            AcceptStation: item.AcceptStation,
            AcceptStationFrist,
            AcceptStationLast,
            phone,
            date: item.AcceptTime.substr(0, 10),
            time: item.AcceptTime.substr(11, 5)
          }
        })
        this.state = data.State
        this.findExpressByExpressCode(data.ShipperCode)
      })
    },
    // 查询快递公司详情
    findExpressByExpressCode(ShipperCode) {
      findExpressByExpressCode(ShipperCode).then(res => {
        wx.hideLoading()
        const data = res.data
        this.expressCompany = data[0]
      })
    },
    // 打电话
    makePhoneCall(phoneNumber) {
      wx.makePhoneCall({
        phoneNumber
      })
    },
    // 复杂官网
    setClipboardData(data) {
      wx.setClipboardData({
        data,
        success: function(res) {}
      })
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.delivery-details {
  padding: 20px;
  color: #fff;
  font-size: 14px;
  .delivery-company {
    display: flex;
    height: 100px;
    .delivery-company-logo {
      height: 70px;
      width: 70px;
      border-radius: 50%;
      margin-right: 20px;
    }
    .delivery-info {
      margin-top: 10px;
      line-height: 25px;
      color: #9a9a9a;
      span {
        text-decoration: underline;
      }
    }
  }
  .delivery-nodata {
    font-size: 15px;
    text-align: center;
    margin-top: 50px;
  }
  .delivery-ul {
    .delivery-li {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 25px;
      padding-bottom: 20px;
      .delivery-li-date {
        width: 75px;
        text-align: right;
        div {
          font-size: 13px;
          &:first-child {
            font-size: 16px;
          }
        }
      }
      .delivery-li-station {
        width: 210px;
        .delivery-li-phone {
          text-decoration: underline;
        }
      }
      .delivery-li-line {
        border-left: #fff solid 1px;
        position: absolute;
        width: 0;
        top: 22px;
        left: 100px;
        bottom: -30px;
        span {
          position: absolute;
          left: -6px;
          top: 0;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: #fff;
        }
      }
      &:last-child {
        .delivery-li-line {
          bottom: 40px;
        }
      }
    }
  }
}
</style>

