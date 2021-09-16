import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AppLayout from "../layouts/AppLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/vuemap",
    name: "VueMap",
    component: () =>
      import(/* webpackChunkName: "vuemap" */ "../views/Expt/VueMap.vue"),
    meta: { layout: AppLayout },
  },
  {
    path: "/vuelaravelmap",
    name: "VueLaravelMap",
    component: () =>
      import(
        /* webpackChunkName: "vuelaravelmap" */ "../views/Expt/VueLaravelMap.vue"
      ),
    meta: { layout: AppLayout },
  },
  {
    path: "/axios",
    name: "Axios",
    component: () =>
      import(/* webpackChunkName: "axios" */ "../views/Expt/Axios.vue"),
    meta: { layout: AppLayout },
  },
  {
    path: "/apollo",
    name: "Apollo",
    component: () =>
      import(/* webpackChunkName: "apollo" */ "../views/Expt/Apollo.vue"),
    meta: { layout: AppLayout },
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { layout: AppLayout },
  },
  {
    path: "/business/:id",
    name: "Business",
    // route level code-splitting
    // this generates a separate chunk (business.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "business" */ "../views/business/Business.vue"
      ),
    meta: { layout: AppLayout },
  },
  {
    path: "/search/:business/:location",
    name: "Search",
    // route level code-splitting
    // this generates a separate chunk (search.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/business/Search.vue"),
    meta: { layout: AppLayout },
    props: true,
  },
  {
    path: "/business/:id/writeareview",
    name: "WriteReview",
    // route level code-splitting
    // this generates a separate chunk (writereview.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "writereview" */ "../views/business/WriteReview.vue"
      ),
    meta: { layout: AppLayout },
  },
  {
    path: "/writeareview",
    name: "Review",
    // route level code-splitting
    // this generates a separate chunk (review.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "review" */ "../views/business/Review.vue"),
    meta: { layout: AppLayout },
  },
  {
    path: "/recent",
    name: "Recent",
    // route level code-splitting
    // this generates a separate chunk (recent.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "recent" */ "../views/business/Recent.vue"),
    meta: { layout: AppLayout },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: { layout: AppLayout },
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
    meta: { requiresAuth: true, layout: AppLayout },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/auth/Login.vue"),
    meta: { requiresGuest: true, layout: AuthLayout },
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/auth/Register.vue"),
    meta: { requiresGuest: true, layout: AuthLayout },
  },
  {
    path: "*",
    // path: "/:catchAll(.*)",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "../views/NotFound.vue"),
    meta: { layout: AppLayout },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
