import Vue from 'vue'
import moment from 'moment'
Vue.filter('actorFilter', function (data) {
  return data.map(item => {
    return item.name
  }).join('')
})
Vue.filter('moment', function (data) {
  return moment(data * 1000).format('YYYY-MM-DD')
})
