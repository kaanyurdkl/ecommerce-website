import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import CategoryView from "@/views/CategoryView.vue";
import ProductsView from "@/views/ProductsView.vue";
import ProductView from "@/views/ProductView.vue";
import FavoritesView from "@/views/FavoritesView.vue";
import CartView from "@/views/CartView.vue";
import UserView from "@/views/UserView.vue";

import { useUsersStore } from "@/stores/usersStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
        },
        {
          path: ":category",
          children: [
            {
              path: "",
              name: "category",
              component: CategoryView,
              props: true,
            },
            {
              path: ":type",
              name: "products",
              component: ProductsView,
              props: true,
            },
          ],
        },
        {
          path: "cart",
          name: "cart",
          component: CartView,
        },
        {
          path: "user",
          name: "user",
          component: UserView,
          meta: { requiresAuth: true },
        },
        {
          path: "logout",
          name: "logout",
          component: UserView,
        },
        {
          path: "product-detail/:id",
          name: "productDetail",
          component: ProductView,
          props: true,
        },
      ],
    },
    {
      path: "/favorites",
      name: "favorites",
      component: FavoritesView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  const store = useUsersStore();
  if (to.meta.requiresAuth) {
    if (store.authUser) {
      next();
    } else {
      window.open("http://localhost:8000/auth/google", "_self");
    }
  } else if (to.name === "logout") {
    window.open("http://localhost:8000/auth/logout", "_self");
  } else {
    next();
  }
});

export default router;
