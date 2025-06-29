import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Practice from '@/pages/practice/index.vue';
import Dict from '@/pages/dict/index.vue';
import Mobile from '@/pages/mobile/index.vue';
import Test from '@/pages/test.vue';
import Login from '@/pages/login/index.vue';
import { useUserStore } from '@/stores/user';

const routes: RouteRecordRaw[] = [
  { path: '/practice', component: Practice, name: 'practice' },
  { path: '/dict', component: Dict, name: 'dict' },
  { path: '/mobile', component: Mobile, name: 'mobile' },
  { path: '/test', component: Test, name: 'test' },
  { path: '/login', component: Login, name: 'login'},
  { path: '/', redirect: '/practice', name: 'root' },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 路由守卫：非登录页自动恢复用户
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    const userStore = useUserStore();
    const result = userStore.restoreUserFromLocal();
    if (!result) {
      next({ path: '/login' });
      return;
    }
  }
  next();
});

export default router;