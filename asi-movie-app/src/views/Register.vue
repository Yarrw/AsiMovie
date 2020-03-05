<template>
  <div class="home">
    <div class="bg">
      <div class="log">
        <img src="../image/tou1.jpg" alt="" class="img-auto">
      </div>
      <div class="titel">
            <span>欢迎注册</span>
            <span class="blod">Asi</span>
      </div>
    </div>
    <div class="middle">
       <!-- 用户名 -->
        <van-field
          v-model="user.val"
          left-icon='smile'
          label="用户名"
          placeholder="请输入用户名"
          :error-message='user.errorMessage'
          @input="testUser(user.val)"
        />
        <!-- 密码 -->
        <van-field
          v-model="pwd1.val"
          :type='pwd1.type'
          left-icon='lock'
          :right-icon='pwd1.icon'
          label="密码"
          placeholder="请输入密码"
          :error-message="pwd1.errorMessage"
          @click-right-icon="chatePasswords('pwd1')"
          @input="testPassword(pwd1.val)"
        />
        <!-- 确认密码 -->
        <van-field
          v-model="pwd2.val"
          :type='pwd2.type'
          :right-icon='pwd2.icon'
          left-icon='lock'        
          label="确认密码"
          placeholder="请输入密码"
          :error-message="pwd2.errorMessage"
          @click-right-icon="chatePasswords('pwd2')"
          @input="confirmPassword(pwd2.val)"
        />
    </div>
    
    <!-- 注册按钮 -->
    <div class="btn">
       <van-button color="linear-gradient(to right, #A52A2A, #B22222)" block
        :loading=isloading type="info" loading-text="Loading..." 
        :disabled='isdisabled'
        @click="register"
       >注册</van-button>
    </div>

    <!-- 登录跳转 -->
    <div class="bottom">
        <span>已有账号?</span>
        <router-link :to="{name:'login'}" class="login">登录</router-link>
    </div>
   
  
  </div>
</template>

<script>
 import {createNamespacedHelpers} from 'vuex'

  //基于registerModule的命名空间导入mapState、mapMutations 辅助函数

const {mapState, mapMutations} = createNamespacedHelpers('registerModule');

export default {
  name: 'home',
  computed:{
    ...mapState(['pwd1','pwd2','user','isdisabled','isloading'])
  },
  methods:{
    ...mapMutations(['chatePasswords','testUser','testPassword','confirmPassword']),

   register(){
     this.$store.commit("registerModule/register",this)
   }
  }
}
</script>


<style lang="less" scoped>
  .bg{
    width: 100%;
    height: 200px;
    
    background-size:375px 200px ;
   
    .log{
      float: left;
      width: 150px;
      margin: 55px 0px 0 10px;
    }
    .titel{
        margin-top:140px;
        float: left;
        font-size:28px ;
        .blod{
          font-size: 40px;
          font-weight:bold; 
        }
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
    .login{
      color:	#1C86EE;
      margin-left: 5px 
    }
  }
</style>


