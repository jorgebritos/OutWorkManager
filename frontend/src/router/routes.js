const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/Enterprises.vue") },
    ],
  },
  {
    path: "/his.trabajo/:id", // Ruta con parámetro dinámico
    name: "Detalle",
    component: () => import("src/pages/DetallesTrabajos.vue"),
    props: true, // Para pasar el parámetro como prop al componente
  },
  {
    path: "/login/",
    component: () => import("pages/Login.vue"),
  },
  {
    path: "/registro",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Registro.vue") }],
  },
  {
    path: "/enterprise/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/Enterprises.vue"),
        name: "enterprises",
      },
      {
        path: ":slug/",
        component: () => import("src/pages/EnterpriseDetail.vue"),
        name: "enterprise-detail",
      },
      {
        path: ":enterprise/operator/:pk/",
        component: () => import("src/pages/OperatorDetail.vue"),
        name: "operators-detail",
      },
    ],
  },
  {
    path: "/jobs/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/Jobs.vue"),
        name: "jobs",
      },
      {
        path: ":pk/",
        component: () => import("src/pages/JobDetail.vue"),
        name: "job-detail",
      },
    ],
  },
  {
    path: "/his.trabajo/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/HisTrabajo.vue"),
        name: "his.trabajo",
      },
    ],
  },
  {
    path: "/usuarios/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/Users.vue"),
        name: "users",
      },
    ],
  },
  {
    path: "/cuenta/",
    component: () => import("layouts/MainLayout.vue"),
    children: [],
  },
  {
    path: "/Configuracion",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/UsuarioConfig.vue"),
        name: "Configuracion",
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
