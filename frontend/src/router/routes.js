const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/Enterprises.vue") },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/login/",
    name: "login",
    component: () => import("pages/Login.vue"),
  },
  {
    path: "/register/",
    name: "register",
    component: () => import("pages/Register.vue"),
  },
  {
    path: "/enterprises/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/Enterprises.vue"),
        meta: { requiresAuth: true },
        name: "enterprises",
      },
      {
        path: ":slug/",
        component: () => import("src/pages/EnterpriseDetail.vue"),
        meta: { requiresAuth: true },
        name: "enterprise-detail",
      },
      {
        path: ":enterprise/operator/:pk/",
        component: () => import("src/pages/OperatorDetail.vue"),
        meta: { requiresAuth: true },
        name: "operators-detail",
      },
      {
        path: "home/",
        component: () => import("src/pages/EnterpriseHome.vue"),
        meta: { requiresAuth: true },
        name: "enterprise_home",
      },
    ],
  },
  {
    path: "/jobs/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "admin/",
        component: () => import("src/pages/Jobs.vue"),
        meta: { requiresAuth: true },
        name: "jobs",
      },
      {
        path: ":pk/",
        component: () => import("src/pages/JobDetail.vue"),
        meta: { requiresAuth: true },
        name: "job-detail",
      },
      {
        path: "enterprise/",
        component: () => import("src/pages/JobsEnterprise.vue"),
        meta: { requiresAuth: true },
        name: "jobs-enterprise",
      },
      {
        path: "enterprise/:pk/",
        component: () => import("src/pages/EnterpriseJobDetail.vue"),
        meta: { requiresAuth: true },
        name: "enterprise-job-detail",
      },
      {
        path: "his.trabajos/",
        component: () => import("src/pages/HisJobs.vue"),
        meta: { requiresAuth: true },
        name: "his.jobs",
      },
    ],
  },
  {
    path: "/users/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/Users.vue"),
        meta: { requiresAuth: true },
        name: "users",
      },
    ],
  },
  {
    path: "/account/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/UserConfig.vue"),
        meta: { requiresAuth: true },
        name: "user-config",
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  {
    path: "/access-denied",
    name: "access-denied",
    component: () => import("src/pages/access-denied.vue"),
  },
  {
    path: "/access-denied-enterprise",
    name: "access-denied-enterprise",
    component: () => import("src/pages/access-denied-enterprise.vue"),
  },
];

export default routes;
