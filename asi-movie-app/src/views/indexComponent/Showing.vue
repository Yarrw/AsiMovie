<template>
    <div class="showing">
       
        <div class="navbar">
            <span>AsiMovie</span>
        </div>
        <div class="top">
            <div class="location" @click="location">
                <span class="fl">{{city}}</span>
                <i></i>
            </div>
            <div class="tabs">
                <van-tabs v-model="activeName" color='#1E90FF' >           
                    <van-tab title="正在热映" name="show" :to="{name:'show'}" ></van-tab>
                    <van-tab title="即将上演" name="willshow" :to="{name:'willshow'}" ></van-tab>         
                </van-tabs>
            </div>
            <div class="seach">

            </div>
        </div>
        
        <keep-alive>
        <!-- 三级路由 -->
        <router-view></router-view>
        </keep-alive>

    </div>
</template>

<script>
import $ from 'jquery'

export default {
    name:'showing',
    data(){
        return{
            activeName:'show',
            
        }
    },
    computed:{
        city(){
            return this.$store.state.lccity
        },
        islocation(){
            return this.$store.state.islocation
        }
    },
    created(){
        
        this.activeName=this.$route.name
        var self=this
        if(!this.islocation){
            return
        }
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
                    
                    self.$store.commit('changlc',city)
                    self.$store.commit('showModule/changcity',city)
                    self.$store.commit('changIslocation',false)
                }

            })
       
    },
    methods:{
        location(){
            this.$router.push({name:'citylist'})
        }
       
    },
}
</script>

<style lang="less" scoped>
     .showing{
         /* overflow-x: hidden; */
        .navbar{
           width: 375px;
            height: 46px;
            background: white;
            color: #4682B4;
            text-align: center;
            line-height: 46px;
            font-size:16px ;
            position: sticky;
            top: 24px;
            left: 0;
            right: 0;
            bottom: 0;
        }
        .top{
            width: 375px;
            height: 46px;
            position: sticky;
            top: 70px;
            padding: 0 !important;
            .location{
                margin-top:12.5px ;
                font-size:16px ;
                float: left;
                margin-left:5px; 
               i{
                   display: block;
                   width: 20px;
                   height: 20px;
                   background: url(../../icons/xiabiao.png) no-repeat center center;
                   background-size: 20px 20px;
                   background-position: 0 0 ;
                   float: left;
                   margin-left:5px 
               }
            }
            .tabs{
                width: calc(100% - 30px - 67px );
                height: 46px;
                float: left;
            }
            .seach{
                width: 30px;
                height: 30px;
                float: left;
                background:url(../../icons/seach.png) no-repeat center center;
                background-size: 25px 25px; 
                margin-top: 8px;
                margin-right:5px 
                
            }
        }
    }
</style>