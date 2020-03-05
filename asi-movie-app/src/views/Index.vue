<template>
    <div class="index">
        
       


    
      <!-- 二级路由 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    
        


        <van-tabbar v-model="active" active-color='#4682B4' >
            <van-tabbar-item  v-for="(item,index) in data" :key="index" :icon="item.icon" :name="item.name" :to="({name:item.name})">{{item.title}}</van-tabbar-item>
        </van-tabbar>
        
    </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'

const {mapState, mapMutations} = createNamespacedHelpers('indexModule');
export default {
    name:'index',
    data(){
        return{
            active:'show'
        }
    },
    computed:{
        ...mapState(['data'])
    },
    created(){
        this.active=this.$route.name
    }

}
</script>

<style lang="less" scoped>
    
   
</style>