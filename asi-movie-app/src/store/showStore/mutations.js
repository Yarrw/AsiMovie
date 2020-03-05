export const mutations={
    changData(state,val){
        if(state.isInit){
            state.isInit=false
        }
        if(val.data.subjects<10){
            state.isHas=false
        }
        state.moviedata.data.subjects.push(...val.data.subjects)
        
        state.params.start += state.params.count
    },
    changcity(state,val){
        state.params.city=val
        
       
    }

}