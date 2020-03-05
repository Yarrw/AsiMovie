export const mutations={
    updata(state,val){
       
        state.moviedata=val
        if (state.params.count >=77) {
            state.isHas=true
            
        }
        state.params.count += 10
       
        
    }
}