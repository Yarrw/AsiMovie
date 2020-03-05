import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'lib-flexible/flexible'





import { Button,Field,Toast, Tabbar, TabbarItem,NavBar , Tab, Tabs , IndexBar, IndexAnchor,cell,Row,Col,Icon ,SubmitBar}  from 'vant'

Vue.use(VueAxios, axios)

Vue
  .use(Button)
  .use(Field )
  .use(Toast )
  .use(Tabbar)
  .use(TabbarItem)
  .use(NavBar )
  .use( Tab)
  .use( Tabs )
  .use( IndexBar)
  .use(IndexAnchor)
  .use(cell)
  .use(Row)
  .use(Col)
  .use(Icon )
  .use(SubmitBar )


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
