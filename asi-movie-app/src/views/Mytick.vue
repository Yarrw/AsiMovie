<template>
    <div class="mytick">
        <van-nav-bar
            title="我的电影票"
            left-text="返回"
            left-arrow
            @click-left="back"
        />
        <div class="bigbox">
            <div class="tick-box clearfix" :style="{width:(tickData.length*(width+46))+'px'}" >
                <div class="tickitem fl" v-for="(item,index) in tickData" :key="index">
                    <div class="img-box">
                    <img :src="item.data.images.medium" alt="" class="img-auto">
                    </div>
                    <div class="title">
                    {{item.data.original_title}}
                    </div>
                    <div class="seat clearfix">
                        <div v-for="(item2,index2) in item.tick" :key="index2" class="fl tickname">
                            {{item2.name}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name:'mytick',
    data(){
        return{
            tickData:[],
            width:270
        }
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        getData(){
            var nowuser=localStorage.getItem('Nowuser')
                nowuser=JSON.parse(nowuser).username
            var Data=localStorage.getItem("buyMovieData")
                Data=Data? JSON.parse(Data):{}
            var tickData=Data[nowuser]
            
            this.tickData=tickData
            
        }
    },
    created(){
        this.getData()
    }
}
</script>


<style lang="less" scoped>
    .bigbox{
        padding: 10px 20px;
        width: 80%;
        margin: 20px auto;
        overflow-x: auto
    }
    .tick-box{
        width: 1500px
    }
    .img-box{
        width: 100%;
    }
    .tickitem{
        text-align: center;
        margin:0 23px;
    }
    .title{
        font-size:20px;
        padding: 10px 0
    }
    .seat{
        font-size:14px; 
        display:flex;
        justify-content:center;
        align-items:center
    }
    .tickname{
            margin-right:10px 
    }
   
</style>


