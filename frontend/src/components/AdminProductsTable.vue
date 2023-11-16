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
    <form v-if="isCreating" @submit="createProductHandler" class="form">
      <div>
        <input type="text" id="name" v-model="newProduct.name" required />
        <label for="name">product name</label>
      </div>
      <div>
        <input
          type="text"
          id="category"
          v-model="newProduct.category"
          required
        />
        <label for="category">product category</label>
      </div>
      <div>
        <input type="text" id="type" v-model="newProduct.type" required />
        <label for="type">product type</label>
      </div>
      <div>
        <textarea
          id="description"
          v-model="newProduct.description"
          required
        ></textarea>
        <label for="description">product description</label>
      </div>
      <div>
        <input
          type="text"
          id="price"
          :class="{ 'has-value': newProduct.price }"
          v-model="newProduct.price"
          pattern="^\d+\.{0,1}\d{0,2}$"
          title="Please enter a number. F.e. 123456.12"
          required
        />
        <label for="price">product price</label>
      </div>
      <div>
        <label for="image">Product Image</label>
        <input type="file" id="image" @change="onFilePicked" required />
      </div>
      <div></div>
      <div>
        <input type="submit" value="Create" />
        <input type="button" value="Cancel" @click="closeFormHandler" />
      </div>
    </form>
    <form v-if="isUpdating" @submit="updateProductHandler" class="form">
      <!-- <div>
        <h4>{{ updatingProductId }}</h4>
      </div> -->
      <div>
        <input type="text" id="name" v-model="newProduct.name" required />
        <label for="name">product name</label>
      </div>
      <div>
        <input
          type="text"
          id="category"
          v-model="newProduct.category"
          required
        />
        <label for="category">product category</label>
      </div>
      <div>
        <input type="text" id="type" v-model="newProduct.type" required />
        <label for="type">product type</label>
      </div>
      <div>
        <textarea
          id="description"
          v-model="newProduct.description"
          required
        ></textarea>
        <label for="description">product description</label>
      </div>
      <div>
        <input
          type="text"
          id="price"
          :class="{ 'has-value': newProduct.price }"
          v-model="newProduct.price"
          pattern="^\d+\.{0,1}\d{0,2}$"
          title="Please enter a number. F.e. 123456.12"
          required
        />
        <label for="price">product price</label>
      </div>
      <div>
        <label for="image">product image</label>
        <input type="file" id="image" @change="onFilePicked" />
      </div>
      <div></div>
      <div>
        <input type="submit" value="Update" />
        <input type="button" value="Cancel" @click="closeFormHandler" />
      </div>
    </form>
  </div>
</template>
<style lang="scss">
.table {
  &--products {
    .table__headers {
      grid-template-columns: 8% 22% 20% 13% 15% 13% 9%;
    }
    .table__columns {
      grid-template-columns: 8% 22% 20% 13% 15% 13% 9%;
    }
    .table__column {
      &:first-child {
        img {
          width: 100%;
          height: 7rem;
          object-fit: cover;
          border-radius: 0.5rem;
        }
      }
      &:last-child {
        display: flex;
        justify-content: space-between;
      }
      &:not(:first-child),
      &:not(:last-child) {
        text-align: center;
      }
    }
    .products-button {
      padding: 0.5rem;
      font-size: 1.5rem;
      border: 1px solid #3f3f3f;
      border-bottom-width: 0.25rem;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.1s ease-in-out;
      &--create {
        position: absolute;
        top: 1.25rem;
        right: 0;
        color: #3f3f3f;
        background-color: #fff;
        &:hover {
          color: #fff;
          background-color: #3f3f3f;
        }
        &:active {
          color: #fff;
          background-color: #555;
          border-color: #555;
        }
      }
      &--update {
        background-color: #fffcb2;
        &:hover {
          background-color: #fffed4;
        }
        &:active {
          background-color: #ffffe1;
        }
      }
      &--delete {
        background-color: #ff6c5a;
        &:hover {
          background-color: #ff9587;
        }
        &:active {
          background-color: #ffb3a9;
        }
      }
    }
  }
}
</style>
