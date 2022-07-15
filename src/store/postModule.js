import axios from 'axios'
export const postModule={
    state:{
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
    },
    mutations:{
       setAllPosts(state,posts)
       {
          state.allposts=posts
       },
       setPosts(state,posts)
       {
          state.posts=posts
       },
       setTitle(state,title)
       {
        state.title=title
       },
       setComment(state,comment)
       {
            state.comment=comment
       },
       setDialogVisible(state,visible)
       {
            state.dialogVisible=visible
       },
       setFilter(state,filter)
       {
            state.filter=filter
       },
       setSelectedSort(state,sort)
       {
            state.selectedSort=sort
       },
       setSearchQuery(state,query)
       {
        state.searchQuery=query
       },
       setPage(state,page)
       {
            state.page=page
       },
       setLimit(state,limit)
       {
            state.limit=limit
       },
       setTotalPage(state,total)
       {
            state.totalPages=total
       }
    },
    getters:{
        sortedPost(state){
            if(state.selectedSort==="id")
            {
                return state.allposts.sort((post1,post2)=>{
                    return post1[state.selectedSort]-post2[state.selectedSort]
                })
            }
            else{
               return state.allposts.sort((post1,post2)=>{
                    return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
                })
            }
        },
        sortedAndSearchedPosts(state,getters)
        {
            return getters.sortedPost.filter(x=>x.title.includes(state.searchQuery)||x.comment.includes(state.searchQuery))
        }
    },
    actions:{
        async fetchPosts({state,commit})
        {
            try{
                let posts= await axios.get("https://jsonplaceholder.typicode.com/posts",{
                    params:{
                        '_limit':state.limit,
                        '_page':state.page
                    }
                });
                commit('setTotalPage',Math.ceil(posts.headers['x-total-count']/this.limit));
                posts= posts.data
                .map(function(post){
                    return {
                        id:post.id,
                        title:post.title,
                        comment:post.body
                    }
                })
                commit('setAllPosts',posts);
                commit('setPosts',posts);
            }
            catch(e)
            {
                alert("error")
            }
        },
        async loadMorePosts({state,commit})
        {
            try{
                commit('setPage', state.page+1)
                let posts= await axios.get("https://jsonplaceholder.typicode.com/posts",{
                    params:{
                        '_limit':state.limit,
                        '_page':state.page
                    }
                });
                commit('setTotalPage',Math.ceil(posts.headers['x-total-count']/this.limit));
                posts= posts.data
                .map(function(post){
                    return {
                        id:post.id,
                        title:post.title,
                        comment:post.body
                    }
                })
                commit('setAllPosts',[...state.allposts,...posts]);
                state.posts=state.allposts;
            }
            catch(e)
            {
                alert("error")
            }
        },
        filterKeys({state,commit})
        {   
            if(state.selectedSort==="id")
            {
                commit('setPosts',state.allposts.sort((post1,post2)=>{
                    return post1[state.selectedSort]-post2[state.selectedSort]
                }))
            }
            else{
                commit('setPosts',state.allposts.sort((post1,post2)=>{
                    return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
                }))
            }
            return state.posts;               
        },
        
    },  
    namespaced:true
}