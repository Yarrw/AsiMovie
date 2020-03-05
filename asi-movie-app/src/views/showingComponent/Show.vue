<template>
    <div class="show">
        
        <div class="show-box" ref="showbox" @scroll="scrollchang">
            <div class="item clearfix" v-for="(item,index) in moviedata.data.subjects" :key="index" ref="item" 
            :id='item.id'    @click="moviedetails({name:'moviedetails',params:{id:item.id}})">
                <div class="img-box">
                    <img :src="item.images.small" alt="" class="img-auto">
                </div>
                <div class="box clearfix">
                    <div class="title one-text">{{item.title}}</div>
                    <span class="pingfen">评分</span><span class="pin">{{item.rating.average}}</span>
                    <div class="casts one-text" >
                        主演:{{item.avatarsData}}
                    </div>
                    <div class="genres">
                    {{item.genresData}}
                    </div>
                </div>
                <div class="btn">
                    <van-button type="primary" size="small" round  :class="item.rating.average > 0 ? 'buycolor' : 'willcolor'" @click.stop="buy({name:'movietick',params:{id:item.id}})">{{item.rating.average>0 ? '购票' : '预售'}}</van-button>
                </div>
            </div>
        </div>
        
        
    </div>
</template>

<script>
    import $ from 'jquery'

    import {createNamespacedHelpers} from 'vuex'

    const {mapState,mapMutations} = createNamespacedHelpers('showModule');
export default {
    name:'show',
    data(){
        return{
             timerst:[],
             
        }
    },
    computed:{
        ...mapState(['moviedata','params','isHas','isInit']),
        isreturnInit(){
            return this.$store.state.isreturnInit
        },
       
    },
    methods:{
        
      


        getMovieData(){
           

        //请求数据
           
             setTimeout(() => {
                 if (!this.isHas) {
                this.$toast('没有数据了，( ˙-˙=͟͟͞͞)')
                return;
            } 
            this.$toast.loading({
            duration: 0,
            message: "加载中..."
            });

            //请求数据
            this.axios({
                //请求类型
                method: "GET",

                url: "https://douban.uieee.com/v2/movie/in_theaters",
                params:this.params
                
            })
            .then(result =>{
               /*  console.log('热映',result) */
                result.data.subjects.forEach(v => {
                    //处理电影类型数据
                    v.genresData=v.genres.join(",")
                    //处理演员数据
                    v.avatarsData = "";
                    v.casts.forEach(item => {
                    v.avatarsData += item.name + "/";
                    });
                    v.avatarsData = v.avatarsData.slice(0, -1);
                });
                    var self=this
                    var showbox=this.$refs.showbox
                    var timers=[]
                    
                        
                
                this.$store.commit('showModule/changData',result)
               
                this.$toast.clear();
            })
             }, 100);
        },
        moviedetails(o){
            
            this.$router.push(o)
        },
        buy(o){
            
           
           this.$router.push(o)
        },
        scrollchang(){
            
           
               //函数节流
                         
                            var self=this   
                            var showbox=this.$refs.showbox
                            let timert=setTimeout(() => {
                            for(var i =1 ; i<this.timerst.length ; i++){
                                clearTimeout(this.timerst[i]);
                            }
                                var lastitem=self.$refs.item[self.$refs.item.length-1]
                                //console.log('lastitem',lastitem)
                                //最后一个元素距离导航栏（父元素）的高度
                                var lastTop=lastitem.offsetTop
                             //console.log("lastTop",lastTop)
                                //滚动距离
                                var scrollTop=showbox.scrollTop
                             //console.log('滚动条',scrollTop)
                                //Show-box的高度
                                var showboxHeight=window.innerHeight - 24 - 46 -46 -50
                             //console.log('盒子的高度',showboxHeight)
                            //最后一个盒子的高度
                            var lastitemHeight=lastitem.scrollHeight
                            //console.log('最后一个盒子的高度',lastitemHeight)
                            
                                if(scrollTop+showboxHeight>=lastTop+lastitemHeight){
                                    
                                    /* self.$store.commit('changIsReturnInit',true) */
                                    self.getMovieData()

                                }
 
                                this.timerst=[]
                        }, 300);
                        this.timerst.push(timert)
               
               /*  this.$store.commit('changIsReturnInit',true)
                console.log('IsReturnInit',this.isreturnInit)
                 this.getMovieData()
                return */
            
        }
    },
    created(){
         if(!this.isreturnInit){
            return
        }
        
        this.getMovieData()
            
       
        
    }
}
</script>

<style lang="less" scoped>
.show{
    height: 100%;
}   .scrollbox{
    height: 10px;
}
    .show-box{
        position: fixed;
        top: 116px;
        left: 0;
        right: 0;
        bottom: 50px;

        overflow-y:auto; 
    }
    .item{
        width: calc(100% - 10px );
        padding: 5px 5px;
        margin-bottom: 5px; 
       
        .img-box{
            margin-top: 6px; 
            float: left;
            width: 65px;
            height: 90px;
            
            margin-right: 10px; 
        }
        .box{
            
            float: left;
            width: 200px;
            height: 90px;
            .title{
                font-size: 18px;
                font-weight: bold;  
                width: 100%;
                height: 24px;
                
                margin-bottom:8px; 
            }
            .pingfen,.pin,.genres{
                font-size: 14px 
            }
            .pin{
                font-weight:700;
                color:#E54847 ; 
            }
            .casts{
                padding: 5px 0;
                float: left;
                width: 100%;
                font-size: 14px
            }

        }
        .btn{
            display: block;
           float: left;
           margin : 30px 0 0 13px ;
           .buycolor{
               background:#4682B4;
               border: 1px solid #4682B4
           }
           .willcolor{
               background:#483D8B;
               border: 1px solid #483D8B
           }
        }
    }
</style>