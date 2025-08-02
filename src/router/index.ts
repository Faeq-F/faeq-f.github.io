import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import site2020View from '../views/2020site.vue'
import site2021View from '../views/2021site.vue'
import site2022View from '../views/2022site.vue'
import site2023View from '../views/2023site.vue'
import site2025View from '../views/2025site.vue'
import sub from '../views/sub.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/PersonalSite2020',
      name: '2020site',
      component: site2020View,
    },
    {
      path: '/PersonalSite2021',
      name: '2021site',
      component: site2021View,
    },
    {
      path: '/PersonalSite2021/sub',
      name: '2021siteSub',
      component: sub,
    },
    {
      path: '/PersonalSite2022',
      name: '2022site',
      component: site2022View,
    },
    {
      path: '/PersonalSite2023',
      name: '2023site',
      component: site2023View,
    },
    {
      path: '/PersonalSite2025',
      name: '2025site',
      component: site2025View,
    },
  ],
  scrollBehavior: function (to, from, savedPosition) {
    if (to.hash) {
      tryScrollToAnchor(to.hash, 1000, 100);
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
})

export default router

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

async function tryScrollToAnchor(hash, timeout = 1000, delay = 100) {
  while (timeout > 0) {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      break;
    }
    await wait(delay);
    timeout = timeout - delay;
  }
}
