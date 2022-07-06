<template>
        <div class="form">
            <h3>Create Post</h3>
            <form @submit.prevent>
                <my-input 
                    v-model="post.title"
                    placeholder="Title..." />

                <my-input 
                    v-model="post.comment"
                    placeholder="Comment.." />
                <my-button @click="createPost" >Add Comment</my-button>
            </form>
        </div>

</template>
<script>
export default {
    data(){
        return{
            post:{
                title:"",
                comment:""
            }
        }
    },
    methods:{
        createPost()
        {
            console.log(this.post)
            this.$emit('create',this.post);
            this.post.title="";
            this.post.comment="";
        }
    }
}
</script>


<style>
   
    .form form
    {
        display:flex;
        flex-direction: column;
    }
    
</style>