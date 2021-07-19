<template>
  <div v-theme:column="'narrow'" id="show-blogs">
    <h2>博客总览</h2>
    <input type="text" v-model="search" placeholder="搜索">
    <div v-for="blog in filteredBlogs" :key="blog.fields.id" class="single-blog">
      <button @click="handleDelete(blog.fields.id)"><img src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTEyIDUxMiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnPjxwYXRoIGQ9Im00MjQgNjRoLTg4di0xNmMwLTI2LjQ2Ny0yMS41MzMtNDgtNDgtNDhoLTY0Yy0yNi40NjcgMC00OCAyMS41MzMtNDggNDh2MTZoLTg4Yy0yMi4wNTYgMC00MCAxNy45NDQtNDAgNDB2NTZjMCA4LjgzNiA3LjE2NCAxNiAxNiAxNmg4Ljc0NGwxMy44MjMgMjkwLjI4M2MxLjIyMSAyNS42MzYgMjIuMjgxIDQ1LjcxNyA0Ny45NDUgNDUuNzE3aDI0Mi45NzZjMjUuNjY1IDAgNDYuNzI1LTIwLjA4MSA0Ny45NDUtNDUuNzE3bDEzLjgyMy0yOTAuMjgzaDguNzQ0YzguODM2IDAgMTYtNy4xNjQgMTYtMTZ2LTU2YzAtMjIuMDU2LTE3Ljk0NC00MC00MC00MHptLTIxNi0xNmMwLTguODIyIDcuMTc4LTE2IDE2LTE2aDY0YzguODIyIDAgMTYgNy4xNzggMTYgMTZ2MTZoLTk2em0tMTI4IDU2YzAtNC40MTEgMy41ODktOCA4LThoMzM2YzQuNDExIDAgOCAzLjU4OSA4IDh2NDBjLTQuOTMxIDAtMzMxLjU2NyAwLTM1MiAwem0zMTMuNDY5IDM2MC43NjFjLS40MDcgOC41NDUtNy40MjcgMTUuMjM5LTE1Ljk4MSAxNS4yMzloLTI0Mi45NzZjLTguNTU1IDAtMTUuNTc1LTYuNjk0LTE1Ljk4MS0xNS4yMzlsLTEzLjc1MS0yODguNzYxaDMwMi40NHoiLz48cGF0aCBkPSJtMjU2IDQ0OGM4LjgzNiAwIDE2LTcuMTY0IDE2LTE2di0yMDhjMC04LjgzNi03LjE2NC0xNi0xNi0xNnMtMTYgNy4xNjQtMTYgMTZ2MjA4YzAgOC44MzYgNy4xNjMgMTYgMTYgMTZ6Ii8+PHBhdGggZD0ibTMzNiA0NDhjOC44MzYgMCAxNi03LjE2NCAxNi0xNnYtMjA4YzAtOC44MzYtNy4xNjQtMTYtMTYtMTZzLTE2IDcuMTY0LTE2IDE2djIwOGMwIDguODM2IDcuMTYzIDE2IDE2IDE2eiIvPjxwYXRoIGQ9Im0xNzYgNDQ4YzguODM2IDAgMTYtNy4xNjQgMTYtMTZ2LTIwOGMwLTguODM2LTcuMTY0LTE2LTE2LTE2cy0xNiA3LjE2NC0xNiAxNnYyMDhjMCA4LjgzNiA3LjE2MyAxNiAxNiAxNnoiLz48L2c+PC9zdmc+" /></button>
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
import { all, remove } from "../../apis/blog";

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
    if (result.code === 200) {
      this.blogs = result.data;
    }
    // console.log(this.blogs);
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
  },
  methods: {
    async handleDelete(id) {
      this.$confirm('确认删除该博客？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const result = await remove(id);
        console.log(this.blogs);
        this.$forceUpdate();
        if (result.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        } else if (result.code === 457) {
          this.$message({
            type: 'error',
            message: '该文章不存在!'
          })
        } else {
          this.$message({
            type: 'error',
            message: '未知错误!'
          })
        }
      });
      
    },
  }
}
</script>

<style>
#show-blogs {
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

img {
  width: 4%;
  float: right;
}
</style>
