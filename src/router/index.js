import Vue from 'vue'
import Router from 'vue-router'
import VueAMap from 'vue-amap'

const Home = resolve => require(['@/pages/main/Home'], resolve)
const index = resolve => require(['@/pages/main/index'], resolve)
const MapIndex = resolve => require(['@/components/map/map'], resolve)
const test = resolve => require(['@/components/map/line'], resolve)

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '7aee2579a0658fc44426b6d31397bb37',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch','Geocoder','AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
})
Vue.use(Router)
const router =  new Router({
  mode: 'history',
  routes: [
    {

      path: '/',
      redirect: 'home',
      component: index,
      children: [
        {path: 'home', name: 'Home', component: Home, meta: {title: '行人检测首页'}},
        {path: 'map', name: 'mine', component: MapIndex, meta: {title: '地图'}},
        {path: 'test', name: 'test', component: test, meta: {title: '地图'}},
      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   document.title = to.meta.title
//   if (Store.state.user.token && to.name === 'login') {
//     next({name: 'posts'})
//   } else if (!Store.state.user.token && to.meta.requireAuth) {
//     next({name: 'login'})
//   } else {
//     next()
//   }
// })

export default router
