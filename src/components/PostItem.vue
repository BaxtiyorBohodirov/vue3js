<template>
    <div class="post">
        <div>
            <p>Title: <strong>{{post.title}}</strong></p>        
            <p>Comment: <strong>{{post.comment}}</strong></p>     
        </div>
        <my-button  :index="post.id">Delete</my-button>
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