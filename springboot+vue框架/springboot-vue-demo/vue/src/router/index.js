import {createRouter, createWebHistory} from 'vue-router'
import Layout from "@/layout/Layout";

const routes = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect: "/home",
        children: [
            {
                path: '/user',
                name: 'User',
                component: () => import("@/views/User"),
            },
            {
                path: '/user',
                name: 'User',
                component: () => import("@/views/User"),
            },
            {
                path: '/user',
                name: 'User',
                component: () => import("@/views/User"),
            },

        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("@/views/Login")
        // component: Login

    },
    {
        path: '/register',
        name: 'Register',
        component: () => import("@/views/Register")
        // component: Login

    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


export default router
