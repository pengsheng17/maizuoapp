<template>
  <div>
    <div class="title">
      <div class="left" @click="togcity">{{cityName}}</div>
      <div>影院</div>
      <div class="right">
        <i class="iconfont icon-search" @click="handleChangePage"></i>
      </div>
    </div>
    <div class="select">
      <div
        @click="isAreaShow = !isAreaShow"
        :class="isAreaShow ? 'active' : ''"
        class="city"
      >
        <i>{{ current }}</i>
        <span
          class="iconfont"
          :class="isAreaShow ? 'icon-moreunfold' : 'icon-less'"
        ></span>
      </div>
      <div>App订票</div>
      <div>最近去过</div>
    </div>
    <div class="area" v-show="isAreaShow">
      <ul>
        <li
          v-for="data in arealist"
          :key="data"
          @click="handleArea(data)"
          :class="data === current ? 'active' : ''"
        >
          {{ data }}
        </li>
      </ul>
    </div>
    <div class="content">
      <ul>
        <cinema-item
          v-for="data in computedDatalist"
          :key="data.cinemaId"
          :data="data"
        >
        </cinema-item>
      </ul>
    </div>
  </div>
</template>
<script>
import cinemaItem from '@/views/Cinema/CinemaItem'
import { mapState, mapMutations } from 'vuex'
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)
export default {
  data () {
    return {
      current: '全城',
      isAreaShow: false
    }
  },
  components: {
    cinemaItem

  },
  methods: {
    handleArea (data) {
      this.current = data
      this.isAreaShow = false
    },
    handleChangePage () {
      this.$router.push('/cinema/search')
    },
    togcity () {
      this.$router.push('/city')
    },
    ...mapMutations('city', ['setCityName', 'setCityId'])
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
    if (this.cinemaList.length === 0) {
      this.$store.dispatch('cinema/getCinemaAction', this.cityId).then(res => {
        console.log('异步结束，已经存到vuex')
        Toast.clear()
      })
    } else {
      console.log('使用缓存')
      Toast.clear()
    }
  },
  computed: {
    arealist () {
      // 对象=>里面的某个属性
      const newarr = this.cinemaList.map(
        (item) => item.districtName
      )
      // 利用set结构进行数组去重，Array.from 把类数组结构转换成数组结构
      const arealist = ['全城', ...Array.from(new Set(newarr))]
      return arealist
    },
    computedDatalist () {
      if (this.current === '全城') return this.cinemaList
      return this.cinemaList.filter(
        (item) => item.districtName === this.current
      )
    },
    ...mapState('cinema', ['cinemaList']),
    ...mapState('city', ['cityName', 'cityId'])
  }
}
</script>

<style scoped lang="scss">
.active {
  border: 1px solid red !important;
}
.title {
  display: flex;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  background: white;
  z-index: 10;
  div {
    flex: 1;
    text-align: center;
  }
  .left {
    text-align: left;
  }
  .right {
    text-align: right;
  }
}

.select {
  display: flex;
  position: fixed;
  top: 40px;
  left: 0px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: white;
  z-index: 10;
  div {
    flex: 1;
    text-align: center;
  }
  .city {
    display: flex;
    justify-content: center;
  }
}
.content {
  position: relative;
  top: 80px;
  padding-bottom: 40px;
  ul {
    li {
      padding: 10px;
    }
  }
}

.area {
  position: fixed;
  top: 80px;
  left: 0px;
  width: 100%;
  background: white;
  z-index: 10;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 25%;
      padding: 5px;
      box-sizing: border-box;
      text-align: center;
      // border:1px solid gray;
    }
  }
}
</style>
