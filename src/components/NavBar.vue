<template>
  <div class="navbar">
    <div @click="$router.push('/')" style="cursor:pointer">
        Vue 3
    </div>
    <div class="buttons">
        <my-button class="btn"  @click="$router.push('/posts')">Posts Page</my-button>
        <my-button class="btn" @click="$router.push('/about')">About Page</my-button>
        <my-button class="btn" @click="$router.push('/store')">Store Page</my-button>
        <my-button class="btn" @click="$router.push('/composition')">Composittion</my-button>
    </div>
  </div>
</template>

<script>
import MyButton from './UI/MyButton.vue'
export default {
  components: { MyButton },

}
</script>

<style>
    .navbar
    {
        height: 70px;
        background-color: teal;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        font-weight: bold;
        padding: 0px 15px;
    }
    .navbar .buttons{
        display: flex;
        align-items: center;
        margin: 0 !important;
    }
    .navbar .buttons .btn{
        background-color: aqua;
        margin:0 !important;
        color: white;
        font-weight: bold;
        cursor: pointer;
    }
     .navbar .buttons .btn:hover
     {
        background-color: teal;
        border: 2px solid aqua;
     }
</style>