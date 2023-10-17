<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useProductsStore } from "@/stores/productsStore";
import { useOrdersStore } from "@/stores/ordersStore";

const productsStore = useProductsStore();
const ordersStore = useOrdersStore();

const orders = ref(null);
const newProduct = ref(null);
const image = ref(null);
const fileUrl = ref(null);

const products = computed(() => productsStore.getAllProducts);

const deliverOrderHandler = async (id) => {
  await ordersStore.deliverOrder(id);
  orders.value = await ordersStore.getAllOrders();
};

const updateProductHandler = async () => {
  newProduct.value = await productsStore.updateProduct(newProduct.value._id, {
    ...newProduct.value,
    name: "New sample name",
    image: image.value,
  });
};

const deleteProductHandler = async (id) => {
  console.log(id);
};

const onFilePicked = async (e) => {
  const formData = new FormData();
  formData.append("image", e.target.files[0]);
  try {
    const res = await productsStore.uploadProductImage(formData);
    fileUrl.value = res.image;
  } catch (error) {
    console.log(error);
  }
};

const createProductHandler = async () => {
  newProduct.value = await productsStore.createProduct({
    image: fileUrl.value,
  });
  await productsStore.setProducts();
};

onMounted(async () => {
  orders.value = await ordersStore.getAllOrders();
  fileUrl.value = products.value[0].image;
});
</script>

<template>
  <section class="heading">
    <h2>Admin</h2>
  </section>
  <section>
    <h3>Orders</h3>
    <p>
      {{ orders }}
    </p>
    <button @click="deliverOrderHandler(orders[0]._id)">Deliver</button>
  </section>
  <section>
    <h3>Products</h3>
    <p>
      {{ products }}
    </p>
    <button @click="deleteProductHandler(products[0]._id)">Delete</button>
  </section>
  <section>
    <h3>Created Products</h3>
    <p>
      {{ newProduct }}
    </p>
    <input type="text" placeholder="Image url" v-model="fileUrl" />
    <input type="file" :ref="image" @change="onFilePicked" />
    <button @click="createProductHandler()">Create</button>
  </section>
  <section>
    <h3>Update Product</h3>
    <p>
      {{ newProduct }}
    </p>
    <button @click="updateProductHandler()">Update</button>
  </section>
</template>

<style lang="scss">
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
</style>
