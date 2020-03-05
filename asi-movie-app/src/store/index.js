import Vue from 'vue'
import Vuex from 'vuex'
import {registerModule} from './registerStore/registerModule'
import {loginModule} from './loginStroe/loginModule'
import {indexModule} from './indexStore/indexModule'
import {citylistModule} from './citylistStore/citylistModule'
import {showModule} from './showStore/showModule'
import {willshowModule} from './willshowStore/willshowModule'
import {movietickModule} from './movietickStore/movietickModule'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    isreturnInit:true,
    //show的定位城市
    lccity:'',
    islocation:true,
   
    
  },
  mutations:{
    changIsReturnInit(state,val){
      state.isreturnInit=val
    },
    changlc(state,val){
      state.lccity=val
      
      
    },
    changIslocation(state,val){
      state.islocation=val
    }
  },
 
  modules: {
    //注册
    registerModule,
    //登录
    loginModule,
    //主页面
    indexModule,
    //城市列表
    citylistModule,
    //正在热映
    showModule,
    //即将上演
    willshowModule,
    //电影购票
    movietickModule
  }
})
