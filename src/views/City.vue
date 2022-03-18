<template>
  <v-touch @swiperight="handelswipright">
  <van-index-bar :index-list="indexList">
    <div v-for="(data,index) in datalist" :key="index">
      <van-index-anchor>{{data.idx}}</van-index-anchor>
      <van-cell :title="item.name" v-for="(item,index) in data.indexdata" :key="index" @click="handleClick(item)"/>
    </div>
  </van-index-bar>
  </v-touch>
</template>
<script>
import Vue from 'vue'
import { mapMutations } from 'vuex'
import { IndexBar, IndexAnchor } from 'vant'
import http from '@/util/http'
Vue.use(IndexBar)
Vue.use(IndexAnchor)

export default {
  data () {
    return {
      indexList: [], // 右边标识
      datalist: []// 城市名，每一个的标识头
    }
  },
  components: {
    IndexBar,
    IndexAnchor
  },
  mounted () {
    http.request({
      url: '/gateway?k=1279013',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    })
      .then((res) => {
        this.dataFilter(res.data.data.cities)
        console.log(res.data.data.cities)
      })
  },
  methods: {
    handelswipright () {
      this.$router.back()
    },
    dataFilter (cities) {
      const letterArr = []
      for (let i = 65; i < 91; i++) {
        letterArr.push(String.fromCharCode(i))
      }
      const cityArr = []
      for (let j = 0; j < letterArr.length; j++) {
        const temparr = cities.filter(item => item.pinyin.substring(0, 1).toUpperCase() === letterArr[j])
        temparr.length && cityArr.push({
          idx: letterArr[j],
          indexdata: temparr
        })
        temparr.length && this.indexList.push(letterArr[j])
      }
      this.datalist = cityArr
      console.log(cityArr)
      console.log(letterArr)
    },
    handleClick (item) {
      this.setCityName(item.name)
      this.setCityId(item.cityId)
      this.setCinemaList([])
      this.$router.back()
    },
    ...mapMutations('cinema', ['setCinemaList']),
    ...mapMutations('city', ['setCityName', 'setCityId'])
  }
}
</script>
