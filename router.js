import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/user/:id",
    name: "user-show",
    component: () => import("./views/User")
  },
  {
    path: "/user",
    name: "user-create",
    component: () => import("./views/User")
  },
  {
    path: "/user-list",
    name: "user-list",
    component: () => import("./views/User")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;