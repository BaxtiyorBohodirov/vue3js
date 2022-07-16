import axios from "axios";
import { ref, onMounted } from "vue";
export function usePosts( limit ){
        const posts=ref([])
        const totalPages=ref(0)
        const allposts=ref([])

        const fetching=()=>{
            try{
                async ()=>{
                let response= await axios.get("https://jsonplaceholder.typicode.com/posts",{
                    params:{
                        '_limit':limit,
                        '_page':this.page
                    }
                });
                totalPages.value=Math.ceil(response.headers['x-total-count']/limit);
                response= response.data
                .map(function(post){
                    return {
                        id:post.id,
                        title:post.title,
                        comment:post.body
                    }
                })
                allposts.value=response;
                posts.value=response;
            }
            }
            catch(e)
            {
                alert("error")
            }
        }
         onMounted(fetching)
         {
            return {totalPages, allposts, posts}
         }   
}