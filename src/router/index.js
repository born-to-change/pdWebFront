import Vue from 'vue'
import Router from 'vue-router'

const Mine = resolve => require(['@/pages/mine/mine'], resolve)
const Home = resolve => require(['@/pages/main/Home'], resolve)
const index = resolve => require(['@/pages/main/index'], resolve)
const Project = resolve => require(['@/components/Test/Test'], resolve)
const RunLog = resolve => require(['@/pages/runLog/log'], resolve)
const Login = resolve => require(['@/pages/login/login'], resolve)
const Admin = resolve => require(['@/pages/admin/admin'], resolve)
const user = resolve => require(['@/components/item/userItem'], resolve)
const todoList = resolve => require(['@/pages/todo/todoList'], resolve)
const test = resolve => require(['@/components/map/index'], resolve)

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
        {path: 'project', name: 'todo', component: todoList, meta: {title: '工作日志'}},
        {path: 'runLog', name: 'runLog', component: test, meta: {title: '运行日志'}},
        {path: 'mine', name: 'mine', component: Project, meta: {title: '我的'}},
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {title: '登录页面'}
    },
    {
      path: '/admin',
      redirect: '/admin/user',
      component: Admin,
      children: [
        {path: 'user', name: 'userManage', component: user, meta: {requireAuth: true, title: '用户管理'}},
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
