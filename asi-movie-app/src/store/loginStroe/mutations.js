export const mutations={
    testUser(state){
        
    },

    testPwd(state){
        
    },

    login(state,self){
        var user=state.user.val;
        var pwd=state.pwd.val;
        if(user==''||pwd==''){
            self.$toast('用户名和密码不能为空')
            return
        }
        
    
        //激活loading
        state.isloading=true;

        //模拟网络延迟
        var random=Math.random() * 3 * 1000
        setTimeout(() => {
            //判断用户名是否存在
            var userinfo= localStorage.getItem('user')
            userinfo = userinfo? JSON.parse(userinfo) : []
            if(userinfo.length==0){
                self.$toast('用户不存在')
                state.isloading=false
                return
            }
            for(var i=0;i<userinfo.length;i++){
                if(user==userinfo[i].userName){
                    
                    if(pwd==userinfo[i].password){
                        self.$toast('登录成功')
                        state.isloading=false
                       
                        //记录登录状态
                        let user={
                            isloagin:true,
                            username:state.user.val
                        }
                        localStorage.setItem('Nowuser',JSON.stringify(user))
                        state.user.val='';
                        state.pwd.val='';

                        //页面跳转
                        self.$router.push({name:'show'})
                        return
                    
                    }else{
                        self.$toast('用户名或密码不正确')
                        state.isloading=false
                        return
                    }
                }
                else{
                    self.$toast('用户名或密码不正确')
                    state.isloading=false
                }
            }
        }, random);
        
       
        
    }
}