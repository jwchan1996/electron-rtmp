import Vue from "vue";
import Router from "vue-router";
import Home from "page/home";
import Live from "page/live";

Vue.use(Router);

export default new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      redirect: "/live",
      children: [
        {
          path: "/live",
          name: "Live",
          component: Live
        }
      ]
    },
    {
      path: "*",
      component: Home
    }
  ]
});
