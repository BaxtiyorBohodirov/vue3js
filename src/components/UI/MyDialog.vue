<template>
    <div class="dialog" v-if="show" @click.stop="hideDialog">
        <div @click.stop class="dialog_content">
            <slot></slot>
        </div>
    </div>    

</template>
<script>
export default {
    name:'my-dialog',
    props:{
        show:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        hideDialog()
        {
            console.log("ok")
            this.$emit('update:show',false);
        }
    }
        
}
</script>

<style>
    .dialog
    {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0,0, 0.5);
        position: fixed;
        display: flex;
        z-index: 1999;
    }
    .dialog_content
    {
        min-height: 50px;
        min-width: 300px;
        padding: 15px;
        background-color: white;
        border-radius: 12px;
        margin:auto;        
    }
</style>