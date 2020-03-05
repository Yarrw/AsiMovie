<template>
    <div class="moviedetails">
        <div class="box">
            <div class="bg" :style="moviedata.bg"></div>
           
            <div class="content">
                <div class="clearfix">
                    <div class="back fl" @click="goback"></div> 
                     
                </div>
                
                <div class="video" @click="trailervideofn"></div>
                <div class="content-box">
                    <div class="title">{{moviedata.title}}</div>
                    <div class="message">
                        {{moviedata.genresData}}
                        <div class="Collection fr" :class="{Collection_act:moviedata.iscollection}" @click="collection(moviedata)"></div> 
                    </div>
                    <!-- 电影评分 -->
                    <div class="messagebox clearfix">
                        <div class="message-item">
                            <div class="number">{{moviedata.average}}</div>
                            <div class="type">电影评分</div>
                        </div>
                        <div class="message-item">
                            <div class="number">{{moviedata.durationsD}}</div>
                            <div class="type">时长</div>
                        </div>
                        <div class="message-item">
                            <div class="number">{{moviedata.collect_count}}</div>
                            <div class="type">想看</div>
                        </div>
                    </div>
                    <!-- 电影简介 -->
                    <div class="plot-box">
                        <div class="plot-top clearfix">
                            <div class="plot-title fl">剧情</div>
                            <div class="plot-more fr"  @click="morefn">{{more}}</div>
                        </div>
                        <p class="plot" :class="{'more':ismore}">
                            {{moviedata.summary}}
                        </p>
                    </div>
                    <!-- 演员 -->
                    <div class="casts-box clearfix">
                        <div class="casts-top clearfix">
                            <div class="fl casts-title">演员</div>
                        </div>
                        <div class="casts-middle" >
                            <div class="casts-big clearfix" :style="{width:((moviedata.castscount+1)*castswidth+'px')}">
                                <div class="casts fl" >
                                    <div class="img-box">
                                        <img :src="moviedata.avatarsD" alt="" class="img-auto">
                                    </div>
                                    <div class="casts-name">
                                        {{moviedata.nameD}}
                                    </div>
                                    <div class="casts-type">
                                        导演
                                    </div>
                                </div>
                                <div class="casts fl" v-for="(item,index) in moviedata.casts" :key="index">
                                    <div class="img-box">
                                        <img :src="item.avatars.medium" alt="" class="img-auto">
                                    </div>
                                    <div class="casts-name">
                                        {{item.name}}
                                    </div>
                                    <div class="casts-type">
                                       {{item.name_en}}
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                    <!-- 剧照/预告片 -->
                    <div class="stills-box clearfix">
                        <div class="stills-title">剧照/预告片</div>
                        <div class="box1">
                            <div class="photos clearfix " :style="{width:(moviedata.photoscount+1)*photoswidth+'px'}">
                                <!-- 预告片 -->
                                <div class="photos-box " :style="{backgroundImage:'url('+ moviedata.videoimg+')'}" @click="videofn">
                                    <div class="huaxu-box">
                                        
                                    </div>
                                </div>
                                <!-- 剧照 -->
                                <div class="photos-box"  v-for="(item,index) in moviedata.photos" :key="index"  :style="{backgroundImage:'url('+ item.icon+')'}" >
                                </div>
                               
                            </div>
                        </div>
                       
                    </div>
                    <!--影评  -->
                    <div class="comment-box">
                        <div class="comment-title">热门评论</div>
                        <div class="comment">
                            <div class="comment-item" v-for="(item,index) in moviedata.popular_comments" :key="index">
                                <div class="comment-top clearfix">
                                    <div class="tou fl" >
                                        <img :src="item.author.avatar" alt="" class="img-auto">
                                    </div>
                                    
                                    <div class="mizi-box fl">
                                        <div class="mizi">{{item.author.name}}</div>
                                        <div class="start-bigbox">
                                            <div class="start-box clearfix">
                                                <i></i>
                                                <i></i>
                                                <i></i>
                                                <i></i>
                                                <i></i>
                                            </div>
                                            <div class="act-box" :style="{width:(item.rating.value)*starwidth +'px'}">
                                                <i></i>
                                                <i></i>
                                                <i></i>
                                                <i></i>
                                                <i></i>
                                            </div>
                                        </div>                                     
                                    </div>
                                    <div class="comment-more fr" @click="readmorefn(item)"></div>
                                </div>
                                 <div class="comment-content">
                                    <p class="tree-text" :class="{'all-text':item.isall}">
                                       {{item.content}}
                                    </p>
                                    <div class="commenttime-box">
                                        <div class="time fl">{{item.created_at}}</div>
                                        <div class="xin fr">❤{{item.useful_count}}</div>
                                    </div> 
                                </div>
                            </div>

                           
                        </div>
                    </div>
                    <div class="btn-box">
                        <van-button type="primary" size="large" color='#4682B4' round >购票</van-button>
                    </div>
                </div>
                
                
            </div> 
            <div class="video-box" v-show="isshow">
                <div class="video-bg" @click="hiden"></div>
                <video src="" controls ref="video"></video>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    name:'moviedetails',
    data(){
        return{
            ismore:false,
            more:'展开',
            
            moviedata:{},
            castswidth:100,
            photoswidth:250,
            starwidth:18,
            isshow:false,
            videourl:null
        }
    },
    computed:{
        isreturnInit(){
            return this.$store.state.isreturnInit
        }
    },
    methods:{
        /* 收藏电影 */
        collection(item){
        //激活收藏
        item.iscollection=true

        //获取当前登录的用户
        let nowuser=localStorage.getItem('Nowuser')
        if(nowuser){
            nowuser=JSON.parse(nowuser)
           
           if(!nowuser.isloagin){
               this.$toast('请先登录')
           }
        }else{
            return
        }
        /* console.log(item) */

        //获取用户收藏的电影
            //初始化本地存储
            let likeMovieData=localStorage.getItem('likeMovieData')
            likeMovieData= likeMovieData ? JSON.parse(likeMovieData) : {}
            
        //推数据
            
            //第一次登录的用户likeMovieData[nowuser.username]置空
            if(!likeMovieData[nowuser.username]){
                likeMovieData[nowuser.username]=[]
            }
            //判断是否收藏过
            
            for (let i = 0; i < likeMovieData[nowuser.username].length; i++) {
                if(item.id==likeMovieData[nowuser.username][i].id){
                    this.$toast('收藏过了')
                    return
                }
                
            }

            //推数据
            likeMovieData[nowuser.username].unshift(item)
            
            localStorage.setItem('likeMovieData',JSON.stringify(likeMovieData))
            
            this.$toast('收藏成功')

        },







        goback(){
            this.$router.go(-1)
            this.$store.commit('changIsReturnInit',false)
            
        },
        morefn(){
            this.ismore=!this.ismore
            this.more = this.more=='展开'? '收起' : '展开'
        },
        readmorefn(item){    
           item.isall=!item.isall     
        },
        trailervideofn(){
            let myvideo=this.$refs.video
            
            myvideo.src=this.moviedata.trailervideo
            this.isshow=true;
            
            
            
        },
        videofn(){
            let myvideo=this.$refs.video
            
            myvideo.src=this.moviedata.video
            this.isshow=true;
            
        },
        hiden(){
            let myvideo=this.$refs.video
          
            myvideo.src=null
            this.isshow=false;
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
           /*  console.log('data',data); */
            
            
            data.data.popular_comments.forEach(v => {
                v.isall=false
            });
            //背景
            data.data.bg="background-image:linear-gradient(to bottom, rgba(238,238,209,0), rgba(238,238,209,.85) 45%, rgba(238,238,209,1) 60%), url("+ data.data.images.large+")"
            var genresData=''
            //电影类型
            data.data.genres.forEach(v =>{
                genresData+=v+'/'
            })
            data.data.genresData=genresData
            data.data.average=data.data.rating.average
            //电影时长
            data.data.durationsD=data.data.durations[0]
            //导演图片
            data.data.avatarsD=data.data.directors[0].avatars.medium
            //导演名字
            data.data.nameD=data.data.directors[0].name
            //演员数量
            data.data.castscount=data.data.casts.length
            //剧照数量
            data.data.photoscount=data.data.photos.length
            //是否收藏
            data.data.iscollection=false
            //视频图片,视频，封面视频
            if(data.data.trailers.length==0){
                //视频图片
                data.data.videoimg="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583320870370&di=6ef61836418a21997d5b4879d6f27bb8&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F50%2F49%2F65574553d1e9212.jpg"
                //视频
                data.data.video=""
                //封面视频
                data.data.trailervideo=""
            }else if(data.data.trailers.length==1){
                 //视频图片
                data.data.videoimg= data.data.trailers[0].medium
                //视频
                data.data.video= data.data.trailers[0].resource_url
                //封面视频
                data.data.trailervideo= data.data.trailers[0].resource_url
            }
            
            else{
                //视频图片
                data.data.videoimg= data.data.trailers[1].medium
                //视频
                data.data.video= data.data.trailers[1].resource_url
                //封面视频
                data.data.trailervideo= data.data.trailers[2].resource_url
            }
            
            




            //获取登录状态
            var nowuser=localStorage.getItem('Nowuser')
            if(nowuser){
                nowuser=JSON.parse(nowuser)
                //所有用户
                var likeMovieData=localStorage.getItem('likeMovieData')
                    likeMovieData = likeMovieData ? JSON.parse(likeMovieData) : {}
                //当前用户
                let nowlikemovieData=likeMovieData[nowuser.username]
                    nowlikemovieData=nowlikemovieData? nowlikemovieData : []

                for (let i = 0; i < nowlikemovieData.length; i++) {
                    if(data.data.id==nowlikemovieData[i].id){
                       data.data=nowlikemovieData[i]
                    }
                    
                }



            }
          





            this.moviedata=data.data
            
            
        })
    }
}
</script>

