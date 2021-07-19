import Router from "vue-router";

import Layout from "@/layout"
import SingleBlog from '../components/SingleBlog.vue'


export const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import("@/views/login"),
    hidden: true,
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/login/Register"),
  },
  {
    path: "/",
    component: Layout,
    redirect: "/show",
    name: "Basic",
    children: [
      {
        path: "show",
        name: "ShowBlogs",
        component: () => import("@/views/showBlogs")
      },
      {
        path: "add",
        name: "AddBlog",
        component: () => import("@/views/addBlog"),
      },
      {
        path: "/blog/:id",
        name: "SingleBlog",
        component: SingleBlog,
      },
      {
        path: "/revise/:id",
        name: "UpdateBlog",
        component: () => import("@/views/updateBlog"),
      }
    ]
  }, 
];

export default new Router({
  routes,
  mode: "history"
});
