<template>
    <div class="movietick">
       <div class="nav">
           <span >Asimovie</span> 
           <i class="balck fl" @click="goblack"></i>
           </div> 

        <div class="top">
            <div class="title">{{moviedata.title}}</div>
            <div class="time">12月25日00:00-01:54</div>
        </div>
        <div class="middle clearfix">
            
            <div class="yizi">可选</div>
            <div class="yizi_act">已选</div>
            <div class="yizi_choose">已售</div>
        </div>
        <div class="screenbox">
            <div class="screen">
                <div class="mask"></div>
            </div>
        </div>
        <div class="seatbox">
            <ul class="clearfix">
                <li v-for="(item,index) in data" :key="index" @click="buy(item)">
                    <i :class="{act:item.act}"></i>
                </li>
               
            </ul>
        </div>
        <div class="tickbox">
            <div class="tick clearfix">
                <div class="tick-item" v-for="(item,index) in ticks" :key="index">
                    <div class="mk"></div>
                    {{item.name}}
                </div>
               
            </div>
        </div>

        <div class="bottom clearfix">
            <div class="sum">
                合计:00.00
            </div>
            <div class="btn">
                <van-button round type="info" @click="fn(moviedata)">确认购票</van-button>
            </div>
        </div>
    </div>
</template>

<script>
 import {createNamespacedHelpers} from 'vuex'

  //基于registerModule的命名空间导入mapState、mapMutations 辅助函数

const {mapState, mapMutations} = createNamespacedHelpers('movietickModule');
export default {
    name:'movietick',
    data(){
        return{
            ticks:[],
            moviedata:[]
        }
    },
    computed:{
        ...mapState(['data'])
    },
    methods:{
        goblack(){
            this.$router.go(-1)
        },
        fn(item){
            
            var nowuser=localStorage.getItem('Nowuser')
                nowuser=JSON.parse(nowuser)
                //所用用户
             var buyMovieData=localStorage.getItem('buyMovieData')
                buyMovieData = buyMovieData ? JSON.parse(buyMovieData) : {}
                //当前用户
                if(!buyMovieData[nowuser.username]){
                buyMovieData[nowuser.username]=[]
                }
                //推数据
                var o={}
                o.data=item
                o.tick=this.ticks
                 buyMovieData[nowuser.username].unshift(o)

                 localStorage.setItem('buyMovieData',JSON.stringify(buyMovieData))
            
           



            this.ticks=[]
            this.$toast('购票成功')
        },
        buy(item){
            
             if(item.act){
               for(var i=0;i<this.ticks.length;i++){
                   if(item.name==this.ticks[i].id){
                       this.ticks.splice(i,1)   
                   }
               }
           }else{
                var o={}
                var row=item.name.slice(0,1)
                var columm=item.name.slice(1,3)
                var tick=row+'排'+columm+'座'
                o.name=tick
                o.id=item.name
                if(this.ticks.length==4){
                    this.$toast('一次最多只能购买4张票')
                    return
                }
                this.ticks.push(o)
           }
           
           
           
           /* console.log(item) */
            //激活座位
            item.act=!item.act 

           
           
        }
    },
    created(){
         let id=this.$route.params.id
        
        this.axios({
            //请求类型
            method: "GET",

            url: "https://douban.uieee.com/v2/movie/subject/"+id,
        })
        .then(data =>{
            
            this.moviedata=data.data
            

        })
    }
}
</script>

<style lang="less">
    .nav{
        height: 46px;
        color: #4682B4;
        text-align: center;
        line-height: 46px;
        font-size:16px ;
        .balck{
            display:block;
            width: 30px;
            height: 30px;
             background:url(../icons/houtui.png) no-repeat center center;
             background-size: 20px 20px;
             margin-top:8px;

        }
    }
    .top{
        padding: 0 15px;
        .title{
            
            font-size: 18px;
            font-weight: 600; 

           
        }
    }
    .middle{
        margin-top: 10px; 
        padding: 0 84px;
        .yizi,.yizi_act,.yizi_choose{
            height: 20px;
            line-height: 20px;
            float: left;
            font-size: 14px;
            text-indent: 20px;
            margin: 0 10px 
        }
        .yizi{
            background: url(../icons/yizi.png) no-repeat center center; 
            background-position: 0px 0px; 
            background-size: 20px 20px; 
        }
        .yizi_act{
            background: url(../icons/yizi_act.png) no-repeat center center; 
            background-position: 0px 0px; 
            background-size: 20px 20px; 
        }
        .yizi_choose{
            background: url(../icons/yizi_chose.png) no-repeat center center; 
            background-position: 0px 0px; 
            background-size: 20px 20px; 
        }
    }
    .screenbox{
        padding: 0 15px;
        margin-top: 20px; 
        position: relative;
        .screen{
            
            border-radius: 50%; 
            height: 75px;
            border: 4px solid #4682B4;
            .mask{
                position: absolute ;
                top:26px;
                left: 15px;
                width: 345px;
                height: 58px;
                background: white
            }
        }
    }
    .seatbox{
        margin-top:2px; 
       
        padding: 0 10px;
        ul{
            padding: 0 14px
        }
        li{
            float: left;
            margin-right: 5px;
            margin-bottom:5px; 
            i{
                display: block;
                width: 25px;
                height: 25px;
                background:url(../icons/yizi.png) no-repeat center center;
                background-size:25px 25px; 
            }
        }
        li:nth-child(5n){
            margin-right:35px 
        }
        li:nth-child(10n){
             margin-right:0px 
        }
    }
    .tickbox{
    
        padding: 0 15px;
        margin: 15px 0; 
       
        .tick{
           
            .tick-item{
                width:65px;
                height: 35px;
                background: #4682B4;
                position: relative;
                color: white;
                text-align: center;
                line-height: 35px;
                font-size:14px;
                float: left;
                margin: 0 10px; 
            }
            .mk{
                position: absolute;
                width: 10px;
                height: 10px;
                border-radius:50%;
                background: white;
                top: 10px;
                left: -5px; 
            }
        }
    }
    .act{
        background:url(../icons/yizi_act.png) no-repeat center center !important;
        background-size:25px 25px !important; 
    }
    .choose{
        background:url(../icons/yizi_chose.png) no-repeat center center !important;
        background-size:25px 25px !important; 
    }
    .bottom{
        position: fixed;
        top:617px;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        padding: 0 15px;
        .sum{
            float: left;
            font-size:16px; 
            line-height: 50px;
            font-weight:600
        }
        .btn{
            float: right;
        }

        

    }

</style>