<template>
  <div id="single-blog">
    <h1>{{blog.title}}</h1>
    <article>{{blog.content}}</article>
  </div>
</template>

<script>
  import { detail } from "../apis/blog";
  
  export default {
    name:"single-blog",
    data(){
      return{
        id:this.$route.params.id,
        blog:{}
      }
    },
    async created(){
      // this.$http.get('https://jsonplaceholder.typicode.com/posts/' + this.id)
      //   .then(function(data){
      //     this.blog = data.body;
      //   })
      const result = await detail(this.$route.params.id);
      console.log(result);
      this.blog = result.data.fields;
    }
  }
</script>

<style scope>
#single-blog {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  background: #eee;
  border: 1px dotted #aaa
}
</style>