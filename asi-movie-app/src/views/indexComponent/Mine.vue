<template>
    <div class="mine">
         <div class="navbar">
            <span>Mine</span>
        </div>
        <!-- 个人信息 -->
        <div class="xinxi clearfix">
            <div class="wenzi fl">
                <div class="name">{{name}}</div>
                <div class="introduce one-text">热爱电影,热爱生活</div>
            </div>
            <div class="exit" @click="exit">退出登录</div>
            <div class="portrait fr"></div>
        </div>

        <!-- 电影票 -->
        <van-row>
            <van-col span="12">
                <div class="col" @click="mytick">
                    <van-icon name="coupon-o" />
                    <div class="ti">电影票</div>
                </div>
            </van-col>
            <van-col span="12">
                <div class="col">
                    <van-icon name="vip-card-o" />
                    <div class="ti">优惠卷</div>
                </div>
            </van-col>
        </van-row>

        <!-- 收藏的 -->
        <div class="Collection">
            <div class="coll-title">
                我的收藏
            </div>
            <div class="bigbox clearfix" :style="{width:itemwidth*collectionData.length-10+'px'}">
                <div class="item" v-for="(item,index) in collectionData" :key="index" @click="check({name:'moviedetails',params:{id:item.id}})">
                    <div class="img-box">
                        <img :src="item.images.small"  class="img-auto" alt="">
                    </div>
                    <div class="one-text img-title">{{item.title}}</div>
                    <div class="del" @click.stop="del(index)">

                    </div>
                </div>
               
                
               
            </div>
        </div>
    </div>
</template>






<script>
export default {
    name:'mine',
    data(){
        return{
            name:'',
            collectionData:null,
            itemwidth:100
        }
    },
    methods:{
        check(o){
            this.$router.push(o)
        },
        del(index){
            //冒泡阻止
           this.cancelBubble = true;

           

           this.collectionData.splice(index)
           //删除本地存储里的数据
           var likeMovieData=localStorage.getItem('likeMovieData')
                likeMovieData=JSON.parse(likeMovieData)
            
            var nowuser=localStorage.getItem('Nowuser')
                nowuser=JSON.parse(nowuser)

            var nowlikemovieData=likeMovieData[nowuser.username]
            
            nowlikemovieData.splice(index)
            //修改当前用户的数据
            likeMovieData[nowuser.username]=nowlikemovieData
            localStorage.setItem('likeMovieData',JSON.stringify(likeMovieData))





        },
        mytick(){
            this.$router.push({name:'mytick'})
        },
        exit(){
            this.$router.push({name:'login'})
        }
    },
    created(){
        var nowuser=localStorage.getItem('Nowuser')
        if(nowuser){
            nowuser=JSON.parse(nowuser)
            
            this.name=nowuser.username
        
        var collectionData=localStorage.getItem('likeMovieData')
            if(collectionData){
                collectionData=JSON.parse(collectionData)
              
                var coll=collectionData[nowuser.username]
                if(!coll){
                    this.collectionData=[]
                    return
                }
               
                this.collectionData=coll
                
            }else{
                this.collectionData=[]
            }

        }
            
    }
}
</script>



<style lang="less" scoped>
     .navbar{
            width: 100%;
            height: 46px;
            background: white;
            color: #4682B4;
            text-align: center;
            line-height: 46px;
            font-size:16px ;
            position: sticky;
            top: 24px;
    }
    .xinxi{
        margin-bottom:15px; 
        padding: 0 10px;
        .name{
            font-size:22px ;
            font-weight: 700 
        }
        .introduce{
            font-size:14px; 
            width: 172px
        }
        .portrait{
            width: 75px;
            height: 75px;
            border-radius:50%; 
            box-shadow: 0 0 4px rgba(0,0,0,.8);
            background: url(../../image/tou.jpg) no-repeat center center;
            background-size: 75px 75px; 
        }
        .exit{
            float: left;
            margin-top: 62px;
            margin-left: 37px;
            color: #555;
          
            
        }
        .exit:active{
            color: #4682B4;
           
        }
    }
    .col{
        height: 80px;
        line-height: 80px;
        text-align: center;
        font-size:40px; 
        position: relative;
        /* border: 1px solid rgba(0,0,0,.3) */
        .ti{
            font-size:14px; 
            position: absolute;
            top :20px;
            left: 71px;
        }
    }
    .Collection{
        margin-top:10px;
        padding: 0 10px;
        overflow-x: auto;
        .bigbox{
            width: 500px;
           

            .item{
                width: 90px;
                
                
                margin-right:10px;
                float: left; 
                position: relative;
                .del{
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    width: 10px;
                    height: 10px;
                    background:url(../../icons/del.png) no-repeat center center;
                    background-size:10px 10px; 
                }
                
            }
            
        }
        .bigbox>div:last-child{
            margin-right:0 
        }
        .coll-title{
            font-size: 18px;
            font-weight:600;  
            margin-bottom: 10px 
        }
        .img-box{
            width: 90px;
            height: 125px;
            overflow:hidden;
        }
        .img-title{
            font-size:14px;
        }
    }

</style>