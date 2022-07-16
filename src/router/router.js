import Main from '@/pages/Main'
import UserPage from '@/pages/UserPage'
import About from '@/pages/About'
import PostView from '@/pages/PostView'
import PostsWithStore from "@/pages/PostsWithStore";
import PostPageCompositionApi from "@/pages/PostPageCompositionApi";
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    {
        path:'/',
        component:Main
    },
    {
        path:'/posts',
        component:UserPage
    },
    {
        path:'/about',
        component:About
    },
    {
        path:'/posts/:id',
        component:PostView
    },
    {
        path:'/store',
        component:PostsWithStore
    },
    {
        path:'/composition',
        component:PostPageCompositionApi
    }
]

const router= createRouter({
    routes,
    history:createWebHistory(process.env.BASE_URL)
})


export default router;