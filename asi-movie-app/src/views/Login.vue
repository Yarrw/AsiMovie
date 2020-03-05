<template>
  <div class="login">
    <div class="bg">
      <div class="log"></div>
    </div>
    <div class="middle">
       <!-- 用户名 -->
        <van-field
          v-model="user.val"
          left-icon='smile'
          label="用户名"
          placeholder="请输入用户名"
          @input='testUser'

        />
        <!-- 密码 -->
        <van-field
          
          v-model="pwd.val"
          left-icon='lock'
          type="password"
          label="密码"
          placeholder="请输入密码"
          @input="testPwd"
   
        />
       
    </div>
    
    <!-- 注册按钮 -->
    <div class="btn">
       <van-button color="linear-gradient(to right, #A52A2A, #B22222)" block
        :loading=isloading type="info" loading-text="Loading..." 
        @click="login"
       >登录</van-button>
    </div>

    <!-- 登录跳转 -->
    <div class="bottom">
        <span>没有账号?</span>
        <router-link :to="{name:'register'}" class="register">
          注册
        </router-link>
    </div>
  </div>
</template>


<script>
 import {createNamespacedHelpers} from 'vuex'

  //基于registerModule的命名空间导入mapState、mapMutations 辅助函数

const {mapState, mapMutations} = createNamespacedHelpers('loginModule');


export default {
  name:'login',
  computed:{
    ...mapState(['user','pwd','isloading'])
  },
  methods:{
    ...mapMutations(['testUser','testPwd']),
    login(){
      this.$store.commit('loginModule/login',this)
    }
  }
}
</script>

<style lang="less" scoped>
.bg{
   width: 100%;
   height: 200px;
   background: url(../image/bg.jpg) no-repeat center center;
   background-size: 100% 200px;
   position: relative; 
   .log{
     background:url(../image/tou.jpg) no-repeat center center;
     background-size: 100px 100px;
     height: 100px;
     width: 100px;
     border-radius:50%;
     position: absolute;
     top: 0;
     bottom: 0;
     left: 0;
     right: 0;
     margin: auto auto;
     box-shadow: 0 0 0 3px rgba(0,0,0,0.3);
   }
}
  .middle{
    padding: 10px;
  }
  .btn{
    padding: 0 10px;
    margin-top:10px;

  }
  .bottom{
    width: 100px;
    margin:20px auto; 
    font-size: 14px;
    .register{
      color:	#1C86EE;
      margin-left: 5px 
    }
  }

</style>