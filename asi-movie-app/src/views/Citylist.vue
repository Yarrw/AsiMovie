<template>
    <div class="citylist">
      <div class="location">
            <div class="lctitle">定位城市</div>
            <div class="lccon clearfix">
              <div class="lc" @click="fn(lccity)">{{lccity}}</div>
            </div>
      </div>
      <div class="location">
            <div class="lctitle">热门城市</div>
            <div class="lcconlist clearfix" >
              <div class="lc" v-for="(item,index) in hotcity" :key="index" @click="fn(item)">{{item}}</div>
             

            </div>
      </div>
        <van-index-bar  class="bg" highlight-color='#87CEEB' >
          




            <van-index-anchor   index='A' />
            <van-cell v-for="(item,index) in citys.A" :key='index'   :title="item.name"  @click="fn(item.name)"/>
            <van-index-anchor   index='B' />
            <van-cell v-for="(item,index) in citys.B" :key='index'   :title="item.name" @click="fn(item.name)"/>
            <van-index-anchor   index='C' />
            <van-cell v-for="(item,index) in citys.C" :key='index'   :title="item.name" @click="fn(item.name)"/>
            <van-index-anchor   index='D' />
            <van-cell v-for="(item,index) in citys.D" :key='index'   :title="item.name" @click="fn(item.name)"/>
            <van-index-anchor   index='E' />
            <van-cell v-for="(item,index) in citys.E" :key='index'   :title="item.name" @click="fn(item.name)"/>
            <van-index-anchor   index='F' />
            <van-cell v-for="(item,index) in citys.F" :key='index'   :title="item.name" @click="fn(item.name)"/>
            <van-index-anchor   index='G' />
            <van-cell v-for="(item,index) in citys.G" :key='index'   :title="item.name" @click="fn(item.name)"/>
            <van-index-anchor   index='H' />
            <van-cell v-for="(item,index) in citys.H" :key='index'   :title="item.name" @click="fn(item.name)"/>
            <van-index-anchor   index='I' />
            <van-cell v-for="(item,index) in citys.I" :key='index'   :title="item.name" @click="fn(item.name)"/>
            <van-index-anchor   index='J' />
            <van-cell v-for="(item,index) in citys.J" :key='index'   :title="item.name" @click="fn(item.name)"/>
            <van-index-anchor   index='K' />
            <van-cell v-for="(item,index) in citys.K" :key='index'   :title="item.name" @click="fn(item.name)"/>
            <van-index-anchor   index='L' />
            <van-cell v-for="(item,index) in citys.L" :key='index'   :title="item.name" @click="fn(item.name)"/>
            <van-index-anchor   index='M' />
            <van-cell v-for="(item,index) in citys.M" :key='index'   :title="item.name" @click="fn(item.name)"/>
            <van-index-anchor   index='N' />
            <van-cell v-for="(item,index) in citys.N" :key='index'   :title="item.name" @click="fn(item.name)"/>
            <van-index-anchor   index='O' />
            <van-cell v-for="(item,index) in citys.O" :key='index'   :title="item.name" @click="fn(item.name)"/>
            <van-index-anchor   index='P' />
            <van-cell v-for="(item,index) in citys.P" :key='index'   :title="item.name" @click="fn(item.name)"/>
            <van-index-anchor   index='Q' />
            <van-cell v-for="(item,index) in citys.Q" :key='index'   :title="item.name" @click="fn(item.name)"/>
            <van-index-anchor   index='R' />
            <van-cell v-for="(item,index) in citys.R" :key='index'   :title="item.name" @click="fn(item.name)"/>
            <van-index-anchor   index='S' />
            <van-cell v-for="(item,index) in citys.S" :key='index'   :title="item.name" @click="fn(item.name)"/>
            <van-index-anchor   index='T' />
            <van-cell v-for="(item,index) in citys.T" :key='index'   :title="item.name" @click="fn(item.name)"/>
            <van-index-anchor   index='U' />
            <van-cell v-for="(item,index) in citys.U" :key='index'   :title="item.name" @click="fn(item.name)"/>
            <van-index-anchor   index='V' />
            <van-cell v-for="(item,index) in citys.V" :key='index'   :title="item.name" @click="fn(item.name)"/>
              <van-index-anchor   index='W' />
            <van-cell v-for="(item,index) in citys.W" :key='index'   :title="item.name" @click="fn(item.name)"/>
              <van-index-anchor   index='X' />
            <van-cell v-for="(item,index) in citys.X" :key='index'   :title="item.name" @click="fn(item.name)"/>
              <van-index-anchor   index='Y' />
            <van-cell v-for="(item,index) in citys.Y" :key='index'   :title="item.name" @click="fn(item.name)"/>
              <van-index-anchor   index='Z' />
            <van-cell v-for="(item,index) in citys.Z" :key='index'   :title="item.name" @click="fn(item.name)"/>

        </van-index-bar>
       
            

            
       
        

       
        
       
    </div>
</template>
<style lang="less" scoped>
.location{
  width: 100%;
 
  .lctitle{
    padding: 0 15px;
    height: 31px;
    font-weight:500;
    font-size:16px;  
    background: #F7F8FA;
  }
  .lccon,.lcconlist{
    background: #f5f5f5;
    padding: 15px;
  .lcconlist{
    padding: 0 0
  }
  }.lc{
    width: 85px;
    height: 30px;
    background: #ffffff;
    font-size: 14px; 
    text-align: center;
    line-height: 30px;
    float: left;
    margin: 5px 15px ;
    
    
    
  }
}

</style>

<script>
import {createNamespacedHelpers} from 'vuex'
import $ from 'jquery'

 

const {mapState} = createNamespacedHelpers('citylistModule');
const {mapMutations} = createNamespacedHelpers('showModule');
export default {
    name:'citylist',
    data(){
      return{
        hotcity:['上海','北京','广州',
                 '深圳','武汉','天津',
                 '西安','南京','杭州',
                 '成都','重庆','中山',],
        lccity:''
      }
    },
    computed:{
        ...mapState(['citys','q']),
         
    },
    methods:{
        city(q){
            
        },
        fn(a){
           
           this.$store.commit('showModule/changcity',a)
           this.$router.push({name:'show'})
           this.$store.commit('changlc',a)
        }
    },
    created(){
            var self=this
       $.ajax({
                type:'GET',
                url:'https://apis.map.qq.com/ws/location/v1/ip',
                data:{
                    key	:'XEZBZ-ZULC6-AOIS2-EMNXC-OYKV6-47BOJ',
                    output:'jsonp'
                } ,
                dataType:'jsonp',
                success:function(data){
                    var city=data.result.ad_info.city.slice(0,-1)
                    self.lccity=city
                   
                }

            })
    }
}
</script>

<style lang="less" scoped>
    .bg{
        background: #F7F8FA;
        
    }
</style>