<template>
    <input :value="modelValue" @input="updateInput" class="input" type="text">
</template>

<script>
    export default {
        name:"my-input",
        props:{
            modelValue:[String, Number]
        },
        methods:{
            updateInput(){
                this.$emit("update:modelValue",event.target.value)
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
</style>