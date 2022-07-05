<template>
    <button @click="deletePost" class="btn">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name:"my-button",
        props:{
            index:{
                type:Number,
                required:true
            }
        },
      }
</script>

<style>
     .btn
    {
        align-self: flex-end;
        padding: 10px 15px;
        margin-top: 10px;
        background:none;
        border: 2px solid teal;
        color:teal;
    }
</style>