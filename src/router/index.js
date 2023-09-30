import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        name : 'login',
        path : '/login',
        component : () => import('@/components/login')
    },
    {
        name : 'main',
        path : '/main',
        component : () => import('@/components/main')
    },
    {
        name : 'register',
        path : '/register',
        component : () => import('@/components/register')
    },
    {
        name : 'personal',
        path : '/personal',
        component : () => import('@/components/person/Personal'),
        children : [
            {
                name : 'info',
                path : '/info',
                component : () => import('@/components/person/Info'),
            },
        ]
    },
    {
        name : 'movie',
        path : '/movie',
        component : () => import('@/components/movie')
    },

    {
        name : 'searchMovie',
        path : '/searchMovie',
        component : () => import('@/components/searchMovies')
    },

    {
        name : 'blankPage',
        path : '/blankPage',
        component : () => import('@/components/blankPage')
    },
]

const router = createRouter({
    base : process.env.BASE_URL,
    history : createWebHistory(),
    routes
})

router.beforeEach((to, from) =>{
    console.log(to)
    console.log(from)
    return true
})

export default router
