import Router from "vue-router";

import Layout from "@/layout"

export const routes = [
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
    ]
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
  }
];

export default new Router({
  routes,
  mode: "history"
});
