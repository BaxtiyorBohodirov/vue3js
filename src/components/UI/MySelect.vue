<template>
    <select @change="changeOption" class="my-select" name="" id="">
        <option value="0" selected >
            <slot>
            </slot>
        </option>
        <option v-for="opt in options" :value="opt.value" :key="opt.id">{{opt.title}}</option>
    </select>
</template>
<script>
    export default {
        name:"my-select",
        props:{
            option:{
                type:String
            },
            options:{
                type:Array,
                defaul:()=>[]
            },
        },
        methods:{
            changeOption(event){
                this.$emit("filter",event.target.value)
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