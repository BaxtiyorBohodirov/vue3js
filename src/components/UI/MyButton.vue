<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name:"my-button",
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
    .btn:hover
    {
        background-color: teal;
        color: white;
    }
</style>