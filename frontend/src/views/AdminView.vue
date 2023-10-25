<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import { useProductsStore } from "@/stores/productsStore";
import { useUsersStore } from "@/stores/usersStore";
import { useOrdersStore } from "@/stores/ordersStore";

const productsStore = useProductsStore();
const usersStore = useUsersStore();
const ordersStore = useOrdersStore();

const products = computed(() => productsStore.getAllProducts);
const users = ref(null);
const orders = ref(null);

const newProduct = ref(null);
const newProductImagePath = ref(null);

const activeTab = ref("products");

const createProductHandler = async () => {
  newProduct.value = await productsStore.createProduct({
    image: newProductImagePath.value,
  });
  await productsStore.getProducts();
};

const updateProductHandler = async (id) => {
  newProduct.value = await productsStore.updateProduct(id, {
    ...newProduct.value,
    name: "New sample name",
    image: newProductImagePath.value,
  });
  await productsStore.getProducts();
};

const deleteProductHandler = async (id) => {
  await productsStore.deleteProduct(id);
  await productsStore.getProducts();
};

const onFilePicked = async (e) => {
  const formData = new FormData();
  formData.append("image", e.target.files[0]);
  try {
    const res = await productsStore.uploadProductImage(formData);
    newProductImagePath.value = res.image;
  } catch (error) {
    console.log(error);
  }
};

const deliverOrderHandler = async (id) => {
  await ordersStore.deliverOrder(id);
  orders.value = await ordersStore.getAllOrders();
};

onMounted(async () => {
  users.value = await usersStore.getAllUsers();
  orders.value = await ordersStore.getAllOrders();
  newProductImagePath.value = products.value[0].image;
});
</script>

<template>
  <section class="admin">
    <section class="admin__left">
      <ul class="admin__tabs">
        <div class="admin__separator"></div>
        <li class="admin__tab">
          <input
            type="radio"
            id="products"
            value="products"
            v-model="activeTab"
          />
          <label for="products">Products</label>
        </li>
        <li class="admin__tab">
          <input type="radio" id="users" value="users" v-model="activeTab" />
          <label for="users">Users</label>
        </li>
        <li class="admin__tab">
          <input type="radio" id="orders" value="orders" v-model="activeTab" />
          <label for="orders">Orders</label>
        </li>
      </ul>
    </section>
    <section class="admin__right">
      <section v-if="activeTab === 'products'" class="products">
        <p class="products__attributes">
          <span>Image</span>
          <span>Id</span>
          <span>Name</span>
          <span>Category</span>
          <span>Type</span>
          <span>Price</span>
          <span><i class="fa-solid fa-plus"></i></span>
        </p>
        <ul class="products__list">
          <li v-for="product in products" class="products__item">
            <ul class="products__details">
              <li class="products__detail">
                <img :src="`http://localhost:8000${product.image}`" />
              </li>
              <li class="products__detail">
                {{ product._id }}
              </li>
              <li class="products__detail">
                {{ product.name }}
              </li>
              <li class="products__detail">
                {{ product.category }}
              </li>
              <li class="products__detail">
                {{ product.type }}
              </li>
              <li class="products__detail">${{ product.price }}</li>
              <li class="products__detail">
                <i
                  class="fa-solid fa-pen products__detail--update"
                  @click="updateProductHandler(product._id)"
                ></i>
                <i
                  class="fa-solid fa-trash products__detail--delete"
                  @click="deleteProductHandler(product._id)"
                ></i>
              </li>
            </ul>
          </li>
        </ul>
      </section>
      <section v-if="activeTab === 'users'" class="users">
        <p class="users__attributes">
          <span>Id</span>
          <span>Name</span>
          <span>Email</span>
          <span>User Type</span>
        </p>
        <ul class="users__list">
          <li v-for="user in users" class="users__item">
            <ul class="users__details">
              <li class="users__detail">{{ user._id }}</li>
              <li class="users__detail">{{ user.name }}</li>
              <li class="users__detail">{{ user.email }}</li>
              <li
                v-if="user.isAdmin"
                class="users__detail users__detail--admin"
              >
                <i class="fa-solid fa-crown"></i>
                <span>Admin</span>
              </li>
              <li v-else class="users__detail users__detail--regular">
                <i class="fa-solid fa-user"></i>
                <span>Regular</span>
              </li>
            </ul>
          </li>
        </ul>
      </section>
      <section v-if="activeTab === 'orders'" class="orders">
        <p class="orders__attributes">
          <span>Id</span>
          <span>Name</span>
          <span>Created At</span>
          <span>Total</span>
          <span>Payment</span>
          <span>Delivery</span>
          <span></span>
        </p>
        <ul class="orders__list">
          <li v-for="order in orders" class="orders__item">
            <ul class="orders__details">
              <li class="orders__detail">{{ order._id }}</li>
              <li class="orders__detail">{{ order.user.name }}</li>
              <li class="orders__detail">
                {{ new Date(order.createdAt).toLocaleDateString() }}
              </li>
              <li class="orders__detail">${{ order.totalPrice }}</li>
              <li v-if="order.isPaid" class="orders__detail">
                {{ new Date(order.paidAt).toLocaleDateString() }}
              </li>
              <li v-else class="orders__detail orders__detail--not">
                Not Paid
              </li>
              <li v-if="order.isDelivered" class="orders__detail">
                {{ new Date(order.deliveredAt).toLocaleDateString() }}
              </li>
              <li v-else class="orders__detail orders__detail--not">
                Not Delivered
              </li>
              <li class="orders__detail">
                <button @click="">Details</button>
              </li>
              <!-- <li class="orders__detail">
                <button @click="deliverOrderHandler(order._id)">Deliver</button>
              </li> -->
            </ul>
          </li>
        </ul>
      </section>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.heading {
  max-width: 75rem;
  padding: 2rem;
  margin: auto;
  font-size: 2rem;
  text-transform: uppercase;
  @media screen and (max-width: 768px) {
    text-align: center;
  }
  @media screen and (max-width: 425px) {
    font-size: 1.2rem;
    text-align: center;
  }
}

