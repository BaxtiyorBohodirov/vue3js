<template>
     <div class="filter">
        <form @submit.prevent>
            <input 
                @input="filterPosts"
                class="input" 
                type="text" 
                placeholder="Search...">
        </form>
    </div>
</template>

<script>
export default {
    methods:{
        filterPosts(event)
        {
            this.$emit('filter',event.target.value);
        }
    }
}
</script>

<style>
    .input
    {
        width: 100%;
        padding: 10px 10px;
        border:  2px solid teal;
        margin-top:10px;
        font-size:18px;
    }
    .form form, .filter form
    {
        display:flex;
        flex-direction: column;
    }
    .btn
    {
        align-self: flex-end;
        padding: 10px 15px;
        margin-top: 10px;
        background:none;
        border: 2px solid teal;
        color:teal;
    }
    .filter {
        position:fixed;
        bottom: 20px;
    }
</style>