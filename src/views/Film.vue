<template>
  <div class="film">
    <div class="headr">
    <i @click="togroute">{{cityName}}</i>
    <span class="iconfont icon-moreunfold"></span>
    </div>
    <swiper :key="looplist.length"
     :data="{loop:true,
     autoplay:true,
    }" kerwinclass="swiperfilm">
      <div class="swiper-slide" v-for="data in looplist" :key="data.bannerId">
        <img :src="data.imgUrl"/>
      </div>
    </swiper>
    <filmbar></filmbar>
    <!-- 路由容器 -->
    <router-view></router-view>
  </div>
</template>
<script>
import http from '@/util/http'
import swiper from '@/components/Swiper'
import filmbar from '@/components/FilmBar.vue'
import { mapState } from 'vuex'
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)
export default {
  data () {
    return {
      looplist: []
    }
  },
  components: {
    swiper, // 局部注册swiper组件
    filmbar
  },
  computed: {
    ...mapState('city', ['cityId', 'cityName'])

  },
  methods: {
    togroute () {
      this.$router.push('/city')
    }
  },
  beforeMount () {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      overlay: true, // 是否显示背景遮罩层
      duration: 0 // 不会消失
    })
  },
  mounted () {
    http.request({
      url: `/gateway?type=2&cityId=${this.cityId}&k=3529285`,
      headers: {
        'X-Host': 'mall.cfg.common-banner'
      }
    }).then(res => {
      this.looplist = res.data.data
      Toast.clear()
    })
  }
}
</script>
<style lang="scss" scoped>
   .headr{
     position: fixed;
     left: 1%;
     top: 1%;
     z-index: 10;
     display: flex;
     flex-direction: column;
     text-align: center;
     justify-content: center;
     align-content: center;
     }
  .swiper-slide{
    img{
      width: 100%;
    }
  }
  .film{
    background: #ccc;
  }
</style>
