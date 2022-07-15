<template>
    <div>
        <my-input v-focus  class="search-arr" :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Search..."/>
        <div class="buttons">
            <div>
                <my-button style="margin:10px 15px 10px 0px" @click="showDialog">Add Post</my-button>
                <my-button style="margin:10px 15px 10px 0px" @click="fetchPosts">Get Posts</my-button>
            </div>
            <my-select :model-value="selectedSort" @update:model-value="setSelectedSort"  :options="$store.state.post.filterArr">Select sort by</my-select>    
        </div>    
        <my-dialog v-model:show="dialogVisible" @update:show="setDialogVisible">
            <form-post @create="addPost"/>
        </my-dialog>
        <post-list :posts="sortedAndSearchedPosts" @remove="removePost"/>
        <div  v-intersection="loadMorePosts" class="observer"></div>
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
import { mapState, mapMutations,mapGetters, mapActions } from "vuex";
import axios from 'axios'
export default {
    components:{
        FormPost,
        PostList,
        FormFilter,
    },
    methods:{
        ...mapMutations({
            setPage:'post/setPage',
            setSearchQuery:'post/setSearchQuery',
            setSelectedSort:'post/setSelectedSort',
            setDialogVisible:'post/setDialogVisible',
            setAllPosts:'post/setAllPosts',
            setPosts:'post/setPosts',
        }),
        ...mapActions({
            loadMorePosts:'post/loadMorePosts',
            fetchPosts:'post/fetchPosts',
            filterKeys:'post/filterKeys'
        }),
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
                this.setDialogVisible(false);
            }
            
        },
        showDialog()
        {
            this.setDialogVisible(true)
        },
        filterPosts(value)
        {
            this.posts=this.allposts.filter(x=>x.title.includes(value)||x.comment.includes(value));
        },
        removePost(post)
        {
            this.setAllPosts(this.allposts.filter(x=>x.id!==post.id))
            this.setPosts(this.posts.filter(x=>x.id!==post.id))
        },
    },
    mounted()
    {
        
        },
    computed:{
        ...mapState({
        allposts:state=>state.post.allposts,
        posts:state=>state.post.posts,
        title:state=>state.post.title,
        comment:state=>state.post.comment,
        dialogVisible:state=>state.post.dialogVisible,
        filter:state=>state.post.filter,
        selectedSort:state=>state.post.selectedSort,
        searchQuery:state=>state.post.searchQuery,
        page:state=>state.post.page,
        limit:state=>state.post.limit,
        totalPages:state=>state.post.totalPages
        }),
        ...mapGetters({
            sortedPost:'post/sortedPost',
            sortedAndSearchedPosts:'post/sortedAndSearchedPosts'
        })
    },
    watch:{
        limit()
        {
            this.fetchPosts()
        },

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