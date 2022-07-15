<template>
    <div class="post">
        <div>
            <p v-if="post.id">Id: <strong>{{post.id}}</strong></p>        
            <p v-if="post.title">Title: <strong>{{post.title}}</strong></p>        
            <p v-if="post.comment">Comment: <strong>{{post.comment}}</strong></p>     
        </div>
        <div class="buttons">
            <my-button  style="margin-top:0px !important; align-self:unset"  @click="$router.push('/posts/'+post.id)">Read</my-button>
            <my-button  style="margin-top:0px !important; align-self:unset"  @click="$emit('remove',post)">Delete</my-button>
        </div>
        
    </div>
</template>

<script>
export default {
    props:{
        post:{
            type:Object,
            required:true
        }
    }
}
</script>

<style>
     .post
    {
        padding:15px;
        border: 2px solid teal;
        font-size: 18px;
        margin-top: 10px;
        display:flex;
        justify-content: space-between;
        align-items: center;
    }
</style>