.admin {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 2rem;
  gap: 2rem;
  max-width: 75rem;
  margin: auto;

  &__right {
    flex-grow: 1;
    background-color: #eee;
    padding: 2rem;
    div {
      display: flex;
      justify-content: end;
      align-items: center;
      padding-bottom: 2rem;
      margin-bottom: 4rem;
      border-bottom: 1px solid #ccc;
    }
  }

  &__tabs {
    position: relative;
    display: flex;
    gap: 2rem;
    list-style-type: none;
  }
  &__separator {
    position: absolute;
    bottom: 0;
    height: 2px;
    width: 100%;
    background-color: #ccc;
    z-index: -1;
  }
  &__tab {
    width: 6rem;
    input {
      display: none;
      &:checked + label {
        color: #3f3f3f;
        border-bottom: 2px solid #3f3f3f;
      }
    }
    label {
      display: inline-block;
      width: 100%;
      height: 100%;
      padding: 0.4rem 0;
      color: #ccc;
      font-size: 1rem;
      font-weight: 600;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      text-overflow: ellipsis;
      overflow: hidden;
      transition: all 0.2s ease-in-out;
      i {
        margin-right: 20px;
      }
    }
  }
}

.products {
  &__attributes {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 32px;
    margin-bottom: 20px;
    font-weight: 600;
    border-bottom: 1px solid #ccc;
    span {
      &:first-child {
        width: 8%;
      }
      &:nth-child(2) {
        width: 22%;
      }
      &:nth-child(3) {
        width: 10%;
      }
      &:nth-child(4) {
        width: 10%;
      }
      &:nth-child(5) {
        width: 10%;
      }
      &:nth-child(6) {
        width: 8%;
      }
      &:last-child {
        width: 10%;
        text-align: right;

        i {
          padding: 8px;
          color: #eee;
          background-color: #3f3f3f;
          font-size: 20px;
          cursor: pointer;
          &:hover {
            background-color: #555;
          }
        }
      }
    }
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0;
    list-style-type: none;
    font-size: 14px;
  }
  &__item {
    background-color: #fff;
    padding: 2rem;
  }
  &__details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style-type: none;
  }
  &__detail {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:first-child {
      width: 8%;
    }
    &:nth-child(2) {
      width: 22%;
    }
    &:nth-child(3) {
      width: 10%;
    }
    &:nth-child(4) {
      width: 10%;
    }
    &:nth-child(5) {
      width: 10%;
    }
    &:nth-child(6) {
      width: 8%;
    }
    &:last-child {
      display: flex;
      justify-content: space-between;
      width: 10%;
    }
    img {
      width: 100%;
      height: 100px;
      object-fit: cover;
    }
    i {
      padding: 0.8rem;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      &:hover {
        background-color: #eee;
      }
    }
  }
}

.users {
  &__attributes {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px 32px;
    margin-bottom: 20px;
    font-weight: 600;
    border-bottom: 1px solid #ccc;
    span {
      &:first-child {
        width: 30%;
      }
      &:nth-child(2) {
        width: 25%;
      }
      &:nth-child(3) {
        width: 30%;
      }
      &:last-child {
        width: 15%;
      }
    }
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    list-style-type: none;
    font-size: 14px;
  }
  &__item {
    background-color: #fff;
    padding: 2rem;
  }
  &__details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style-type: none;
  }
  &__detail {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:first-child {
      width: 30%;
    }
    &:nth-child(2) {
      width: 25%;
    }
    &:nth-child(3) {
      width: 30%;
    }
    &:last-child {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      padding: 0.4rem;
      font-weight: 600;
      width: 15%;
    }
    &--admin {
      color: #c02fd8;
      background-color: #f9d7ff;
    }
    &--regular {
      color: #00b3ff;
      background-color: #d7f3ff;
    }
  }
}

.orders {
  &__attributes {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px 32px;
    margin-bottom: 20px;
    font-weight: 600;
    border-bottom: 1px solid #ccc;
    span {
      &:first-child {
        width: 22%;
      }
      &:nth-child(2) {
        width: 16%;
      }
      &:nth-child(3) {
        width: 12%;
      }
      &:nth-child(4) {
        width: 8%;
      }
      &:nth-child(5) {
        width: 10%;
      }
      &:nth-child(5) {
        width: 10%;
      }
      &:nth-child(6) {
        width: 12%;
      }
      &:last-child {
        width: 8%;
      }
    }
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    list-style-type: none;
    font-size: 14px;
  }
  &__item {
    background-color: #fff;
    padding: 2rem;
  }
  &__details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style-type: none;
  }
  &__detail {
    padding: 0.4rem 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:first-child {
      width: 22%;
    }
    &:nth-child(2) {
      width: 16%;
    }
    &:nth-child(3) {
      width: 12%;
    }
    &:nth-child(4) {
      width: 8%;
    }
    &:nth-child(5) {
      width: 10%;
    }
    &:nth-child(5) {
      width: 10%;
    }
    &:nth-child(6) {
      width: 12%;
    }
    &:last-child {
      width: 8%;
      padding: 0;
    }

    button {
      display: block;
      width: 100%;
      padding: 0.4rem 0;
      color: #fff;
      background-color: #3f3f3f;
      transition: all 0.1s ease-in-out;
      &:hover {
        background-color: #555;
      }
    }
    &--not {
      text-align: center;
      color: red;
      background-color: #ffe4e4;
      font-weight: 600;
    }
  }
}
</style>
