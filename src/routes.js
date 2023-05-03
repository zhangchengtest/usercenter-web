import Login from './components/Login.vue'
import Wechat from './components/Wechat.vue'
import HelloWorld from './components/HelloWorld.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: Login
  },
  {
    path: '/sign-in',
    name: 'Login',
    component: Login
  },
  {
    path: '/wechat',
    name: 'Wechat',
    component: Wechat
  }
  ,
  {
    path: '/hello',
    name: 'HelloWorld',
    component: HelloWorld
  }
]
