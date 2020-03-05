<template>
    <div class="willshow">

        <div class="big-box" ref='bigbox'> 
            <div class="expect-box">            
                <div class="title">近期最受期待</div>
                <div class="box">
                    <ul class="clearfix">
                        <li v-for="(item,index) in willdata.data.subjects" :key="index" :id='item.id' @click="moviedetails({name:'moviedetails',params:{id:item.id}})">
                            <div class="img-box">
                                <img :src="item.images.medium" alt="" class="img-auto">
                            </div>
                            <div class="name one-text">
                                {{item.title}}
                            </div>
                            <div class="pubdates">
                                {{item.pubdatesMoth}}月{{item.pubdatesDay}}日上映
                            </div>
                        </li>
                        
                    </ul>
                </div>
            </div>

            <div class="will-box" v-for="(item,index) in moviedata" :key="index" >

                <div class="will-item">
                    <div class="will-title">
                        {{index|moth}}月{{index|day}}日
                    </div>
                    <div class="will" v-for="(value,i) in item" :key="i" ref='item' @click="moviedetails({name:'moviedetails',params:{id:value.id}})">
                        <div class="img-box1">
                            <img :src="value.images.small" alt="" class="img-auto">
                        </div>
                        <div class="kong">

                        </div>
                        <div class="will-name">
                            {{value.title}}
                        </div>
                        <div class="will-avatar">
                            主演:{{value.avatarsData}}
                        </div>
                        <div class="will-genres">
                            {{value.genresData}}
                        </div>
                        <div class="btn">
                            <van-button type="primary" size="small" round class="color" >预售</van-button>
                        </div>
                    </div>
                   
                </div>

                
            </div>
        </div>
        
       
    </div>
</template>

<script>
import $ from 'jquery'

import {createNamespacedHelpers} from 'vuex'
const {mapState,mapMutations} = createNamespacedHelpers('willshowModule');
export default {
    name:'willshow',
    data(){
        return{
            willdata:{
                data:{
                    subjects:{}
                }
            },
            alldata:{
               
            },
           
                
        }
    },
    computed:{
        ...mapState(['params','moviedata','params1','isHas'])
    },
    methods:{
       getData(){





            //请求数据
            this.axios({
            method:'GET',
            url:'https://douban.uieee.com/v2/movie/coming_soon',
            params:this.params1
        })
        .then(result =>{
        //整理数据
            //上映时间
            result.data.subjects.forEach(v => {
                v.pubdatesDate=v.pubdates.join(',')
                if(v.pubdates.length>1){
                    v.pubdatesDate=v.pubdatesDate.split(',')[1]
                }else{
                    v.pubdatesDate=v.pubdatesDate.split(',')[0]
                }
                //月
                v.pubdatesMoth=v.pubdatesDate.slice(5,7)
                //日
                v.pubdatesDay=v.pubdatesDate.slice(8,10)
            })
            //近期期待数据
            this.willdata.data.subjects=result.data.subjects
          
        })

        
        this.axios({
        method:'GET',
        url:'https://douban.uieee.com/v2/movie/coming_soon',
        params:this.params
        })
        .then(result =>{

        var o={}
        //整理数据
            //上映时间
            result.data.subjects.forEach(v => {
                v.pubdatesDate=v.pubdates.join(',')
                if(v.pubdates.length>1){
                    v.pubdatesDate=v.pubdatesDate.split(',')[1]
                }else{
                    v.pubdatesDate=v.pubdatesDate.split(',')[0]
                }
                //月
                v.pubdatesMoth=v.pubdatesDate.slice(5,7)
                //日
                v.pubdatesDay=v.mainland_pubdate.slice(8,10)

                this.alldata[v.mainland_pubdate]=v.mainland_pubdate
                
                var arr=[]
                
                for (let i=0;i<result.data.subjects.length;i++) {
                   
                    if(result.data.subjects[i].mainland_pubdate==this.alldata[v.mainland_pubdate]){
                        arr.push(result.data.subjects[i])                   
                        o[v.mainland_pubdate]=arr
                        
                    }
                  
                }
                //电影类型
                v.genresData=v.genres.join(",")
                //处理演员数据
                v.avatarsData = "";
                v.casts.forEach(item => {
                v.avatarsData += item.name + "/";
                });
                v.avatarsData = v.avatarsData.slice(0, -1);
            });
                var bigbox=this.$refs.bigbox
                
                var timers=[]
                var self=this
                bigbox.onscroll=function(){
                    //函数节流
                    let timer=setTimeout(() => {
                        for (let i = 1; i < timers.length; i++) {
                           clearTimeout(timers[i])
                            //最后一个元素
                            var lastitem=self.$refs.item[self.$refs.item.length-1]
                            //最后一个元素距离导航栏的高
                            var lastitemTop=lastitem.offsetTop
                           /*  console.log('最后一个元素距离导航栏的高',lastitemTop) */
                            //盒子高度
                            var bigboxHeight=window.innerHeight-24-46-46-50
                            /* console.log('盒子高度',bigboxHeight) */
                            //滚动距离
                            var scrollTop=this.scrollTop
                            /* console.log('滚动距离',scrollTop) */
                            //最后一个元素的高度
                            var lastitemHeight=lastitem.offsetHeight
                            /* console.log('最后一个元素的高度',lastitemHeight) */
                            if(bigboxHeight+scrollTop>=lastitemTop+lastitemHeight){
                                if (self.isHas) {
                                    self.$toast.clear();
                                    self.$toast('没有数据了，( ˙-˙=͟͟͞͞)')
                                    return;
                                } 
                               
                                
                                self.$toast.loading({
                                duration: 0,
                                message: "加载中..."
                                });
                                self.getData()
                                
                                
                                
                            }



                            //清楚数组
                            timers=[]
                        }
                    }, 300);
                    timers.push(timer)
                    
                }

            //将电影按上映时间排序的数据
            this.$store.commit('willshowModule/updata',o)
           
            this.$toast.clear();
            
        })

       
        
        
         
        },
        moviedetails(o){
            this.$router.push(o)
        },
       
      
    },
    filters:{
        moth(v){
           return v.slice(5,7)
        },
        day(v){
            return v.slice(8,10)
        },
    },
    created(){
        this.getData()
    }
}
</script>

