export const routes = [
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/login',
      name: 'login',  
      component: () => import('../views/Login.vue')
    },
    {
      path: '/index',
      name: 'index',  
      component: () => import('../views/Index.vue'),
      children:[
        {
          path:'/showing',
          name:'showing',
          component:() => import('../views/indexComponent/Showing.vue'),
          children:[
            {
              path:'/show',
              name:'show',
              component:() => import('../views/showingComponent/Show.vue'),
            },
            {
              path:'/willshow',
              name:'willshow',
              component:() => import('../views/showingComponent/WillShow.vue'),
            }
          ]
        },
        {
          path: '/mine',
          name: 'mine',  
          component: () => import('../views/indexComponent/Mine.vue')
        },
        {
          path: '/cinema',
          name: 'cinema',  
          component: () => import('../views/indexComponent/yingyuan.vue')
        }
       

      ]
    },
    {
        path:'/citylist',
        name:'citylist',
        component:() => import('../views/Citylist.vue')
    },
    {
      path:'/moviedetails/:id',
      name:'moviedetails',
      component:() => import('../views/movieDetails.vue')
    },
    {
      path:'/movietick/:id',
      name:'movietick',
      component:() => import('../views/movieTick.vue')
    },
    {
      path:'/mytick',
      name:'mytick',
      component:() => import('../views/Mytick.vue')
    },

    {
       path:'*',
       redirect:{name:'login'}
    }
  ]



