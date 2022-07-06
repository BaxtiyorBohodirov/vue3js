<template>
    <div v-if="posts.length>0">
        <h3>Posts</h3>
        <post-item v-for="post in posts" :post="post" :key="post.id" @remove="$emit('remove', post)"/>
    </div>
    <div v-else>
        <h2 style="color:red">There is not a post</h2>
    </div>
</template>

<script>
import PostItem from './PostItem.vue'
export default {
  components: { PostItem },
    props:{
        posts:{
            type:Array,
            required:true
        }
       
    },
}
</script>