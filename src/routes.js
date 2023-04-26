import Login from './components/Login.vue'
import Wechat from './components/Wechat.vue'

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
]
