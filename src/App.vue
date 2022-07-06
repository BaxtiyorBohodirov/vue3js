<template>
    <div class="app">
        <div class="buttons">
            <div>
                <my-button style="margin:10px" @click="showDialog">Add Post</my-button>
                <my-button style="margin:10px" @click="fetchPosts">Get Posts</my-button>
            </div>
            <my-select  :options="filterArr" @filter="filterKeys">All</my-select>    
        </div>    
        <my-dialog v-model:show="dialogVisible">
            <form-post @create="addPost" />
        </my-dialog>
        <post-list v-if="!isPostLoading" :posts="posts" @remove="removePost"/>
        <div class="post-loading" v-else>
            <h1>
                Loading...
            </h1>
        </div>
        <form-filter @filter="filterPosts" />
    </div>
</template>

<script>
import FormFilter from './components/FormFilter.vue';
import FormPost from './components/FormPost.vue';
import PostList from './components/PostList.vue';
import axios from 'axios'
export default {
    components:{
        FormPost,
        PostList,
        FormFilter,
    },
    
        data(){
        return {
            allposts:[
            ],
            posts:[],
            title:"",
            comment:"",
            dialogVisible:false,
            isPostLoading:true,
            filterArr:[
                {
                    id:1,
                    title:"Title",
                    value:1,
                },
                {
                    id:2,
                    title:"Comment",
                    value:2,
                },
            ],
            filter:0,
           }
           
    },
    methods:{
        addPost(post){
            if(post.comment||post.title)
            {
                let newPost={
                    id:this.allposts.length+1,
                    title:post.title,
                    comment:post.comment
                }
                this.allposts.push(newPost);
                this.posts=this.allposts;
                this.dialogVisible=false;
            }
            
        },
        showDialog()
        {
            this.dialogVisible=true
            console.log(this.dialogVisible);
        },
        filterPosts(value)
        {
            this.posts=this.allposts.filter(x=>x.title.includes(value)||x.comment.includes(value));
        },
        removePost(post)
        {
            this.allposts=this.allposts.filter(x=>x.id!==post.id)
            this.posts=this.posts.filter(x=>x.id!==post.id)
        },
        filterKeys(filter)
        {   
            console.log(typeof filter)
            switch(filter)
            {
                case "0": this.posts=this.allposts; break

                case "1":this.posts=this.allposts.map(function(x){
                    return {
                        title:x.title
                    }
                })
                break
                case "2":this.posts=this.allposts.map(function(x){
                    return {
                        comment:x.comment
                    }
                })
                break
            }
        },
        async fetchPosts()
        {
            try{
                setTimeout(async ()=>{
                this.isPostLoading=true
                let posts= await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=10");
                posts= posts.data
                .map(function(post){
                    return {
                        id:post.id,
                        title:post.title,
                        comment:post.body
                    }
                })
                this.allposts=posts;
                this.posts=posts;
                this.isPostLoading=false
            },1000)
            }
            catch(e)
            {
                alert("error")
            }
            
            
        },
    },
    mounted()
    {
        this.fetchPosts();
    }
}
</script>
<style>
    *{
        margin:0;
        padding: 0;
        box-sizing: border-box;
    }
    .app
    {
        padding:20px;
    }
    .post-loading
    {
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        position: absolute;
        justify-content: space-around;
        align-items: center;
        height: 100vh;
    }
    .buttons
    {
        display:flex;
        justify-content: space-between;
    }
 
</style>