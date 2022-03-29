
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('src/pages/HomePage.vue') },
      { path: '/messager', component: () => import('src/pages/MessagerPage.vue') },
      { path: '/profile', component: () => import('src/pages/ProfilePage.vue') },
      { path: '/camera', component: () => import('src/pages/CameraPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