<style lang="less" scoped>
    .willshow{
        .big-box{
            position: fixed;
            top:116px;
            left: 0;
            right: 0;
            bottom: 50px;
            overflow-y:auto; 
        }
        .expect-box{
            padding: 10px;
            
            .title{
                font-size: 18px;
                color: #4682B4;
                font-weight: 700;
                margin-bottom: 10px
            }
            .box{
                width: 100%;
                overflow-x: auto; 

            }
            ul{
                width: 900px;
                
                li{
                    width: 120px;
                    float: left;
                    margin-right: 10px; 
                }
                li:last-child{
                    margin-right:0
                }
                
            }
            
            .img-box{
                border-radius: 10px; 
                width: 120px;
                height: 150px;
                background: #000;
                overflow: hidden;
                box-shadow: 2px 1px 1px rgba(0, 0, 0, .5)

            }
            .name{
                margin-top: 10px; 
                width: 100%;
                font-size:16px
            }
        }
        .will-box{
            padding: 10px;
          
            .will-title{
                font-size:20px;
                font-weight: 700;
                color: #1E90FF;
                margin-bottom: 35px; 

            }
            .will{
                height: 120px;
                background: rgba(245, 245, 220, 0.9);
                position: relative;
                border-radius: 10px;
                padding: 10px; 
                margin-bottom: 25px; 
                .img-box1{
                    
                    width: 95px;
                    
                    background: #000;
                    position: absolute;
                    top: -10px;
                    box-shadow: 2px 1px 1px rgba(0, 0, 0, .5)
                }
                .kong{
                    width: 95px;
                    height: 90px;
                    float: left;
                }
                .will-name{
                    width: calc(100% - 110px);
                    float: left;
                    font-size: 16px; 
                    margin-left: 10px 
                }
                .will-avatar{
                    width: calc(100% - 110px);
                    margin-top: 15px;
                     font-size: 14px; 
                    margin-left: 10px ;
                    float: left;
                }
                .will-genres{
                    width: calc(100% - 110px);
                    margin-top: 15px;
                    margin-left: 10px ;
                    float: left;
                }
                .btn{
                    float: right;
                    .color{
                        background:#483D8B;
                        border: 1px solid #483D8B
                    }
                }
            }
        }

    }
</style>