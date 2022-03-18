<template>
  <div>
    center
  </div>
</template>
<script>
export default {
  // 路由的钩子函数
  beforeRouteEnter (to, from, next) {
    // ...
    // console.log("拦截")
    if (localStorage.getItem('token')) {
      next()
    } else {
      console.log('重定向到 login页面')
      next('/login')
    }
  },

  beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate', '/detail/1111-->/detail/222222')
  },

  beforeRouteLeave (to, from, next) {
    console.log('beforeRouteLeave')
    // ...
    next()
  }
}
</script>
