import Vue from 'vue'
import Router from 'vue-router'
import Live from '@/components/Live'
import Loading from '@/components/Loading'
import Introduce from '@/components/Introduce'
import Start from '@/components/Start'
import Lottery from '@/components/Lottery'
import ShareIn from '@/components/ShareIn'
import LotterySucceed from '@/components/LotterySucceed'
import LotteryFail from '@/components/LotteryFail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Loading
    },{
      path: '/Loading',
      component: Loading
    },{
      path: '/Live',
      component: Live
    },{
      path: '/Introduce',
      component: Introduce
    },{
      path: '/Start',
      component: Start
    },{
      path: '/Lottery',
      component: Lottery
    },{
      path: '/ShareIn',
      component: ShareIn
    },{
      path: '/LotterySucceed',
      component: LotterySucceed
    },{
      path: '/LotteryFail',
      component: LotteryFail
    }
  ]
})
