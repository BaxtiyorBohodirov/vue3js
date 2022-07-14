import Main from '@/pages/Main'
import UserPage from '@/pages/UserPage'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    {
        path:'/',
        component:Main
    },
    {
        path:'/user-page',
        component:UserPage
    }
]

const router= createRouter({
    routes,
    history:createWebHistory(process.env.BASE_URL)
})


export default router;