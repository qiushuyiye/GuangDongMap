import store from "../store";
import { createRouter, createWebHashHistory } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Search from "../views/Search.vue";
import SearchHistory from "../views/SearchHistory.vue";
import Introduce from "../views/Introduce.vue";
import Controller from "../views/Controller.vue";
import Page404 from "../views/errorPage/404.vue";

export const constantRouterMap = [
  { path: "/:catchAll(.*)", redirect: "/404" },
  {
    path: "/404",
    name: "error404",
    meta: {
      title: "Error 404",
    },
    component: () => import("../views/errorPage/404.vue"),
  },
];

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    children: [],
  },
  {
    path: "/searchHistory",
    name: "SearchHistory",
    component: SearchHistory,
  },
  {
    path: "/introduce",
    name: "Introduce",
    component: Introduce,
  },
  {
    path: "/controller",
    name: "Controller",
    component: Controller,
    children: [
      {
        path: "/controller/select",
        name: "Select",
        component: () => import("../components/controller/Select.vue"),
      },
      {
        path: "/controller/add",
        name: "Add",
        component: () => import("../components/controller/Add.vue"),
      },
      {
        path: "/controller/update",
        name: "Update",
        component: () => import("../components/controller/Update.vue"),
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: Page404,
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("../views/Test.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const protectedRoutes = [
  "/search",
  "/searchHistory",
  "/controller/select",
  "/controller/add",
];
// const protectedRoutes = ['/search'];

router.beforeEach((to, from, next) => {
  if (!router.hasRoute(to.name)) {
    next("/404");
  } else {
    const userRole = localStorage.userRole;
    const token = localStorage.token;

    if (protectedRoutes.includes(to.path) && !token) {
      ElMessageBox.confirm("请先登录", "提示", {
        confirmButtonText: "前往登入",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          next("/login");
          // router.push('/login')
        })
        .catch(() => {
          next("/");
          // router.back()
        });
    } else {
      next();
    }
  }
});

export default router;
