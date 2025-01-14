import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, form, next) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const isAuth = Boolean(localStorage.getItem("auth") === "true");

    if (!isAuth && to.meta.requiresAuth) {
      return next({ name: "login" });
    }

    const isAdmin = user && user.rol === "Admin";
    const isEnterprise = user && user.rol === "Enterprise";

    const restrictedRoutes = ["enterprises", "users", "his.jobs", "jobs"];

    if (to.path === "/") {
      if (isEnterprise) {
        return next({ name: "enterprise_home" });
      }

      return next();
    }

    if (!isAdmin && restrictedRoutes.includes(to.name)) {
      return next({ name: "access-denied" });
    }

    const restrictedRoutesEnterprise = ["enterprise_home", "jobs-enterprise", 'enterprise-job-detail'];

    if (!isEnterprise && restrictedRoutesEnterprise.includes(to.name)) {
      return next({ name: "access-denied-enterprise" });
    }

    if (isEnterprise && to.name === "enterprise-detail" && !user.enterprise) {
      return next({ name: "enterprise_home" });
    }

    if (isEnterprise && to.name === "enterprise_home" && user.enterprise) {
      return next({
        name: "enterprise-detail",
        params: { slug: user.enterprise.slug },
      });
    }

    next();
  });

  return Router;
});
