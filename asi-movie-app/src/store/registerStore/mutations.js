export const mutations={
    //查看密码
    chatePasswords(state,key){
       state[key].icon=state[key].icon=='closed-eye'? 'eye-o' : 'closed-eye'
       state[key].type=state[key].icon=='closed-eye'? 'password' : 'text' 
    },
    //用户名验证
    testUser(state,val){
        //字母开头的5-12个字符串（字母，数字，下划线）
        let reg=state.user.reg
        state.user.errorMessage= reg.test(val)?  '': ' 以字母开头的5-12个(数字,字母,_)组合'
        state.user.isture=reg.test(val)    
       
         //全部验证通过，激活按钮
         if(state.user.isture&&state.pwd1.isture&&state.pwd2.isture){
            state.isdisabled=false
        }else{
            state.isdisabled=true
        }  
    },
    //密码验证
    testPassword(state,val){
        //必须包含大小写字母和数字的组合，可以使用特殊字符，长度在8-10之间)
        let reg=state.pwd1.reg
        state.pwd1.errorMessage= reg.test(val)?  '': ' 必须包含大小写字母和数字8-12个组合'
        state.pwd1.isture=reg.test(val)    
       
         //全部验证通过，激活按钮
         if(state.user.isture&&state.pwd1.isture&&state.pwd2.isture&&val==state.pwd2.val){
            state.isdisabled=false
        }else{
            state.isdisabled=true
        }  
    },
    //密码确认
    confirmPassword(state,val){
        
        let reg=state.pwd1.val
       
        state.pwd2.errorMessage = val==reg?  '': ' 密码不一致' 
        state.pwd2.isture= val==reg? true :false
       
        
        //全部验证通过，激活按钮
        if(state.user.isture&&state.pwd1.isture&&state.pwd2.isture){
            state.isdisabled=false
        }else{
            state.isdisabled=true
        }  
    },
    //注册
    register(state,self){
        //激活loading
        state.isloading=true

    //模拟网络延迟
        var random=Math.random()*3*1000

        setTimeout(() => {
        //写入本地
            //获取本地存储信息
            let user=localStorage.getItem('user')
            user=user ? JSON.parse(user) : []
            //判断用户名是否存在
            for(var i=0 ;i <user.length;i++){
                if(state.user.val==user[i].userName){
                    self.$toast('用户已存在');
                    state.isloading=false;
                    return
                }
            }
            //用户名不存在时
            let time=new Date().toLocaleString()
            //记录注册信息
            let userInfo={ 
                //用户名
                userName:state.user.val,
                //密码
                password:state.pwd1.val,
                //创建时间
                createTime:time
            }
            user.push(userInfo)
            //写入本地存储，模拟数据库
            localStorage.setItem('user',JSON.stringify(user))

            self.$toast('注册成功')
            state.isloading=false;
            //清空输入
            state.user.val=''
            state.pwd1.val=''
            state.pwd2.val=''
            state.isdisabled=true
            //跳转登录页面
            self.$router.push({name:'login'})
        }, random);
   
    }
}
