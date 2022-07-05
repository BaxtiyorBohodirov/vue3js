<template>
    <div class="app">
        <form-post @create="addPost" />
        <post-list :posts="posts" />
       <form-filter @filter="filterPosts" />
    </div>
</template>

<script>
import FormFilter from './components/FormFilter.vue';
import FormPost from './components/FormPost.vue';
import PostList from './components/PostList.vue';
export default {
    components:{
        FormPost,
        PostList,
        FormFilter
    },
    
        data(){
        return {
            allposts:[
                {
                    id:1,
                    title:"This is title of post one",
                    comment:"This is commet of post one"
                },
                {
                    id:2,
                    title:"This is title of post two",
                    comment:"This is commet of post two"
                },
                {
                    id:3,
                    title:"This is title of post three",
                    comment:"This is commet of post three"
                },
                {
                    id:4,
                    title:"This is title of post four",
                    comment:"This is commet of post four"
                },
            ],
            posts:[],
            title:"",
            comment:"",
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
            }
            
        },
        filterPosts(value)
        {
            this.posts=this.allposts.filter(x=>x.title.includes(value)||x.comment.includes(value));
        }
    },
    mounted()
    {
        this.posts=this.allposts;
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
 
</style>