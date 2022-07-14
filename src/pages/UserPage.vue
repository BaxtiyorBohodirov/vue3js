<template>
    <div>
        <my-input  class="search-arr" v-model="searchQuery" placeholder="Search..."/>
        <div class="buttons">
            <div>
                <my-button style="margin:10px 15px 10px 0px" @click="showDialog">Add Post</my-button>
                <my-button style="margin:10px 15px 10px 0px" @click="fetchPosts">Get Posts</my-button>
            </div>
            <my-select v-model="selectedSort"  :options="filterArr">Select sort by</my-select>    
        </div>    
        <my-dialog v-model:show="dialogVisible">
            <form-post @create="addPost"/>
        </my-dialog>
        <post-list :posts="sortedAndSearchedPosts" @remove="removePost"/>
        <div ref="observer" class="observer"></div>
        <!-- <div class="post-loading">
            <h1>
                Loading...
            </h1>
        </div> -->
        <!-- <div class="pagination">
           <my-button v-for="page in totalPages" :key="page" :class="{'current-page':this.page==page}" @click="changePage(page)">
                {{page}}
            </my-button>
        </div> -->
    </div>
</template>

<script>
import FormFilter from '@/components/FormFilter.vue';
import FormPost from '@/components/FormPost.vue';
import PostList from '@/components/PostList.vue';
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
            filterArr:[
                {
                    id:0,
                    title:"Id",
                    value:"id",
                },
                {
                    id:1,
                    title:"Title",
                    value:"title",
                },
                {
                    id:2,
                    title:"Comment",
                    value:"comment",
                },
            ],
            filter:0,
            selectedSort:"id",
            searchQuery:'',
            page:0,
            limit:10,
            totalPages:10
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
        filterKeys()
        {   
            console.log(this.posts)
            if(this.selectedSort==="id")
            {
                this.posts=this.allposts.sort((post1,post2)=>{
                    return post1[this.selectedSort]-post2[this.selectedSort]
                })
            }
            else{
                this.posts=this.allposts.sort((post1,post2)=>{
                    return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
                })
            }
             console.log(this.posts)
            return this.posts;               
        },
        async fetchPosts()
        {
            try{
                setTimeout(async ()=>{
                let posts= await axios.get("https://jsonplaceholder.typicode.com/posts",{
                    params:{
                        '_limit':this.limit,
                        '_page':this.page
                    }
                });
                this.totalPages=Math.ceil(posts.headers['x-total-count']/this.limit);
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
            },1000)
            }
            catch(e)
            {
                alert("error")
            }
            
            
        },
        async loadMorePosts()
        {
            try{
                setTimeout(async ()=>{
                this.page++
                let posts= await axios.get("https://jsonplaceholder.typicode.com/posts",{
                    params:{
                        '_limit':this.limit,
                        '_page':this.page
                    }
                });
                this.totalPages=Math.ceil(posts.headers['x-total-count']/this.limit);
                posts= posts.data
                .map(function(post){
                    return {
                        id:post.id,
                        title:post.title,
                        comment:post.body
                    }
                })
                this.allposts=[...this.allposts,...posts];
                this.posts=this.allposts;
            },1000)
            }
            catch(e)
            {
                alert("error")
            }
            
            
        },
        changePage(page)
        {
            this.page=page;
        }
    },
    mounted()
    {
        // this.fetchPosts();
        const options = {
        rootMargin: '0px',
        threshold: 1.0
        }
        const callback = (entries, observer)=> {
            if(entries[0].isIntersecting && this.totalPages > this.page)
            {
                this.loadMorePosts()
            }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer)
        },
    computed:{
        sortedPost(){
            return this.filterKeys();
        },
        sortedAndSearchedPosts()
        {
            return this.sortedPost.filter(x=>x.title.includes(this.searchQuery)||x.comment.includes(this.searchQuery))
        }
    },
    watch:{
        limit()
        {
            this.fetchPosts()
        },
        // page(){
        //     this.fetchPosts()
        // }

    }
}
</script>
<style>
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
        margin-top: 10px;
    }
   .current-page
    {
        background-color: teal !important;
        color: white !important;    
    }
    .observer
    {
        height: 30px;
        background-color: green;
    }
</style>