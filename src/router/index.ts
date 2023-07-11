import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import CategoryView from "@/views/CategoryView.vue";
import ProductsView from "@/views/ProductsView.vue";
import ProductView from "@/views/ProductView.vue";
import FavoritesView from "@/views/FavoritesView.vue";

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

export default router;
