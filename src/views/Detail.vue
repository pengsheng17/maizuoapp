<template>
  <v-touch @swiperight="handelswipright" v-if="filminfo" class="film">
    <span class="back iconfont icon-back" @click="handleBack"></span>
    <m-title v-title="40" @back="handleBack">
      {{ filminfo.name }}
    </m-title>
    <div class="lazyimg">
      <img :src="filminfo.poster" />
    </div>

    <div class="details">
      <h4>{{ filminfo.name }}{{ filminfo.filmType.name }}</h4>
      <p>{{ filminfo.premiereAt | moment }}上映</p>
      <div :class="isActive ? 'filmdetail' : ''">
        {{ filminfo.synopsis }}
      </div>
      <div class="icon">
        <span
          class="iconfont"
          :class="isActive ? 'icon-moreunfold' : 'icon-less'"
          @click="isActive = !isActive"
        ></span>
      </div>
    </div>
    <div class="actors">
      <div class="actors-title-bar">
        <span class="actors-title-text">演职人员</span>
      </div>
    </div>
    <div class="swiperactor">
      <swiper
        :data="{
          slidesPerView: 4,
          spaceBetween: 10,
          freeMode: true,
        }"
        kerwinclass="actor"
      >
        <div
          class="swiper-slide"
          v-for="(data, index) in filminfo.actors"
          :key="index"
        >
          <img :src="data.avatarAddress" />
        </div>
      </swiper>
    </div>
    <div class="actors">
      <div class="actors-title-bar juzhao">
        <span class="actors-title-text">剧照</span>
        <div class="smore">
          <span class="actors-title-text more">全部</span>
          <span
            class="actors-title-text more icon-more iconfont"
            @click="isPhotoShow = true"
          ></span>
        </div>
      </div>
    </div>
    <div class="swiperphoto">
      <swiper
        :data="{
          slidesPerView: 3,
          spaceBetween: 10,
          freeMode: true,
        }"
        kerwinclass="photo"
      >
        <div class="swiper-slide" v-for="data in filminfo.photos" :key="data">
          <img :src="data" />
        </div>
      </swiper>
    </div>
    <photo v-show="isPhotoShow" :list="filminfo.photos" @event="handlePreview($event)">
      <m-title @back="handlePhotoShow">
        剧照 ( {{ filminfo.photos.length }} )
      </m-title>
    </photo>
  </v-touch>
</template>
<script>
import http from '@/util/http'
import swiper from '@/components/Swiper'
import photo from './Detail/Photo'
import Vue from 'vue'
import { ImagePreview } from 'vant'
Vue.use(ImagePreview)
export default {
  data () {
    return {
      isPhotoShow: false,
      isActive: true,
      filminfo: null
    }
  },
  methods: {
    handleBack () {
      // this.$router.push("/det")
      this.$router.back() // 返回功能
    },
    handlePhotoShow () {
      this.isPhotoShow = false
    },
    handelswipright () {
      this.$router.back()
    },
    handlePreview (index) {
      ImagePreview({
        images: this.filminfo.photos,
        startPosition: index, // 从0
        closeable: true,
        closeIconPosition: 'top-left',
        onClose () {
          // do something
        }
      })
    }
  },
  components: {
    swiper,
    photo
  },
  mounted () {
    // this.$router //路由对象
    // this.$route 当前唯一匹配的路由对象
    this.$store.commit('hide')
    http
      .request({
        url: `/gateway?filmId=${this.$route.params.id}&k=726965`,
        headers: {
          'X-Host': 'mall.film-ticket.film.info'
        }
      })
      .then((res) => {
        this.filminfo = res.data.data.film
        console.log(this.filminfo)
      })
  },
  destroyed () {
    this.$store.commit('show')
  }
}
</script>
<style scoped lang="scss">
.film {
  background-color: rgb(242, 248, 248);
  position: relative;
  left: 0%;
  top: 0%;
}
.back{
  position: absolute;
  top: 2%;
  left:2%;
  background: #d1dbe9;
  display: inline-block;
  font-size: 30px;
  border-radius: 50%;
  text-align: center;
  line-height: 36px;
  z-index: 5;
}
.lazyimg {
  height: 13.125rem;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    position: absolute;
    top: -50%;
  }
}
.details {
  background: #fff;
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  box-sizing: border-box;
  .filmdetail {
    height: 3.8rem;
    overflow: hidden;
  }
  .icon {
    text-align: center;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 15px;
    box-sizing: border-box;
  }
}
.actors-title-bar {
  margin-top: 10px;
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  background-color: #fff;
  .actors-title-bar {
    width: 100%;
    .actors-title-text {
      font-size: 16px;
      text-align: left;
      color: #191a1b;
    }
  }
}
.swiperactor {
  padding-left: 15px;
  .swiper-slide {
    img {
      width: 100%;
    }
  }
}
.juzhao {
  display: flex;
  justify-content: space-between;
  .smore {
    display: flex;
    justify-content: center;
    .more {
      line-height: 13px;
      font-size: 13px;
      color: #797d82;
    }
  }
}
.swiperphoto {
  padding-left: 15px;

  overflow: hidden;
  .swiper-slide {
    img {
      width: 100%;
      height: 100px;
    }
  }
}
</style>