<style lang="less" scoped>
    .bg{
        position: fixed;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        filter: blur(px);
    }
    .video-box{

        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        
        .video-bg{
            background: rgba(0, 0, 0, .9);
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;

        };
        video{
            position: relative;
            z-index: 3;
            width: 100%;
            height: 220px;
            margin: 133px 0;
        }
    }
    .content{
        position: fixed;
        top:24px;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        padding: 0 10px;
        overflow-y: auto
        
    }
    .back{
        width: 30px;
        height: 30px;
        background: url(../icons/back.png) no-repeat center center;
        background-size:30px 30px; 
    }
    .Collection,.Collection_act{
        width: 30px;
        height: 30px;
        background: url(../icons/Collection.png) no-repeat center center;
        background-size:30px 30px; 
        position: absolute;
        top :0;
        right: 50px;
    }.Collection_act{
        background: url(../icons/Collection_act.png) no-repeat center center !important;
    }
    
    .video{
        
        width: 100%;
        height: 210px;
        background: url(../icons/play.png) no-repeat center 100px;
    }
    .content-box{
        position: fixed;
        top:264px;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        overflow-y:auto 
    
    }
    .title{
        width: 100%;
        text-align: center;
        font-size: 30px;
        font-weight: 700; 
        letter-spacing: 5px;
        margin-bottom: 10px;
    }
    .message{
        width: 100%;
        text-align: center;
        font-size: 14px;
        margin-bottom: 20px ;
        position: relative;
    }
    .message-item{
        width: 33.3%;
        float: left;
        text-align: center;
        .number{
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 5px;
        }
        .type{
            font: 14px;
        }
    }
    .plot-box{
        margin-top: 30px; 
        padding: 0 10px;
        .plot-title{
            font-size: 16px;
            font-weight:700 
        }
        .plot{
            height:50px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 0;
            overflow: hidden;
        }
        .more{
            height: auto !important;
        }
    }
    .casts-middle{
       width: 100%;
        overflow-x:auto 
    }
   
    .casts-box{
        margin-top: 30px; 
        padding: 0 10px;
        overflow-x:auto; 
        .casts-title{
            font-size: 16px;
            font-weight:700 
        }
        .casts{
            
            .img-box{
                width: 70px;
                height: 70px;
                border-radius: 50%;
                overflow: hidden; 
                margin: 10px
            }
            .casts-name{
                font-size:14px; 
                width: 70px;
                padding: 0 0 0 30px;
            }
            .casts-type{
                width: 70px;
                padding: 0 0 0 30px;
            }
        }
    }
    .stills-box{
        width: 355px;
        margin-top:20px;
        padding: 0 10px;
    }

    .photos{
       
        
        div:last-child{
            margin-right:0 
        }
    }
    .photos-box{
        position: relative;
        width: 240px;
        height: 120px;
        float: left;
        border-radius: 10px; 
        background-size: 240px 120px; 
        margin-right:10px 
    }
    .huaxu-box{
        background: url(../icons/Play1.png) no-repeat center center;
        width: 30px;
        height: 30px;
        position: absolute;
        top: 45px;
        border: 0;
        left: 105px;
        right: 0;
        
    }
    .box1{
        width: 100%;
        overflow-x: auto;
        margin-top:15px 
    }
    .stills-title{
        font-size: 16px;
        font-weight: 700 
    }
    .comment-box{
        margin-top:20px; 
        padding: 0 10px;
        .comment-title{
            font-size: 16px;
            font-weight: 700 ;
            margin-bottom: 10px; 
        }
        .comment{
            .comment-item{
                margin-bottom: 10px; 
            }
            .tou{
                width: 50px;
                height: 50px;
                border-radius:50%;
                overflow: hidden; 
                margin-right: 10px; 
            }
            .start-bigbox{
                margin-top: 5px ;
                position: relative;

            }
            .start-box{
                i{
                    display: block;
                    width: 15px;
                    height: 15px;
                    float: left;
                    background: url(../icons/star.png) no-repeat center center;
                    background-size: 15px 15px; 
                    margin-right: 3px;
                }
            }
            .act-box{
                position: absolute ;
                top: 0;
                left: 0;
                width: 0px;
                height: 15px;
                overflow: hidden;
                i{
                    display: block;
                    width: 15px;
                    height: 15px;
                    float: left;
                    background: url(../icons/staract.png) no-repeat center center;
                    background-size: 15px 15px; 
                    margin-right: 3px;
                }
            }
            .comment-more{
                width: 25px;
                height: 25px;
                background: url(../icons/more.png) no-repeat center center;
                background-size: 25px 25px;
                margin-top: 25px; 
            }
            .comment-content{
              
                .commenttime-box{
                    overflow: hidden; 
                }
                .tree-text{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    -webkit-line-clamp: 3;
                }
                .all-text{
                    display: block;
                    height: auto;
                }
            }

        }
    }
    
</style>