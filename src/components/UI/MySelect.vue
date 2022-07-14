<template>
    <select v-model="modelValue"  @change="changeOption" class="my-select" name="" id="">
        <option v-for="opt in options" :value="opt.value" :key="opt.id">Sorted by {{opt.title}}</option>
    </select>
</template>
<script>
    export default {
        name:"my-select",
        props:{
            modelValue:{
                type:String
            },
            options:{
                type:Array,
                defaul:()=>[]
            },
        },
        methods:{
            changeOption(event){
                this.$emit("update:modelValue",event.target.value)
            }
        }
    }
</script>
<style>
    .my-select
    {
        padding: 5px;
        background:none;
        border: 2px solid teal;
        color:teal;
    }
</style>