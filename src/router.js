import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/user/:id",
    name: "user-show",
    component: () => import("./components/User")
  },
  {
    path: "/user",
    name: "user-create",
    component: () => import("./components/AddUser")
  },
  {
    path: "/users",
    name: "users",
    component: () => import("./components/UserList")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;