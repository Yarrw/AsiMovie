export const state={
    user:{
        val:'',
        errorMessage:'',
        reg:/^[a-zA-Z][a-zA-Z0-9_]{4,11}$/,
        isture:false
    },
    pwd1:{
        val:'',
        type:'password',
        icon:'closed-eye',
        reg:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/,
        isture:false
    },
    pwd2:{
        val:'',
        type:'password',
        icon:'closed-eye',
        isture:false
    },
    isdisabled:true,
    isloading:false,
    self:this,

}