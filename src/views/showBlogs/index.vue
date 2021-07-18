<template>
  <div v-theme:column="'narrow'" id="show-blogs">
    <h2>博客总览</h2>
    <input type="text" v-model="search" placeholder="搜索">
    <div v-for="blog in filteredBlogs" :key="blog.fields.id" class="single-blog">
      <router-link v-bind:to="'/blog/' + blog.fields.id">
        <h2 v-rainbow>{{blog.fields.title | to-uppercase}}</h2>
      </router-link>
      <article>
        {{blog.fields.content | snippet}}
      </article>
    </div>
  </div>
</template>

<script>
import { all } from "../../apis/blog";

export default {
  name: 'ShowBlogs',
  data(){
    return {
      blogs:[],
      search:""
    }
  },
  async created(){
    const result = await all();
    console.log(result.data);
    if (result.code === 200) {
      this.blogs = result.data;
    }
    console.log(this.blogs);
    // this.$http.get('./../static/posts.json')
    // .then(function(data){
    //   this.blogs = data.body.slice(0,10);data.fields.title
    // })
  },
  computed: {
    filteredBlogs:function(){
      return this.blogs.filter((blog) => {
        return blog.fields.title.match(this.search);
      })
    }
  },
  filters: {
    toUppercase(value){
      return value.toUpperCase();
    }
  },
  directives: {
    'rainbow': {
      bind(el,binding,vnode) {
        el.style.color = "#" + Math.random().toString(16).slice(2,8);
      }
    }
  }
}
</script>

<style>
#show-blogs{
  max-width: 800px;
  margin: 0 auto;
}

.single-blog {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background: #eee;
  border: 1px dotted #aaa;
  border-radius: 3px;
}

#show-blogs a {
  color: #666;
  text-decoration: none;
}

input[type="text"]{
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 3px;
  border: 1px solid #aaa
}
</style>
