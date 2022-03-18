<template>
  <v-touch @swiperight="handelswipright" class="searchs" :style="{height:scrollHeight}">
    <van-search
    v-model="mytext"
    placeholder="请输入搜索关键词"
    show-action
    @cancel="onCancel"
  />
  <van-list v-show="!mytext">
        <van-cell v-for="(data, index) in topDatalist" :key="index" :title="data.name" />
    </van-list>
    <div v-show="mytext">
        <ul v-if="searchDataList.length">
            <cinema-item v-for="data in searchDataList" :key="data.cinemaId" :data="data"></cinema-item>
        </ul>
        <div v-else>没有找到匹配的影院</div>
    </div>
  </v-touch>
</template>
<script>
import Vue from 'vue'
import { Search, Cell, List } from 'vant'
import CinemaItem from './Cinema/CinemaItem.vue'
import { mapState, mapActions } from 'vuex'
Vue.use(List).use(Cell).use(Search)
export default {
  data () {
    return {
      mytext: '',
      scrollHeight: ''
    }
  },
  components: {
    Search,
    CinemaItem,
    Cell,
    List
  },
  methods: {
    onCancel () {
      this.$router.back()
    },
    handelswipright () {
      this.$router.back()
      console.log(111)
    },
    ...mapActions('cinema', ['getCinemaAction'])
  },
  computed: {
    topDatalist () {
      return this.cinemaList.slice(0, 5)
    },
    searchDataList () {
      return this.cinemaList.filter(
        (item) =>
          item.name.includes(this.mytext) ||
          item.name.toUpperCase().includes(this.mytext) ||
          item.name.toLowerCase().includes(this.mytext)
      )
    },
    ...mapState('cinema', ['cinemaList']),
    ...mapState('city', ['cityId'])
  },
  mounted () {
    this.$store.commit('hide')
    if (this.cinemaList.length === 0) {
      this.getCinemaAction(this.cityId)
      console.log(this.cinemaList.length)
    } else {
      console.log('shiyonghuancun')
      console.log(this.cinemaList.length)
    }
    this.scrollHeight = document.documentElement.clientHeight + 'px'
  },
  destroyed () {
    this.$store.commit('show')
  }
}
</script>
<style scoped>
html,
body
{
  height: 100%;
}
.searchs{
  height: 100%;
}
</style>
