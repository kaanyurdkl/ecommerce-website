<script setup lang="ts">
import { ref, reactive } from "vue";

import { useProductsStore } from "@/stores/productsStore";

defineProps(["products"]);

const productsStore = useProductsStore();

const productsHeaders = [
  "Image",
  "Id",
  "Name",
  "Category",
  "Type",
  "Price",
  "",
];

const isCreating = ref(false);
const isUpdating = ref(false);
const updatingProductId = ref(null);

const newProduct = reactive({
  name: "",
  image: "",
  category: "",
  type: "",
  description: "",
  price: "",
});

const openCreateFormHandler = () => {
  isCreating.value = true;
};

const openUpdateFormHandler = (product) => {
  isUpdating.value = true;

  updatingProductId.value = product._id;

  newProduct.name = product.name;
  newProduct.image = "";
  newProduct.category = product.category;
  newProduct.type = product.type;
  newProduct.description = product.description;
  newProduct.price = product.price;
};

const closeFormHandler = () => {
  isCreating.value = false;
  isUpdating.value = false;
  resetNewProduct();
};

const createProductHandler = async (e) => {
  e.preventDefault();

  const stringPrice = parseFloat(newProduct.price).toFixed(2);
  const price = parseFloat(stringPrice);

  await productsStore.createProduct({ ...newProduct, price });
  await productsStore.getProducts();

  isCreating.value = false;
  resetNewProduct();
};

const updateProductHandler = async (e) => {
  e.preventDefault();

  const stringPrice = parseFloat(newProduct.price).toFixed(2);
  const price = parseFloat(stringPrice);

  await productsStore.updateProduct(updatingProductId.value, {
    ...newProduct,
    price,
  });
  await productsStore.getProducts();

  isUpdating.value = false;
  resetNewProduct();
};

const deleteProductHandler = async (id) => {
  await productsStore.deleteProduct(id);
  await productsStore.getProducts();
};

const resetNewProduct = () => {
  newProduct.name = "";
  newProduct.image = "";
  newProduct.category = "";
  newProduct.type = "";
  newProduct.description = "";
  newProduct.price = "";
};

const onFilePicked = async (e) => {
  const formData = new FormData();
  formData.append("image", e.target.files[0]);
  try {
    const res = await productsStore.uploadProductImage(formData);
    newProduct.image = res.image;
  } catch (error) {
    console.log(error);
  }
};

function formatPrice(price) {
  return price.toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
  });
}
</script>
<template>
  <div class="table table--products">
    <i
      v-if="!isCreating && !isUpdating"
      @click="openCreateFormHandler"
      class="fa-solid fa-plus products-button products-button--create"
    ></i>
    <i
      v-else
      @click="closeFormHandler"
      class="fa-solid fa-minus products-button products-button--create"
    ></i>
    <ul v-if="!isCreating && !isUpdating" class="table__headers">
      <li v-for="header in productsHeaders" class="table__header">
        {{ header }}
      </li>
    </ul>
    <ul v-if="!isCreating && !isUpdating" class="table__rows">
      <li v-for="product in products" class="table__row">
        <ul class="table__columns">
          <li class="table__column">
            <img :src="`http://localhost:8000${product.image}`" />
          </li>
          <li class="table__column">
            {{ product._id }}
          </li>
          <li class="table__column">
            {{ product.name }}
          </li>
          <li class="table__column">
            {{ product.category }}
          </li>
          <li class="table__column">
            {{ product.type }}
          </li>
          <li class="table__column">{{ formatPrice(product.price) }}</li>
          <li class="table__column">
            <i
              class="fa-solid fa-pen products-button products-button--update"
              @click="openUpdateFormHandler(product)"
            ></i>
            <i
              class="fa-solid fa-trash products-button products-button--delete"
              @click="deleteProductHandler(product._id)"
            ></i>
          </li>
        </ul>
      </li>
    </ul>
    <form v-if="isCreating" @submit="createProductHandler">
      <div>
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Product name"
          v-model="newProduct.name"
          required
        />
      </div>
      <div>
        <label for="image">Image</label>
        <input type="file" id="image" @change="onFilePicked" required />
      </div>
      <div>
        <label for="category">Category</label>
        <input
          type="text"
          id="category"
          placeholder="Product category"
          v-model="newProduct.category"
          required
        />
      </div>
      <div>
        <label for="type">Type</label>
        <input
          type="text"
          id="type"
          placeholder="Product type"
          v-model="newProduct.type"
          required
        />
      </div>
      <div>
        <label for="description">Description</label>
        <textarea
          id="description"
          placeholder="Product decription"
          v-model="newProduct.description"
          required
        ></textarea>
      </div>
      <div>
        <label for="price">Price</label>
        <input
          type="text"
          id="price"
          placeholder="Product price"
          v-model="newProduct.price"
          required
        />
      </div>
      <div>
        <input type="submit" value="Create" />
      </div>
    </form>
    <form v-if="isUpdating" @submit="updateProductHandler">
      <div>
        <h4>{{ updatingProductId }}</h4>
      </div>
      <div>
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Product name"
          v-model="newProduct.name"
          required
        />
      </div>
      <div>
        <label for="image">Image</label>
        <input type="file" id="image" @change="onFilePicked" />
      </div>
      <div>
        <label for="category">Category</label>
        <input
          type="text"
          id="category"
          placeholder="Product category"
          v-model="newProduct.category"
          required
        />
      </div>
      <div>
        <label for="type">Type</label>
        <input
          type="text"
          id="type"
          placeholder="Product type"
          v-model="newProduct.type"
          required
        />
      </div>
      <div>
        <label for="description">Description</label>
        <textarea
          id="description"
          placeholder="Product decription"
          v-model="newProduct.description"
          required
        ></textarea>
      </div>
      <div>
        <label for="price">Price</label>
        <input
          type="text"
          id="price"
          placeholder="Product price"
          v-model="newProduct.price"
          required
        />
      </div>
      <div>
        <input type="submit" value="Update" />
      </div>
    </form>
  </div>
</template>
