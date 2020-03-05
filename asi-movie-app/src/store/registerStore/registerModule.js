//导入home的state
import {state} from './state'
//导入home的mutations
import{mutations} from'./mutations'


//导出home
export const registerModule={
    //命名空间
     namespaced: true,

     state,
     mutations
     
}