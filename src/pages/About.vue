<template>
   <h1>This is About page of this web site</h1>
   <h3>Likes:{{$store.getters.doubleLikes}}</h3>
   <div>
        <my-button  @click="$store.commit('incrementLikes')">Like</my-button>
        <my-button @click="$store.commit('decrementLikes')">DisLike</my-button>
   </div>
</template>
<script>
import MyButton from '@/components/UI/MyButton.vue'
export default {
  components: { MyButton },
}
</script>

<style>

</style>